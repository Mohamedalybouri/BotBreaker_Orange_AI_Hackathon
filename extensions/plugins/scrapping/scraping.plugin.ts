import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
    OutgoingMessageFormat,
    StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { ContentTypeService } from '@/cms/services/content-type.service';
import { ContentService } from '@/cms/services/content.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { Injectable } from '@nestjs/common';
import SETTINGS from './settings';

import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapingPlugin extends BaseBlockPlugin<typeof SETTINGS> {
    template: PluginBlockTemplate = { name: 'Scraping Plugin' };

    constructor(
        pluginService: PluginService,
        private readonly contentTypeService: ContentTypeService,
        private readonly contentService: ContentService
    ) {
        super('scraping-plugin', pluginService);
    }

    getPath(): string {
        return __dirname;
    }

    async process(block: Block, _context: Context, _convId: string) {
        const args = this.getArguments(block);
        const url = args.url; // Fallback to block message if URL setting is empty

        if (!url) {
            return this.createErrorResponse('No URL provided for scraping.');
        }

        try {
            // Step 1: Launch Chromium browser
            console.log('Starting Chromium browser...');
            const browser = await puppeteer.launch({
                headless: true,
                executablePath: '/usr/bin/chromium',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                timeout: 60000,
            });

            const page = await browser.newPage();
            console.log('Navigating to URL:', url);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

            // Step 2: Extract content from the page, excluding media (e.g., images)
            console.log('Extracting page title...');
            const pageTitle = await page.title();

            console.log('Extracting textual content...');
            const pageContent = await page.$$eval(
                'p, h1, h2, h3, h4, h5, h6, li',  // Extract only text-containing elements, excluding images and other media
                (elements) => elements.map(el => el.textContent?.trim()).filter(text => text)
            );

            // Join extracted content
            const filteredContent = pageContent.join('\n');

            console.log('Closing Chromium browser...');
            await browser.close();

            // Step 3: Save content to the database (No NLP processing)
            await this.saveScrapedContent(pageTitle, filteredContent);

            // Step 4: Return the scraped content as a response
            return this.createSuccessResponse(pageTitle, filteredContent);
        } catch (error) {
            console.error('Error during scraping:', error);
            return this.createErrorResponse(`Error occurred during scraping: ${error.message}`);
        }
    }

    // Save scraped content to the database
    private async saveScrapedContent(title: string, content: string) {
        try {
            console.log('Fetching content type from database...');
            const contentType = await this.contentTypeService.findOne({ name: 'python' });

            if (!contentType) {
                throw new Error('Content type "python" not found.');
            }

            console.log('Saving processed content to the database...');
            await this.contentService.create({
                title,
                entity: contentType.id,
                dynamicFields: { body: content },  // Save as plain text here
            });
        } catch (error) {
            console.error('Error saving processed content to the database:', error);
            throw error; // Re-throw the error to handle it in the main process
        }
    }

    // Create success response
    private createSuccessResponse(pageTitle: string, pageContent: string): StdOutgoingTextEnvelope {
        return {
            format: OutgoingMessageFormat.text,
            message: {
                text: `Scraping successful:\nPage Title: ${pageTitle}\nContent: ${pageContent}`,
            },
        };
    }

    // Create error response
    private createErrorResponse(errorMessage: string): StdOutgoingTextEnvelope {
        return {
            format: OutgoingMessageFormat.text,
            message: {
                text: errorMessage,
            },
        };
    }
}

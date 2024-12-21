import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
    OutgoingMessageFormat,
    StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import SETTINGS from './settings';

@Injectable()
export class ScrapingPlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = { name: 'Scraping Plugin' };

  constructor(pluginService: PluginService) {
    super('scraping-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  async process(block: Block, _context: Context, _convId: string) {
    const args = this.getArguments(block);
    
    // Use the URL setting from the plugin settings
    const url = SETTINGS.find(setting => setting.label === 'url')?.value || args.message; // Fallback to block message if URL setting is empty

    if (!url) {
      const envelope: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: 'No URL provided for scraping.',
        },
      };
      return envelope;
    }

    try {
      // Step 1: Scrape the content from the URL
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extract content (you can adjust the selector to fit your needs)
      const pageTitle = $('title').text();
      const pageContent = $('p').first().text(); // Get the first paragraph, adjust as necessary

      // Prepare the content for response
      const scrapedContent = `
        Page Title: ${pageTitle}
        First Paragraph: ${pageContent}
      `;

      // Step 2: Return the scraped content as a response
      const envelope: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: scrapedContent, // Send back the scraped content
        },
      };

      return envelope;
    } catch (error) {
      console.error('Error scraping the URL:', error);

      const envelope: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: 'Sorry, there was an error scraping the URL.',
        },
      };

      return envelope;
    }
  }
}

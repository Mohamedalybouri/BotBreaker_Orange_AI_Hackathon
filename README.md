# BotBreaker - Orange AI Hackathon Project

## Video Demonstration
Watch the video below to see BotBreaker in action:

[View Demo Video](./Video/Ai%20Educator_Orang%20Hackathon.mp4)

## Overview
BotBreaker is a Question-Answer platform developed during the Orange AI Hackathon. The platform leverages the Hexabot platform and utilizes the RAG (Retrieval-Augmented Generation) model with OLlama to provide accurate and context-aware answers. Our primary focus is on scraping web pages related to data science, enabling users to get precise information and insights from the vast amount of data available online.

## Features
- **Web Scraping**: Automatically scrapes web pages related to data science topics.
- **Question-Answering**: Utilizes the RAG model with OLlama to provide accurate answers to user queries.
- **Hexabot Integration**: Built on the Hexabot platform for seamless integration and scalability.
- **Data Science Focus**: Specifically tailored for data science-related content, ensuring relevant and high-quality information.

## Technologies Used
- **Hexabot Platform**: The backbone of our application, providing the necessary infrastructure and tools.
- **RAG Model**: Retrieval-Augmented Generation model for generating context-aware answers.
- **OLlama**: The underlying model used for natural language understanding and generation.
- **Web Scraping Tools**: Various tools and libraries for extracting data from web pages.

- **modules/**: Since Hexabot API is built on top of NestJS, this folder allows you to extend the Hexabot API by adding your own modules (controllers, services, etc.).

- **Dockerfile**: Use this file to build a Docker image on top of Hexabot. It's pre-configured to get your project up and running in a containerized environment.

- **docker/docker-compose.yml**: This file defines the services needed to run your Hexabot project using Docker Compose. It simplifies the setup of multiple services such as databases or other dependencies.

## Getting Started

1. **Install Hexabot CLI**:
   
  1.1 Clone the repository:
   ```bash
   git clone https://github.com/Mohamedalybouri/BotBreaker_Orange_AI_Hackathon.git
   cd BotBreaker_Orange_AI_Hackathon
  ```
  1.2 Install the required dependencies:
  
  ```bash
  Copy
  pip install -r requirements.txt
  ```
3. **Create Your Project**:
   Use the Hexabot CLI to create a new chatbot project:

   ```bash
   hexabot create my-chatbot
   ```

4. **Configure Your Environment**:

   - Copy the `.env.example` file to `.env` and customize it according to your environment and configuration needs.

   ```bash
   cp .env.example .env
   ```

5. **Run the Project**:
   Navigate into the newly created folder and run the following command to start the project in development mode:

   ```bash
   hexabot dev
   ```

   For production mode, you can use:

   ```bash
   hexabot start
   ```

   _Note_: The first run may take some time as it needs to download all required Docker images.

6. **Configure your NLU Engine**:
   After creating your new project, the **Hexabot LLM-NLU Engine** will be enabled by default. This NLU engine relies on one of the following LLM helpers being present, you can enable one of these by following the steps detailed in [LLM NLU Engine](https://docs.hexabot.ai/user-guide/nlu/nlu-engines/llm-nlu-engine) documentation page:

   - Ollama Helper (`hexabot-helper-ollama`)
   - Google Gemini Helper (`hexabot-helper-gemini`)
   - OpenAI ChatGPT Helper (`hexabot-helper-chatgpt`)

   You must follow the instructions of the selected LLM helper in their specific documentation before starting the project.

## Built-in Features

- **Generative AI Support**: This template includes both the **ollama helper** and **plugin** by default to help you get started with generative AI features.
- **NLU API**: A built-in Natural Language Understanding (NLU) API is provided for intent recognition and language detection.

## Extending Hexabot

You can easily extend Hexabot's functionality by installing additional extensions (channels, helpers, plugins) via npm. Below are some examples:

- Install a new channel (e.g., Messenger):

  ```bash
  npm install hexabot-channel-messenger
  ```

- Install a new plugin (e.g., ChatGPT integration):
  ```bash
  npm install hexabot-plugin-chatgpt
  ```

## Docker Setup

This template comes with a pre-configured **Dockerfile** and **docker-compose.yml** to help you containerize your project quickly.

- **Dockerfile**: Builds your Hexabot-based project.
- **docker-compose.yml**: Defines the necessary services for your project, allowing you to start everything with a single command.

## Documentation

For detailed information on how to get started, as well as in-depth user and developer guides, please refer to our full documentation available in the docs folder or visit the [Documentation](https://docs.hexabot.ai).

## Contributing

We welcome contributions from the community! Whether you want to report a bug, suggest new features, or submit a pull request, your input is valuable to us.

Please refer to our contribution policy first : [How to contribute to Hexabot](https://github.com/Hexastack/Hexabot/blob/main/CONTRIBUTING.md)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)

Feel free to join us on [Discord](https://discord.gg/rNb9t2MFkG)

## License

This software is licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:

1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).

---

Happy building with Hexabot! 🎉

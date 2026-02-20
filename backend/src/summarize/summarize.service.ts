import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SummarizeService {
  private readonly groqApiKey: string;
  private readonly groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private configService: ConfigService) {
    this.groqApiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!this.groqApiKey) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }
  }

  async summarize(content: string): Promise<string> {
    // Limit content to 12000 characters
    const limitedContent = content.substring(0, 12000);

    try {
      const response = await axios.post(
        this.groqApiUrl,
        {
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that provides concise and accurate summaries of web page content.',
            },
            {
              role: 'user',
              content: `Please provide a clear and concise summary of the following content:\n\n${limitedContent}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${this.groqApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const summary = response.data.choices[0]?.message?.content?.trim();
      if (!summary) {
        throw new Error('No summary received from Groq API');
      }

      return summary;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ||
          error.message ||
          'Failed to generate summary';
        throw new Error(`Groq API error: ${message}`);
      }
      throw error;
    }
  }
}

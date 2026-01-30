import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ROAST_PROMPT = `You are a brutally honest LinkedIn content critic. Your job is to roast bad LinkedIn posts and provide specific, actionable feedback.

Analyze the post for:
1. **Hook** - Does the first line grab attention or is it boring?
2. **Value** - Does it provide actual value or is it just noise?
3. **Structure** - Is it scannable or a wall of text?
4. **Authenticity** - Is it genuine or corporate BS?
5. **Call-to-action** - Does it encourage engagement or leave people hanging?

Provide:
- A brutally honest roast (be funny but harsh)
- Engagement score (0-100)
- 3-5 specific improvements
- An improved version of the post

Be direct, funny, and helpful. No sugar-coating.`;

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide at least 10 characters of content' },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: 'Content too long. Maximum 5000 characters.' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: ROAST_PROMPT,
        },
        {
          role: 'user',
          content: `Roast this LinkedIn post:\n\n${content}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the response - expecting a structured format
    // For MVP, we'll use a simpler approach and parse sections
    const roastMatch = response.match(/(?:roast|criticism):?\s*\n\n?([\s\S]*?)(?=\n\n(?:score|engagement score|improvements|improved version))/i);
    const scoreMatch = response.match(/(?:score|engagement score):?\s*(\d+)/i);
    const improvementsMatch = response.match(/(?:improvements|how to fix):?\s*\n\n?([\s\S]*?)(?=\n\n(?:improved version|$))/i);
    const improvedMatch = response.match(/(?:improved version|rewrite):?\s*\n\n?([\s\S]*?)$/i);

    // Extract or default values
    const roast = roastMatch ? roastMatch[1].trim() : response.substring(0, 500);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    
    let improvements: string[] = [];
    if (improvementsMatch) {
      improvements = improvementsMatch[1]
        .split(/\n/)
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^[-•\d.)\s]+/, '').trim())
        .filter(line => line.length > 10)
        .slice(0, 5);
    }

    const improved = improvedMatch ? improvedMatch[1].trim() : null;

    return NextResponse.json({
      roast,
      score,
      improvements: improvements.length > 0 ? improvements : [
        'Make your hook more compelling',
        'Add specific value or insights',
        'Break up long paragraphs',
        'Include a clear call-to-action',
        'Be more authentic and less corporate',
      ],
      improved: improved || content, // Fallback to original if parsing fails
      raw: response, // Include raw response for debugging
    });
  } catch (error: any) {
    console.error('Roast API error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to roast content',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

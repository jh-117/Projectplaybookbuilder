import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateRequest {
  title: string;
  category: string;
  summary: string;
  rootCause?: string;
  impact?: string;
  industry: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const requestData: GenerateRequest = await req.json();
    const { title, category, summary, rootCause, impact, industry } = requestData;

    if (!title || !category || !summary || !industry) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (title.trim().length < 3 || summary.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: 'Title and summary must be sufficiently detailed' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const validationPrompt = `Analyze if the following incident description is meaningful and provides enough information to create a lessons learned playbook entry:

Title: ${title}
Summary: ${summary}

Respond with a JSON object containing:
{
  "isValid": boolean (true if meaningful, false if random/insufficient),
  "reason": string (explanation if not valid)
}

Consider it invalid if:
- The text appears to be random characters or gibberish
- The summary lacks substance or context
- There's no clear incident or issue described
- It's too vague to derive actionable insights`;

    const validationResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a validator that determines if incident descriptions are meaningful and actionable. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: validationPrompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    });

    if (!validationResponse.ok) {
      const errorText = await validationResponse.text();
      console.error('OpenAI validation error:', errorText);
      throw new Error(`OpenAI API error: ${validationResponse.status}`);
    }

    const validationData = await validationResponse.json();
    const validation = JSON.parse(validationData.choices[0].message.content);

    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          error: validation.reason || 'The provided information is not sufficient to generate a meaningful playbook entry. Please provide a clear description of the incident, what happened, and relevant details.'
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const prompt = `You are an expert project management consultant creating a playbook entry for a "Lessons Learned" system in the ${industry} industry.

Incident Details:
- Title: ${title}
- Category: ${category}
- Summary: ${summary}
${rootCause ? `- Root Cause: ${rootCause}` : ''}
${impact ? `- Impact: ${impact}` : ''}

Generate a comprehensive playbook entry with the following:

1. If root cause wasn't provided, analyze and provide a detailed root cause.
2. If impact wasn't provided, analyze and describe the business impact.
3. A clear, actionable recommendation to prevent this issue from recurring.
4. A "Do List" with 4-6 specific action items that should be taken.
5. A "Don't List" with 4-6 anti-patterns or things to avoid.
6. A "Prevention Checklist" with 4-6 proactive measures.

Format your response as JSON with this structure:
{
  "rootCause": "string",
  "impact": "string",
  "recommendation": "string",
  "doList": ["string", ...],
  "dontList": ["string", ...],
  "preventionChecklist": ["string", ...]
}

Make the content specific to the ${industry} industry and ${category} context. Be concise but actionable.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a project management expert creating detailed, actionable playbook entries. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const generatedContent = JSON.parse(openaiData.choices[0].message.content);

    const result = {
      rootCause: rootCause || generatedContent.rootCause,
      impact: impact || generatedContent.impact,
      recommendation: generatedContent.recommendation,
      doList: generatedContent.doList,
      dontList: generatedContent.dontList,
      preventionChecklist: generatedContent.preventionChecklist,
    };

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in generate-playbook function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred while generating the playbook' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
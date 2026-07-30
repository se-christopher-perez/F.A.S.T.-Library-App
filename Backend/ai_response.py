
import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_lookup(question):

    system_prompt = """You are a coding reference assistant. Given a question,
    respond with ONLY a JSON object (no markdown, no explanation) with these exact keys:

    title: a short snake_case identifier for this lookup
    category: must be exactly one of "Syntax", "Algorithm", "Formula", or "Tools"
    content: the actual code, command, or syntax that answers the question
    beginner_explanation: a simple one-sentence explanation for beginners
    advance_explanation: a more technical one-sentence explanation for advanced users
    """

    response = client.chat.completions.create(
        
        model="gpt-4o-mini",

        messages=[

            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}

        ],

        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)
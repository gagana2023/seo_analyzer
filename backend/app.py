from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

# Get your TextRazor API key from environment variable
TEXTRAZOR_API_KEY = os.getenv('TEXT_RAZOR_API_KEY')

if not TEXTRAZOR_API_KEY:
    raise RuntimeError("Please set the TEXT_RAZOR_API_KEY environment variable")

# Endpoint to analyze text and get keywords
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    headers = {
        'x-textrazor-key': TEXTRAZOR_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'text': text,
        'extractors': 'entities'
    }

    try:
        response = requests.post('https://api.textrazor.com', headers=headers, data=payload)
        response.raise_for_status()
        result = response.json()

        # Extract entities from TextRazor response
        entities = result.get('response', {}).get('entities', [])

        # Return only the extracted entities
        return jsonify({'response': {'entities': entities}})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to generate an AI-based sentence with a given keyword
@app.route('/generate_sentence', methods=['POST'])
def generate_sentence():
    data = request.get_json()
    keyword = data.get('keyword', '').strip()
    if not keyword:
        return jsonify({'error': 'No keyword provided'}), 400

    prompt = f"Write only one meaningful, simple, SEO-friendly sentence using the keyword '{keyword}'. Do NOT add any explanation or commentary."

    ollama_payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post('http://localhost:11434/api/generate', json=ollama_payload)
        response.raise_for_status()
        generated = response.json()

        # Use 'response' key as per Ollama API
        sentence = generated.get('response', '')
        return jsonify({'sentence': sentence})

    except Exception as e:
        print("Error during Ollama call:", e)
        return jsonify({'error': 'AI generation error'}), 500

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)

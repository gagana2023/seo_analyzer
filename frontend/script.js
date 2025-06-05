document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  const inputText = document.getElementById('inputText');
  const keywordsDiv = document.getElementById('keywords');
  const textPreview = document.getElementById('textPreview');

  // Store inserted keywords to avoid repeats
  let insertedKeywords = new Set();

  // Analyze button click handler
  submitBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
      alert('Please enter some text!');
      return;
    }

    keywordsDiv.innerHTML = 'Loading...';
    textPreview.value = text;
    insertedKeywords.clear();

    try {
      const res = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const entities = data.response?.entities || [];

      if (entities.length === 0) {
        keywordsDiv.innerHTML = 'No keywords found.';
        return;
      }

      // Filter unique keywords (case insensitive)
      const uniqueKeywords = [];
      const seen = new Set();
      for (const ent of entities) {
        const kw = ent.entityId.trim();
        const lowerKw = kw.toLowerCase();
        if (kw && !seen.has(lowerKw)) {
          seen.add(lowerKw);
          uniqueKeywords.push(kw);
        }
      }

      // Separate keywords already present in text and new ones
      const lowerText = text.toLowerCase();
      const newKeywords = uniqueKeywords.filter(kw => !lowerText.includes(kw.toLowerCase()));
      const usedKeywords = uniqueKeywords.filter(kw => lowerText.includes(kw.toLowerCase()));

      // Clear and add headings
      keywordsDiv.innerHTML = '';
      if (usedKeywords.length > 0) {
        const usedHeader = document.createElement('h3');
        usedHeader.textContent = 'Keywords already used:';
        keywordsDiv.appendChild(usedHeader);
        usedKeywords.forEach(kw => {
          const btn = document.createElement('button');
          btn.textContent = kw;
          btn.disabled = true; // disable used keywords
          keywordsDiv.appendChild(btn);
        });
      }

      if (newKeywords.length > 0) {
        const newHeader = document.createElement('h3');
        newHeader.textContent = 'New Keywords (click to generate sentence):';
        keywordsDiv.appendChild(newHeader);

        newKeywords.forEach(kw => {
          const btn = document.createElement('button');
          btn.textContent = kw;
          btn.addEventListener('click', () => generateSentence(kw));
          keywordsDiv.appendChild(btn);
        });
      } else {
        const noNew = document.createElement('p');
        noNew.textContent = 'No new keywords to insert.';
        keywordsDiv.appendChild(noNew);
      }

    } catch (error) {
      keywordsDiv.textContent = 'Error fetching keywords.';
      console.error(error);
    }
  });

  // Function to call backend AI sentence generation and show result
  async function generateSentence(keyword) {
    try {
      const res = await fetch('http://127.0.0.1:5000/generate_sentence', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) throw new Error('AI generation error');
      const data = await res.json();

      if (data.error) {
        alert('Error: ' + data.error);
        return;
      }

      const sentence = data.sentence.trim();
      if (!sentence) {
        alert('No sentence generated.');
        return;
      }

      // Show only the generated sentence in the preview (replace old preview)
      textPreview.value = sentence;

      // Optional: clear input area if you want (commented out)
      // inputText.value = '';

    } catch (err) {
      alert('Failed to generate sentence: ' + err.message);
      console.error(err);
    }
  }
});

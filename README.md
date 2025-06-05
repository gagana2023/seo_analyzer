# SEO Analyzer with AI Sentence Generation 🚀

This is a full-stack SEO analysis web application that helps you analyze any text (blog, tweet, caption, etc.) using the [TextRazor API](https://www.textrazor.com/) and suggests **new, meaningful keywords**. It also uses the **Mistral AI model via [Ollama](https://ollama.com/)** to generate SEO-friendly sentences for new keywords — giving you smart content suggestions on the fly.

---

## ✨ Features

- ✅ Extracts SEO entities/keywords using the TextRazor API.
- ✅ Detects which keywords are **already present** and which are **new suggestions**.
- ✅ On clicking a new keyword, the app generates a **meaningful, SEO-friendly sentence** using **Mistral LLM (via Ollama)**.
- ✅ Clean interface with text preview.
- ✅ Fully local, works offline after initial setup.

---

## 🖥️ Tech Stack

| Layer       | Technology Used             |
|-------------|----------------------------|
| Frontend    | HTML, CSS, JavaScript      |
| Backend     | Python (Flask)             |
| AI Engine   | Mistral via Ollama (Local LLM) |
| NLP API     | TextRazor API              |

---

## 🔧 Installation & Setup

### 1. Clone the Repository

~~~bash
git clone https://github.com/gagana2023/seo_analyzer.git
cd seo_analyzer/backend
~~~

### 2. Set up Python virtual environment and install dependencies

~~~bash
python -m venv .venv

# Activate the environment:

# On Windows PowerShell:
.venv\Scripts\activate

# On Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
~~~

### 3. Set environment variables

Set your TextRazor API key as an environment variable:

- On Windows PowerShell:
~~~powershell
$env:TEXT_RAZOR_API_KEY="your_actual_api_key_here"
~~~

- On Mac/Linux:
~~~bash
export TEXT_RAZOR_API_KEY="your_actual_api_key_here"
~~~

### 4. Run the backend server

Make sure you are inside the `backend` directory and run:

~~~bash
python app.py
~~~

The backend server will start at `http://127.0.0.1:5000`

### 5. Start the Ollama Mistral model

In a **new terminal window**, run the following to start the local AI model server:

~~~bash
ollama run mistral
~~~

This will expose the AI generation API at `http://localhost:11434/api/generate`

### 6. Run the frontend server

Open **another new terminal**, navigate to the frontend folder (root folder or where your `index.html` is), and run:

~~~bash
python -m http.server 8000
~~~

This will serve your frontend on `http://localhost:8000`

---

## 🚀 Usage

- Open your browser and go to `http://localhost:8000`
- Paste any blog, tweet, or caption text into the input box.
- Click **Analyze** to get keywords.
- Click on **new keywords** to generate meaningful SEO-friendly sentences using AI.
- Generated sentences will appear in the preview area.

---

## ⚠️ Notes

- Make sure the backend server and Ollama AI server are running simultaneously for full functionality.
- The TextRazor API requires a valid API key.
- Ollama must be installed and properly configured on your machine to serve the Mistral model.

---

Happy SEO analyzing! 🎉

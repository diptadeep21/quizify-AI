AI Quiz Builder 🎯

An AI-powered quiz generation platform designed to help professors and educators quickly create customized quizzes based on topic, difficulty level, and number of questions.
The application uses Google Gemini API to generate high-quality, context-aware questions suitable for academic use.

🚀 Features

Generate quizzes instantly using AI

Customize:

📘 Topic

🎚️ Difficulty level

🔢 Number of questions

Clean and responsive UI

Real-time quiz generation

Designed for academic and classroom use

Uses Google Gemini for accurate and structured questions

🛠️ Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Backend

Node.js

Express.js

Google Gemini API

🧠 How It Works

User enters:

Quiz topic

Difficulty

Number of questions

Frontend sends a request to the backend.

Backend calls Google Gemini API with a structured prompt.

Gemini generates quiz questions.

The generated quiz is returned and displayed on the UI.

⚙️ Project Setup (Local Development)
Prerequisites

Node.js (v18 or above recommended)

npm

1️⃣ Clone the Repository
git clone <YOUR_GIT_URL>
cd <PROJECT_FOLDER>

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

GEMINI_API_KEY=your_google_gemini_api_key
PORT=3001

4️⃣ Run the Project (Frontend + Backend)
npm run dev:full


Frontend runs on Vite

Backend runs on Express (port 3001)

API requests are proxied automatically during development

📡 API Endpoint
Generate Quiz

POST /generate

Request Body:

{
  "topic": "Data Structures",
  "difficulty": "Medium",
  "numQuestions": 10
}


Response:

AI-generated quiz questions formatted for easy rendering

🎓 Use Case

Professors creating quizzes quickly

Teachers preparing practice tests

Students generating self-assessment questions

Academic demos and AI-based education projects

🌐 Deployment

The project can be deployed easily using modern frontend hosting platforms.
Once deployed, the backend handles secure quiz generation via the Gemini API.

📌 Future Enhancements

Export quizzes as PDF / Word

MCQ + descriptive question formats

Quiz timer and evaluation

User authentication

Question bank storage

👨‍💻 Author

Developed as an academic and AI-focused project to demonstrate real-world usage of Generative AI in education.
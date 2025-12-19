# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/da72234e-a41e-48ae-9d22-6cb1171195fe

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/da72234e-a41e-48ae-9d22-6cb1171195fe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI Quiz Generation via Gemini

This project includes an Express backend to generate quizzes using Google Gemini.

Setup:

1. Create a `.env` file at the project root with your credentials:

```
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

2. Install deps and run both servers locally:

```
npm install
npm run dev:full
```

The frontend posts to `/generate` with `{ topic, difficulty, numQuestions }` and renders the result under the Generate page form. Vite proxies this to the Express server at port 3001 during development.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/da72234e-a41e-48ae-9d22-6cb1171195fe) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

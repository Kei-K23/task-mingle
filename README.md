# TaskMingle (Task management solution web application)

## Overview

TaskMingle is a collaborative task management web application, inspired by Trello. It provides a flexible and visual way to organize tasks, projects, and workflows, allowing teams to collaborate seamlessly.

## Features

Key Features:

- Auth
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited boards
- Beautiful landing page

## Tech Stack

- Next.js 14 (server action for data mutation)
- Mongodb
- Prisma
- Clerk (Auth)
- TypeScript
- Tailwind / ShadcnUI
- Stripe

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database for storing application data.

### Installation

1. Clone the repository: `git clone https://github.com/Kei-K23/task-mingle`
2. Navigate to the project directory: `cd your-web-app`
3. Install dependencies: `npm install`
4. Configure environment variables.
5. Start the application locally: `npm run dev`

### Configuration

Make sure to set the following environment variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
- CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in<modify_as_you_need>
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/<modify_as_you_need>

- NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<YOUR_UNSPLASH_ACCESS_KEY>
- NEXT_PUBLIC_UNSPLASH_SECRET_KEY=<YOUR_UNSPLASH_SECRET_KEY>

- DATABASE_URL=<YOUR_MONGODB_DATABASE_CONNECTION_STRING>

- STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>

- WEBHOOK_SECRET_KEY=<YOUR_WEBHOOK_SECRET_KEY_FOR_STRIPE>

- NEXT_PUBLIC_APP_URL=http://localhost:3000

## Contributing

We welcome contributions from the community! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Trello for the inspiration.

---

Happy collaborating with Your Web Application Name! 🚀

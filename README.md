# LeedsAI — SAAS Instagram DM Automations

LeedsAI is a full-stack **SaaS platform** for **Instagram automation**, enabling businesses and creators to automate direct message workflows, reply to comments, trigger automations based on keywords and story replies, and scale audience engagement using AI. Built with modern technologies including **Next.js**, **Tailwind CSS**, **Instagram API integration with OAuth**, **Prisma**, and **Instagram Webhooks**.

---

## 🚀 Live Demo

- Live Application: https://leedsai.vercel.app

---

## 🧩 Key Features

LeedsAI includes the core features expected from an Instagram automation SaaS:

- 📹 **Instagram API integration with OAuth**  
  Secure login and account connection using Meta/Instagram OAuth.

- 💻 **Automation Builder**  
  Create and manage automations that trigger actions based on incoming messages or events.

- 📤 **Comment Automations**  
  When users comment on posts, automatically send DMs or follow-up actions.

- 👥 **DM Automations**  
  Keyword-based Instagram DM automation for outreach or replies.

- 📝 **Story Reply Automations**  
  Automate responses to story replies via Instagram messaging.

- 🤖 **AI-Powered DM Responses**  
  Smart AI automations designed for high-ticket sales and intelligent engagement.

- ⏳ **Seamless Dashboard & Metrics**  
  Track automation performance, engagement counts, and other analytics.

- 💡 **Pricing Plans & Payments**  
  Built-in subscription plans and payment handling.

- 💬 **Meta Webhooks Support**  
  Real-time webhook handling for Instagram message events and updates.

---

## 🚀 Tech Stack

This project uses a modern stack for rapid development and scalability:

- **Next.js** – App Router & server/client components
- **React** – Frontend UI
- **Tailwind CSS** – Utility-first styling
- **Instagram API** (Graph API) – For messaging & automation events
- **OAuth & Webhooks** – Authentication and real-time platform events
- **Prisma** – ORM for database modeling
- **Relume (Optional)** – UI components/blocks
- **Webhook Endpoints** – Real-time Instagram messaging
- **AI Integration** – Smart automated DM AI logic

---

## 🛠️ Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/all-black-493/leedsai.git
    cd leedsai
    ```

2.  **Install the dependencies**

        ```bash
        npm install, or
        pnpm install

        ```

## ⚙️ Environment Variables

- Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
INSTAGRAM_REDIRECT_URI=
DATABASE_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
WEBHOOK_SECRET=          # Instagram webhook secret
STRIPE_SECRET_KEY=       # if using Stripe
STRIPE_WEBHOOK_SECRET=   # if using Stripe webhooks


```

- Replace placeholders with your real credentials and tokens.

## 📦 Development

- RUn Development Server

```bash

npm run dev
# or
pnpm dev

```

- Visit the app at:

```bash

http://localhost:3000

```

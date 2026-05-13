# bilimly.ai

I built this because I wanted to learn languages the way I actually learn things — by talking, making mistakes, and
getting instant feedback. Bilimly (from the Uzbek word for "knowledgeable") is a language learning app that connects you
with an AI tutor powered by Claude, walks you through grammar and vocabulary lessons, and tracks your progress along the
way.

It supports English, Russian, and Uzbek — both in the interface and as learning targets.

---

## What it does

You sign up, pick a learning track, and work through structured lessons — grammar rules, vocabulary sets, listening
exercises, speaking practice. Each lesson has interactive exercises (fill in the blank, multiple choice, sentence
builder). Between lessons you can open the chat and just talk to the AI tutor, ask it to explain something, or get
feedback on a sentence you wrote.

There's an XP system, progress bars per skill, and an activity chart on the dashboard so you can see how consistent
you've been.

---

## Stack

**Frontend** — React + TypeScript, Vite, Tailwind CSS, i18next for translations

**Backend** — Java 17, Spring Boot, Spring Security with JWT auth, PostgreSQL

**AI** — Anthropic Claude API, with a caching layer (Redis + in-memory fallback) so repeated or similar questions don't
hammer the API

**Security** — input sanitization on everything going into the AI, rate limiting, role-based route protection

---

## Running it locally

You'll need Node 18+, Java 17+, and PostgreSQL. Redis is optional — it falls back to in-memory caching if Redis isn't
running.

**Backend:**

```bash
cd server
# copy the example config and fill in your values
cp src/main/resources/application.properties.example src/main/resources/application.properties
./mvnw spring-boot:run
```

The properties you need to set:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bilimly
spring.datasource.username=your_user
spring.datasource.password=your_password

anthropic.api.key=sk-ant-...

jwt.secret=some_long_random_string
jwt.expiration=86400000
```

**Frontend:**

```bash
cd frontend
npm install
# create a .env with VITE_API_URL=http://localhost:8080
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project structure

```
bilimly.ai/
├── frontend/src/
│   ├── components/        # reusable UI pieces + exercise types
│   ├── pages/             # one folder per feature (Grammar, Vocabulary, Chat, etc.)
│   ├── layouts/           # protected vs public route wrappers
│   ├── locales/           # translation files: en, ru, uz
│   └── services/          # API calls
│
└── server/src/main/java/com/bilimly/backend/
    ├── ai/                # Claude integration + caching layer
    ├── auth/              # JWT login/register flow
    ├── security/          # input sanitizer, rate limiter
    └── user/              # user model and service
```

---

## A few things I'm particularly happy with

The AI caching system was a fun problem. Claude responses are expensive and slow to generate, so I built a two-layer
cache — Redis for persistence, in-memory as a fallback — that stores responses by a semantic key built from the request
context. It meaningfully cuts down on API calls for common questions.

The multilingual support goes deeper than just translating button labels. The backend serves localized error messages (
`messages_en.properties`, `messages_uz.properties`) and the AI tutor is prompted to respond in the user's selected
language.

---

## What's next

- Spaced repetition for vocabulary (the forgetting curve is real)
- Voice input for speaking exercises
- More languages — Kazakh and Turkish are the priority
  c[github.com/sevara-badriddinova](https://github.com/sevara-badriddinova) · [LinkedIn](https://linkedin.com/in/yourprofile)
# AI Resume Builder

A full-stack SaaS-style web application that helps users create, edit, and manage professional resumes efficiently using AI-assisted content generation and real-time auto-save.

The project focuses on **user experience, data consistency, and clean system architecture**, rather than just AI usage.

---

## 🚀 Features

- Step-by-step resume editor with live preview
- AI-assisted generation for summaries and experience sections
- Real-time auto-save with debouncing
- Secure user authentication
- Resume photo uploads with preview handling
- Manage multiple resumes per user
- Persistent storage with structured resume data

---

## 🧠 Architecture Overview

The application is designed as a **modular full-stack system**:

1. Users authenticate and access a personal dashboard
2. Resume data is edited in a multi-step form
3. Client-side state changes are debounced
4. Updates are persisted via secure server actions
5. AI generation requests are handled server-side
6. Media uploads are stored separately from resume data
7. Live preview reflects saved state in real time

> The system prioritizes data integrity and smooth UX over aggressive feature expansion.

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js
- **Backend:** Next.js Server Actions
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Clerk
- **AI Integration:** OpenAI API
- **Media Storage:** Blob / object storage

---

## ⚙️ Key Design Decisions

- Implemented **auto-save with debouncing** to reduce unnecessary database writes
- Kept AI generation **server-side** for security and control
- Stored resume data in **structured schemas** instead of free text
- Uploaded images to object storage instead of the database
- Focused on reproducibility and clean data flow over feature volume

---

## 🔐 Security & Data Ownership

- All resume operations are scoped to authenticated users
- Server actions validate ownership before database access
- Media uploads return public URLs without exposing credentials
- AI requests are validated and sanitized server-side

---

## ⚠️ Limitations

- Designed for individual users (no team collaboration yet)
- Free-tier services used during development
- No resume version history or collaboration features

---

## 🔮 Future Improvements

- Resume version history and change tracking
- Advanced AI customization controls
- More export formats and templates
- Role-based access and sharing
- Paid plan and subscription support

---

## 📌 Purpose

This project was built to simulate a **real-world SaaS product**, combining frontend UX, backend reliability, and controlled AI integration.

It demonstrates practical full-stack engineering, not just AI prompt usage.


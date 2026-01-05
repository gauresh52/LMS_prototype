# Learning Management System (LMS) – Prototype

## Overview

This project is a frontend prototype of a Learning Management System (LMS) developed as part of the second-round technical task for the Software Developer Intern position at DDIL, Goa University.

The application demonstrates a complete learning workflow:

Pre-Test → Video Learning → Post-Test → Score Evaluation

The prototype focuses on controlled assessments, enforced video playback, smooth state management, and a clean, professional user experience. No backend services are used.

---

## Tech Stack

- Frontend Framework: React.js (Functional Components & Hooks)
- Styling: Tailwind CSS (Custom UI Theme)
- State Management: React State + localStorage
- Backend: None (Hardcoded JSON data)
- Deployment: Vercel

---

## Core Features

### 1. Quiz Module (Pre-Test & Post-Test)

- Pool of 15 dummy MCQ questions.
- Random selection of 3 questions per test.
- Questions persist across refresh to avoid reshuffling.
- Pre-Test is the first screen.
- Post-Test unlocks only after video completion.
- Immediate grading:
  - Pre-Test: Score displayed in a popup modal.
  - Post-Test: Final score displayed on score page.

---

### 2. Video Player

- Embedded HTML5 video.
- Custom controls only (no browser controls).
- Play / Pause / Replay.
- Timeline progress bar.
- Current time and total duration display.
- Skipping disabled.
- Post-Test unlocks only after full video completion.

---

### 3. State Management

Application flow:

Pre-Test → Video → Post-Test → Score

- State controlled using a central stage variable.
- Progress persisted in localStorage.
- Refresh-safe workflow.

---

### 4. Admin Panel (Bonus Feature)

- Admin login with seeded credentials.
- Add, edit, delete questions.
- Maximum of 15 questions enforced.
- Admin changes persist for future attempts.
- Student attempts are not affected.
- Admin access disabled once assessment starts.

---

### 5. Persistence (Bonus Feature)

localStorage is used to persist:
- Current stage
- Selected quiz questions
- Quiz scores
- Video completion status

---

### 6. UI & UX

- Responsive design (desktop & mobile).
- Tailwind-based design system.
- Consistent cards, buttons, and inputs.
- Subtle background gradient for professional appearance.
- Clear progress bar for assessment steps.

---

## Project Structure

src/
components/
pages/
data/
styles/
App.jsx
main.jsx

---

## How to Run Locally

1. Clone the repository

  git clone https://github.com/gauresh52/LMS_prototype.git
  cd lms-prototype

2. Install dependencies

  npm install

3. Start development server

  npm run dev

Application runs at http://localhost:5173

---

## Deployment

- Deployed using Vercel.
- Build command: npm run build
- Output directory: dist

---

## Assumptions & Design Decisions

- No backend used as per task requirement.
- Answers are evaluated only on submission.
- In-progress answers are not persisted to avoid overengineering.
- Pre-Test score is shown as a popup to maintain learning flow.
- Video playback enforcement ensures learning compliance.

---

## Conclusion

This LMS prototype fulfills all core requirements specified in the task and includes multiple bonus features. The implementation prioritizes correctness, user flow control, and professional UI design suitable for academic LMS systems.

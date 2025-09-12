# Riwaq

Frontend scaffold for **Riwaq** — built with **React + Vite (JS)**, **Tailwind CSS**, **React Router**, **Redux Toolkit**, and **Formik + Yup**.

> 🔐 **Auth is adapter-based**
>
> - **Now:** mock (localStorage) so everyone can build/test UI.
> - **Later:** flip a single import to switch to **Firebase Auth** (see “Auth Flow” below).

---

## Quick Start

**Prerequisites**

- Node 20+
- Git
- (Recommended) VS Code + ESLint extension

**Install & run**

~~~bash
git clone https://github.com/makar132/Riwaq.git
cd Riwaq
cp .env.example .env          # leave Firebase values empty for now
npm i
npm run dev                   # open the printed URL (e.g., http://localhost:5173)
~~~

If you can navigate **Home / Login / Register**, you’re set.

---

## Environment

Create `.env` from the example:

~~~env
VITE_API_BASE_URL=http://localhost:3000

# Firebase (fill these when we integrate Firebase)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
~~~

❗ **Never commit real secrets.** Keep `.env` local or set env vars in your deployment provider.

---

## Scripts

~~~bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview the build locally
~~~

---

## Project Structure

~~~txt
src/
  app/            # Redux store
  components/     # shared UI (e.g., ProtectedRoute, Modal)
  features/       # domain slices & feature components (auth, etc.)
    auth/
      authSlice.js
  pages/          # route screens (Home, Login, Register, Dashboard, ...)
  services/       # adapters/clients
    auth/
      index.js    # exports the current auth adapter
      mock.js     # mock auth (localStorage) – current
      firebase.js # Firebase adapter – to be implemented later
  assets/
  App.jsx
  main.jsx
  index.css
~~~

---

## Auth Flow (Mock now → Firebase later)

**Components do:**
- Dispatch Redux thunks: `login({ email, password })`, `register(...)`, `logout()`
- Read state from `state.auth` (`user`, `status`, `error`)
- Guard routes with `<ProtectedRoute>` (and `<ProtectedRoute requireAdmin>` for admin-only)

**Logic lives in:**
- `src/features/auth/authSlice.js` — source of truth
- `src/services/auth/index.js` — selects the adapter:

~~~js
// CURRENT (mock so UI devs can work)
export { subscribeToAuthChanges, login, register, logout } from './mock'

// LATER (switch to Firebase by flipping this import)
/// export { subscribeToAuthChanges, login, register, logout } from './firebase'
~~~

**Mock tips:**
- Any email works; password length ≥ 6 for Yup validation.
- Emails ending with `@admin.com` are treated as **admin** (`isAdmin: true`) for testing.

---

## Team Workflow (Very Short)

- **Never push to `main`** (it’s protected).
- Start a task:

~~~bash
git switch main && git pull && git switch -c feat/<task>
~~~

- Keep PRs **small**; open a **Draft PR** early.
- Request review from **@makar132**.
- Full details: see **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## Troubleshooting

- **Dev server won’t start:**  
  Run `cp .env.example .env && npm i && npm run dev` and verify Node 20+.

- **Refresh loses auth:**  
  Ensure `initAuth()` is dispatched once in `App.jsx`, and pull latest `main`.

- **Can access admin page as normal user:**  
  Route must use `<ProtectedRoute requireAdmin>` and user’s `isAdmin` must be a **boolean**.

---

## Roadmap (near-term)

- [ ] Implement Login & Register UIs with Formik + Yup.
- [ ] Add basic error & loading states in forms.
- [ ] Owner: implement Firebase adapter (`services/auth/firebase.js`) and flip the export in `services/auth/index.js`.
- [ ] Admin page skeleton (guarded via `requireAdmin`).

---

## Getting Started — GIF Checklist

> Place short GIFs under `docs/gifs/` (or update paths below).  
> Each item links to a tiny demo so newcomers onboard fast.

- [ ] **Clone repo & run dev server**  
      Expected: Vite starts, Home loads.  
      ![Clone & Run](docs/gifs/01-clone-run.gif)

- [ ] **Create `.env` from example**  
      Expected: `.env` present; dev server reads it.  
      ![Create .env](docs/gifs/02-env.gif)

- [ ] **Create a feature branch** (e.g., `feat/login-form`)  
      Expected: new branch appears locally and on GitHub.  
      ![Create Branch](docs/gifs/03-branch.gif)

- [ ] **Open a Draft PR**  
      Expected: PR template appears; mark as Draft.  
      ![Open Draft PR](docs/gifs/04-draft-pr.gif)


---

## License

Private repository — internal use only.

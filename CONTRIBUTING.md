# Contributing to Riwaq

Thanks for helping build **Riwaq**. This guide explains how we work: setup, daily Git routine, branch/commit rules, and the pull-request process. It’s written to be beginner-friendly and specific to our stack.

- Frontend: **React + Vite (JS)**
- Styling: **Tailwind CSS** (no other UI libs)
- Forms/Validation: **Formik + Yup**
- State: **Redux Toolkit** with `createSlice` + `createAsyncThunk`
- Routing: **React Router**
- Auth: Mock adapter now → **Firebase** later (swap via `services/auth/index.js`)

---

## 0) Repo Access & Rules

- You are a **collaborator** on a private repo.
- `main` is **protected**. You **cannot** push to `main`.
- All work happens on short-lived **feature branches**.
- Merges require **Code Owner** review (owner: `@makar132`) and happen via **squash merge**.

---

## 1) First-Time Setup (one-time)

~~~bash
git clone https://github.com/makar132/Riwaq.git
cd Riwaq
cp .env.example .env            # leave Firebase values empty for now
npm i
npm run dev                     # open the printed URL (e.g., http://localhost:5173)
~~~

If the app runs and you can navigate Home / Login / Register, you’re set.

---

## 2) Daily Git Workflow

> Never push to `main`. Always work on a branch and open a PR.

### A) Starting a **new task** (create a branch)

~~~bash
git switch main
git pull origin main

git switch -c feat/<short-task-name>   # e.g., feat/login-form
# ...code changes...

git add -A
git commit -m "feat(auth): add login form with formik+yup"

git push -u origin HEAD                 # then open a DRAFT PR on GitHub
~~~

### B) **Continuing** work on an **existing branch**

~~~bash
git fetch origin
git switch main
git pull origin main

git switch feat/<short-task-name>

# bring latest main into your branch (choose ONE)
git merge origin/main                   # easiest to understand

# ...more changes...
git add -A
git commit -m "fix(auth): handle invalid credentials"
git push
~~~

**Keep PRs small** (ideally ≤ ~300–400 LOC). Push early. Use **Draft PR** until ready.

---

## 3) Branch & Commit Rules

**Branch names**
- `feat/<scope>` – new features
- `fix/<scope>` – bug fixes
- `chore/<scope>` – tooling/maintenance
- `docs/<scope>` – documentation

**Commit messages** (short and clear)
- `feat(auth): add formik+yup login`
- `fix(products): handle empty response`
- `chore: setup tailwind plugins`

---

## 4) Running the App Locally

~~~bash
cp .env.example .env   # once per clone
npm i                  # whenever dependencies change
npm run dev
~~~

- Do **not** commit real secrets or your `.env`.
- If the dev server fails, delete `node_modules` and run `npm i` again.

---

## 5) Where to Work (Auth focus right now)

**Implement pages**
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`

**Use Formik + Yup**
- Validate email + password on both pages.
- On submit:
  - `dispatch(login({ email, password }))`
  - `dispatch(register({ email, password }))`

**Read auth state**
- `state.auth.user` – current user or `null`
- `state.auth.status` – `'idle' | 'loading' | 'succeeded' | 'failed'`
- `state.auth.error` – last error message (if any)

**Logout**
- The header’s Logout button already calls `dispatch(logout())`.
- **Do not** call `localStorage` directly from components.

**Protected routes**
- Use `<ProtectedRoute>` for logged-in areas.
- Use `<ProtectedRoute requireAdmin>` for admin-only routes.

---

## 6) Pull Request Process

1) Open a **Draft PR** when you start working (helps teammates see progress).
2) Fill in title + description; **attach screenshots/GIFs** if UI changed.
3) Keep PR small; address review comments promptly.
4) Request review from **@makar132**.
5) The owner will **squash & merge** after approval.

**PR checklist** (auto-shown via template):
- Up-to-date with `main` (merged or rebased)
- Runs locally (`npm run dev`)
- Tailwind for styling (no other UI libs)
- Formik + Yup used (no browser alerts)
- Clear labels/text; screenshots for UI

---

## 7) Code Style & Project Conventions

- **Tailwind only** for styling (utility classes, responsive with `sm:`/`md:`/`lg:`).
- **Formik + Yup** for all form validation (inline errors, no `alert()`).
- **Redux Toolkit** for state; async via `createAsyncThunk`.
- **React Router** for navigation; no alternate router libraries.
- No direct `localStorage` in components; keep persistence inside slices/thunks.
- Keep components small; extract reusable UI to `src/components`.

---

## 8) Project Structure (for orientation)

~~~txt
src/
  app/            # Redux store
  components/     # shared UI (e.g., ProtectedRoute, Modal)
  features/       # domain slices & feature components (auth, products, etc.)
  pages/          # route screens (Home, Login, Register, Dashboard, ...)
  services/       # adapters/clients (e.g., auth mock/firebase)
  assets/         # images
  App.jsx
  main.jsx
  index.css
~~~

---

## 9) Sync & Conflict Tips

**Always sync before coding**
~~~bash
git switch main && git pull
git switch feat/<task> && git merge origin/main    # or: git rebase origin/main
~~~

**If you see conflicts**
1) Open the conflicted files in VS Code and resolve the `<<<<<<<` blocks.
2) `git add -A`
3) If merging: `git commit`  
   If rebasing: `git rebase --continue`

**If stuck**
- Push your branch and @mention the owner in the PR: **@makar132**.

---

## 10) Troubleshooting

**“I can’t push to main.”**  
Correct—`main` is protected. Push to your feature branch and open a PR.

**“App won’t start.”**  
Run: `cp .env.example .env && npm i && npm run dev`. Check Node version (20+).

**“Refreshing logs me out.”**  
Auth hydrates from storage on load. If it doesn’t, pull latest `main` and ensure `initAuth()` is dispatched in `App.jsx`.

**“I can access an admin page as a normal user.”**  
Ensure the route uses `<ProtectedRoute requireAdmin>` and your mock user’s `isAdmin` is a **boolean**.

---

## 11) Don’ts

- Don’t push to `main`.
- Don’t commit real secrets or `.env`.
- Don’t use `alert()` for validation.
- Don’t introduce new libraries without mentioning it in your PR description.

---

## 12) Handy One-Liners

**Start a new task**
~~~bash
git switch main && git pull && git switch -c feat/<task> && code .
~~~

**Update your branch with latest main (merge)**
~~~bash
git switch main && git pull && git switch feat/<task> && git merge origin/main
~~~

**Open the project**
~~~bash
code .
~~~

---

## 13) PR & Issue Templates

- PRs auto-use `.github/PULL_REQUEST_TEMPLATE.md`.
- New Issues use `.github/ISSUE_TEMPLATE/bug_report.md` or `feature_request.md`.

If something is unclear, ask in your PR and tag **@makar132**. Happy shipping!

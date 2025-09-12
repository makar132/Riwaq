const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function subscribeToAuthChanges(onChange) {
  // Mock "listener": read once from localStorage on app start.
  try {
    const raw = localStorage.getItem("user");
    onChange(raw ? JSON.parse(raw) : null);
  } catch {
    onChange(null);
  }
  return () => {}; // no-op unsubscribe
}

export async function login({ email, password }) {
  await sleep(200);
  const user = { id: "dev-user", email, isAdmin: email.endsWith("@admin.com") };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function register({ email, password }) {
  await sleep(200);
  const user = { id: "dev-user", email, isAdmin: false };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function logout() {
  await sleep(100);
  localStorage.removeItem("user");
}

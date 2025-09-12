import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  subscribeToAuthChanges,
  register as registerWithFirebase,
  login as loginWithFirebase,
  logout as logoutFromFirebase,
} from "../../services/auth/index";

/**
 * @typedef {Object} AppUser
 * @property {string} id
 * @property {string} email
 * @property {string|null} username
 * @property {boolean} isAdmin
 */

/** Convert Firebase/adapter errors into user-friendly messages for the UI. */
function mapAuthErrorToMessage(error) {
  const code = error?.code || error?.message || String(error);

  // Custom adapter messages
  if (code === "USERNAME_REQUIRED") return "Username is required.";
  if (code === "USERNAME_TAKEN") return "This username is already taken.";
  if (code === "IDENTIFIER_REQUIRED") return "Email or username is required.";
  if (code === "USER_NOT_FOUND")
    return "No account found with that username/email.";

  // Common Firebase auth codes
  if (code === "auth/invalid-email") return "Invalid email address.";
  if (code === "auth/wrong-password") return "Incorrect password.";
  if (code === "auth/user-not-found") return "No user found with this email.";
  if (code === "auth/email-already-in-use")
    return "This email is already in use.";
  if (code === "auth/weak-password")
    return "Password is too weak (min 6 characters).";

  return "Something went wrong. Please try again.";
}

// -------------------- Thunks --------------------

export const startAuthListener = createAsyncThunk(
  "auth/startAuthListener",
  async (_payload, { dispatch }) => {
    const stopAuthListener = subscribeToAuthChanges(
      (nextUser /** @type {AppUser|null} */) => {
        dispatch(setCurrentUser(nextUser));
      },
    );
    return { listenerActive: typeof stopAuthListener === "function" };
  },
);

/** Register with email + username + password. */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const createdUser = await registerWithFirebase(data);
      return createdUser;
    } catch (error) {
      return rejectWithValue(mapAuthErrorToMessage(error));
    }
  },
);

/** Login with email/username + password. */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const authenticatedUser = await loginWithFirebase(data);
      return authenticatedUser;
    } catch (error) {
      return rejectWithValue(mapAuthErrorToMessage(error));
    }
  },
);

/** Logout current user. */
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logoutFromFirebase();
  return null;
});

// -------------------- Slice --------------------

const initialAuthState = {
  /** @type {AppUser|null} */
  user: null,
  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  status: "idle",
  /** @type {string|null} */
  errorMessage: null,
  /**
   * @type {boolean}
   * @description
   *  set true after startAuthListener resolves (success or error) */
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload || null;
    },
    clearAuthError(state) {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Listener lifecycle
    builder
      .addCase(startAuthListener.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(startAuthListener.rejected, (state) => {
        state.initialized = true;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "Registration failed.";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload || "Login failed.";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setCurrentUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

// -------------------- Selectors --------------------
export const selectAuthState = (rootState) => rootState.auth;
export const selectCurrentUser = (rootState) => rootState.auth.user;
export const selectIsCurrentUserAdmin = (rootState) =>
  Boolean(rootState.auth.user?.isAdmin);
export const selectAuthStatus = (rootState) => rootState.auth.status;
export const selectAuthErrorMessage = (rootState) =>
  rootState.auth.errorMessage;
export const selectIsAuthInitialized = (rootState) =>
  rootState.auth.initialized;

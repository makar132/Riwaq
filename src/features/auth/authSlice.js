import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const readUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
}

export const initAuth = createAsyncThunk('auth/init', async (_, { dispatch }) => {
  dispatch(setUser(readUser()))
})

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  // mock: replace with Firebase later
  await new Promise(r => setTimeout(r, 150))
  const user = { id: 'dev-user', email, isAdmin: email.endsWith('@admin.com') }
  localStorage.setItem('user', JSON.stringify(user))
  return user
})

export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
  await new Promise(r => setTimeout(r, 150))
  const user = { id: 'dev-user', email, isAdmin: false }
  localStorage.setItem('user', JSON.stringify(user))
  return user
})

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user')
  return null
})

const slice = createSlice({
  name: 'auth',
  // hydrate on first load so refresh works
  initialState: { user: readUser(), status: 'idle', error: null, inited: false },
  reducers: {
    setUser(state, action) { state.user = action.payload }
  },
  extraReducers: b => {
    b.addCase(initAuth.fulfilled, s => { s.inited = true })

     .addCase(login.pending,   s => { s.status = 'loading'; s.error = null })
     .addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload })
     .addCase(login.rejected,  (s, a) => { s.status = 'failed'; s.error = a.error?.message })

     .addCase(register.pending,   s => { s.status = 'loading'; s.error = null })
     .addCase(register.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload })
     .addCase(register.rejected,  (s, a) => { s.status = 'failed'; s.error = a.error?.message })

     .addCase(logout.fulfilled, s => { s.user = null })
  }
})

export const { setUser } = slice.actions
export default slice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const KEY = "favourites";
const readLS = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const writeLS = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export const syncFavourites = createAsyncThunk(
  "favourites/sync",
  async ({ uid }, { getState }) => {
    if (!uid) return;
    const remote =
      (await getDoc(doc(db, "users", uid))).data()?.favourites || [];
    const local = getState().favourites.items;
    const merged = Array.from(new Set([...remote, ...local]));
    await updateDoc(doc(db, "users", uid), { favourites: merged });
    writeLS(merged);
    return merged;
  },
);

export const pushFavourites = createAsyncThunk(
  "favourites/push",
  async ({ uid }, { getState }) => {
    const arr = getState().favourites.items;
    if (uid) await updateDoc(doc(db, "users", uid), { favourites: arr });
    writeLS(arr);
    return arr;
  },
);

const slice = createSlice({
  name: "favourites",
  initialState: { items: readLS() },
  reducers: {
    toggle(state, { payload: courseId }) {
      const i = state.items.indexOf(courseId);
      i >= 0 ? state.items.splice(i, 1) : state.items.push(courseId);
      writeLS(state.items);
    },
  },
  extraReducers: (b) => {
    b.addCase(syncFavourites.fulfilled, (s, a) => {
      if (a.payload) s.items = a.payload;
    });
    b.addCase(pushFavourites.fulfilled, (s, a) => {
      s.items = a.payload;
    });
  },
});

export const { toggle } = slice.actions;
export default slice.reducer;

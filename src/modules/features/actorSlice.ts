import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  actor: void 0,
  actors: [],
};

export const readActor = createAsyncThunk(
  "actor/readActor",
  async (actorId, thunkApi) => {
    try {
      const res = await fetch(`/movie/${actorId}/relation`);

      if (res.ok) {
        const data = await res.json();

        const relations = [];
        const relatedIds = [];
        for (const movie of data.Movie) {
          if (movie?.Actor) {
            for (const actor of movie.Actor) {
              if (!(actor.id in relatedIds)) {
                relatedIds.push(actor.id);
                relations.push(actor);
              }
            }
          }
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      return thunkApi.rejectWithValue({ movie: void 0 });
    }
  }
);

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = actorSlice.actions;

export default actorSlice.reducer;

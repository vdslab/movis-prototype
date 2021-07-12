import { Movie } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Optional } from "../../type";

const initialState = {
  movie: void 0,
  movies: [],
};

export const readMovie = createAsyncThunk(
  "movie/readMovie",
  async (movieId, thunkApi) => {
    try {
      const res = await fetch(`/movie/${movieId}`);

      if (res.ok) {
        const data = await res.json();

        return {
          ...data.Movie,
          category: data?.Category,
          company: data?.Company,
          officialSite: data?.OfficialSite,
          staff: data?.Staff,
        };
      } else {
        throw new Error();
      }
    } catch (error) {
      return thunkApi.rejectWithValue({ movie: void 0 });
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [readMovie.fulfilled]: (state, action) => {
      state.movie = action.payload;
    },
    [readMovie.rejected]: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;

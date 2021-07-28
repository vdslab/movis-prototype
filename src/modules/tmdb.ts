import { TMDB_API_KEY } from "~/env/tmdb";

const imgBaseUri = "https://image.tmdb.org/t/p/w500";
const apiBaseUri = "https://api.themoviedb.org/3";

const noImage = "/noImage.jpeg";

export const getActorImgUrl = async (name: string) => {
  const params = new URLSearchParams();
  params.set("api_key", TMDB_API_KEY);
  params.set("language", "ja-JP");
  params.set("query", name);
  params.set("page", "1");
  params.set("include_adult", "false");
  params.set("region", "JP");

  const requestUrl = `${apiBaseUri}/search/person`;
  const res = await fetch(`${requestUrl}?${params.toString()}`);

  const data = await res.json();

  if (data?.results[0]?.profile_path) {
    const actorImgPath = data.results[0].profile_path;
    const actorImgUrl = `${imgBaseUri}${actorImgPath}`;

    return actorImgUrl;
  } else {
    return noImage;
  }
};

export const getMovieImgUrl = async (name: string) => {
  const params = new URLSearchParams();
  params.set("api_key", TMDB_API_KEY);
  params.set("language", "ja-JP");
  params.set("query", name);
  params.set("page", "1");
  params.set("include_adult", "false");
  params.set("region", "JP");

  const requestUrl = `${apiBaseUri}/search/movie`;
  const res = await fetch(`${requestUrl}?${params.toString()}`);
  const data = await res.json();

  if (data?.results[0]?.poster_path) {
    const movieImgPath = data.results[0].poster_path;
    const movieImgUrl = `${imgBaseUri}${movieImgPath}`;

    return movieImgUrl;
  } else {
    return noImage;
  }
};

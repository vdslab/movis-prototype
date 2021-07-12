import { useEffect, useState } from "react";
import { TMDB_API_KEY } from "~/env/tmdb";

interface ActorCardProps {
  name: string;
  id: string;
}

const apiBaseUrl = "https://api.themoviedb.org/3/search/person";
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

const ActorCard: React.VFC<ActorCardProps> = ({ name, id }) => {
  const [imageSrc, setImageSrc] = useState("/noImage.jpeg");
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams();
      params.set("api_key", TMDB_API_KEY);
      params.set("language", "ja-JP");
      params.set("query", name);
      params.set("page", "1");
      params.set("include_adult", "false");
      params.set("region", "JP");

      const res = await fetch(`${apiBaseUrl}?${params.toString()}`);
      const data = await res.json();

      if (data.results?.length !== 0 && data.results[0].profile_path !== null) {
        setImageSrc(`${imgBaseUrl}${data.results[0].profile_path}`);
      }
    })();
  }, []);

  return (
    <div className="card">
      <div className="card-image">
        <figure className={"image is-2by3"}>
          <img width="622px" height="933px" src={imageSrc} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;

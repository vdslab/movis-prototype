import React, { useEffect, useState } from "react";
import Layout from "~/components/layout";
import Network from "~/components/network";
import { TMDB_API_KEY } from "~/env/tmdb";
import MovieCard from "~/components/movie-card";
import Link from "next/link";
import Image from "next/image";
import "bulma/css/bulma.css";

const apiBaseUrl = "https://api.themoviedb.org/3/search/person";
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

const ActorDetails = ({ query: { actorId } }) => {
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState([]);
  const [imageSrc, setImageSrc] = useState("/noImage.jpeg");
  const nodes = [];
  const links = [];
  if (data) {
    for (const movie of data.Movie) {
      for (const actor of movie.Actor) {
        if (!(actor.id in nodes) && data.id !== actor.id) {
          nodes.push({ id: actor.id, name: actor.name });
        }
      }
    }
    const sourceTargetCount = {};
    for (const movie of data.Movie) {
      for (const actor of movie.Actor) {
        if (data.id !== actor.id) {
          sourceTargetCount[actor.id] = [];
        }
      }
      const sorted = [...movie.Actor].sort();

      sorted.forEach((from, index) => {
        for (const to of sorted.slice(index + 1, sorted.length)) {
          if (from.id !== to.id && from.id !== data.id && to.id !== data.id) {
            sourceTargetCount[from.id].push(to.id);
          }
        }
      });
    }

    for (const source in sourceTargetCount) {
      for (const target of sourceTargetCount[source]) {
        links.push({ source, target, weight: 1 });
      }
    }
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(data);
    const getTmdbData = async (name) => {
      const params = new URLSearchParams();
      params.set("api_key", TMDB_API_KEY);
      params.set("language", "ja-JP");
      params.set("query", name);
      params.set("page", "1");
      params.set("include_adult", "false");
      params.set("region", "JP");

      const res = await fetch(`${apiBaseUrl}?${params.toString()}`);
      const data = await res.json();

      if (data.results.length !== 0 && data.results[0].profile_path !== null) {
        setImageSrc(`${imgBaseUrl}${data.results[0].profile_path}`);
      }
    };
    getTmdbData(data.name);
  }, [data]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/actor/${actorId}/relation`);
      const data = await res.json();

      setData(data);
      setMovies(data.Movie);
    })();
  }, []);

  return (
    <Layout>
      {data && (
        <main>
          <div className="columns margin-top mt-6">
            <div className="column margin-left ml-5">
              {/* <Image width="340px" height="510px" src={"/noImage.jpeg"} /> */}
              <img width="622px" height="933px" src={imageSrc} />
              <h1 className="title">
                {/* <u>森菜々</u> */}
                <u>{data.name}</u>
              </h1>
              {/* <p>・女性</p>
            <p>・2001年8月31日生まれ</p>
            <p>・デビュー曲となる主題歌「カエルノウタ」を</p>
            <p>　2020年1月15日にリリースする。</p> */}
            </div>
            <div className="column is-two-thirds has-background-danger">
              <Network initialNetwork={{ nodes, links }} />
            </div>
          </div>

          <div className="container"></div>
          <section className="section">
            {movies
              .reduce(
                (a, c, i) =>
                  i % 4 == 0
                    ? [...a, [c]]
                    : [...a.slice(0, -1), [...a[a.length - 1], c]],
                []
              )
              .map((array, i) => {
                return (
                  <div className="columns" key={i}>
                    {array.map((movie) => {
                      return (
                        <Link href={`/movie/${movie.id}`} key={movie.id}>
                          <a className="column is-3">
                            <MovieCard name={movie.title} id={movie.id} />
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
          </section>
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps = (ctx) => {
  return {
    props: {
      query: {
        actorId: ctx.query.actorId,
      },
    },
  };
};

export default ActorDetails;

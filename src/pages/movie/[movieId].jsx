import React, { useEffect, useState } from "react";
import Layout from "~/components/layout";
import { TMDB_API_KEY } from "~/env/tmdb";
import Link from "next/link";
import ActorCard from "~/components/actor-card";
import Image from "next/image";

const apiBaseUrl = "https://api.themoviedb.org/3/search/movie";
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieDetails = ({ query: { movieId } }) => {
  const [data, setData] = useState(null);
  const [tmdb, setTmdb] = useState({ img: "/noImage.jpeg" });
  const [imageSrc, setImageSrc] = useState("/noImage.jpeg");
  console.log(data);
  useEffect(() => {
    if (!data) {
      return;
    }
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

      if (data.results.length !== 0 && data.results[0].poster_path !== null) {
        setTmdb((prev) => {
          return {
            ...prev,
            img: `${imgBaseUrl}${data.results[0].poster_path}`,
            overview: data.results[0].overview,
          };
        });
      }
    };
    getTmdbData(data.title);
  }, [data]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/movie/${movieId}`);
      const data = await res.json();

      setData(data);
    })();
  }, []);

  return (
    <Layout>
      {data && (
        <main>
          <div className="columns margin-top mt-6">
            <div className="column margin-left ml-5">
              {/* <Image width="340px" height="510px" src={"/noImage.jpeg"} /> */}
              <img width="622px" height="933px" src={tmdb.img} />
            </div>
            <div className="column is-two-thirds">
              <h1 className="title">
                <u>{data.title}</u>
              </h1>
              <div className="card">
                <div className="card-content">
                  <div className="content">{tmdb.overview}</div>
                </div>
              </div>
            </div>
          </div>

          <section className="section">
            <h1 className="title">
              <u>主な出演者</u>
            </h1>
            {data.Actor.reduce(
              (a, c, i) =>
                i % 4 == 0
                  ? [...a, [c]]
                  : [...a.slice(0, -1), [...a[a.length - 1], c]],
              []
            ).map((array, i) => {
              return (
                <div className="columns" key={i}>
                  {array.map((actor) => {
                    return (
                      <Link href={`/actor/${actor.id}`} key={actor.id}>
                        <a className="column is-3">
                          <ActorCard name={actor.name} id={actor.id} />
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
        movieId: ctx.query.movieId,
      },
    },
  };
};

export default MovieDetails;

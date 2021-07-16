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
  const [selected, setSelected] = useState([]);
  const [movies, setMovies] = useState([]);
  const [imageSrc, setImageSrc] = useState("/noImage.jpeg");
  const nodes = [];
  const nodeIds = [];
  const links = [];
  if (data) {
    for (const movie of data.Movie) {
      for (const actor of movie.Actor) {
        if (!nodeIds.includes(actor.id) && data.id !== actor.id) {
          nodeIds.push(actor.id);
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

  const handleSelect = (node) => {
    const nodeId = node.id;
    setSelected((prev) => {
      const index = prev.indexOf(nodeId);
      const selectedNodeIds = [...prev];
      if (index < 0) {
        selectedNodeIds.push(nodeId);
      } else {
        selectedNodeIds.splice(index, 1);
      }
      return selectedNodeIds;
    });
  };

  // useEffect(() => {
  //   if (selected.length === 0) {
  //     setMovies(data.Movie);
  //     return;
  //   }
  //   const newMovies = [];
  //   for (const movie of data.Movie) {
  //     for (const actor of movie.Actor) {
  //       if (selected.includes(actor.id)) {
  //         newMovies.push(movie);
  //         break;
  //       }
  //     }
  //   }
  //   setMovies(newMovies);
  // }, [selected]);

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
            <div className="column margin-left ml-5 is-flex is-justify-content-center">
              {/* <Image width="340px" height="510px" src={"/noImage.jpeg"} /> */}
              <img width="300px" height="450px" src={imageSrc} />
              {/* <h1 className="title">
                <u>{data.name}</u>
              </h1> */}
            </div>
            <div className="column is-flex is-align-items-center">
              <div>
                <h1 className="title">{data.name}</h1>
                <p>・女性</p>
                <p>・2001年8月31日生まれ</p>
                <p>・デビュー曲となる主題歌「カエルノウタ」を</p>
                <p>　2020年1月15日にリリースする。</p>
              </div>
            </div>
          </div>

          <div className="columns">
            <div
              className="ml-2 column is-7 has-background-"
              style={{ height: "1000px" }}
            >
              <Network
                initialNetwork={{ nodes, links }}
                selected={selected}
                handleSelect={handleSelect}
              />
            </div>
            <div className="column">
              <section className="section">
                {movies
                  .filter((movie) => {
                    let count = 0;
                    if (selected.length === 0) {
                      return true;
                    }
                    for (const actor of movie.Actor) {
                      if (selected.includes(actor.id)) {
                        count++;
                      }
                    }
                    return count === selected.length;
                  })
                  .reduce(
                    (a, c, i) =>
                      i % 2 == 0
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
                              <a className="column">
                                <MovieCard name={movie.title} id={movie.id} />
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
              </section>
            </div>
          </div>
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

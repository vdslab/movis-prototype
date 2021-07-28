import React, { useEffect, useState } from "react";
import Layout from "~/components/layout";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getActorImgUrl, getMovieImgUrl } from "~/modules/tmdb";
import { Actor, Movie } from "@prisma/client";
import { forceSerialize } from "~/lib/forceSerialize";
import { Card } from "~/components/card";
import prisma from "~/lib/prisma";
import dynamic from "next/dynamic";

const Network = dynamic(() => import("~/components/network"), { ssr: false });

interface Props {
  data: {
    movieImgUrls: {
      imgUrl: string;
      id: string;
    }[];
    actorImgurl: string;
    id: string;
    jfdbId: string;
    name: string;
    Movie: (Movie & {
      Actor: Actor[];
    })[];
  };
}

const ActorDetails = ({ data }: Props) => {
  const [selected, setSelected] = useState([]);

  const actorImgUrl = data.actorImgurl;
  const actorName = data.name;
  const actorId = data.id;
  const movieImgUrls = data.movieImgUrls;
  const movies: { [id: string]: Movie } = {};
  data.Movie.forEach((movie) => {
    movies[movie.id] = movie;
  });

  const nodeIds = [];
  const nodes = [];
  data.Movie.forEach((movie) => {
    movie.Actor.forEach((actor) => {
      if (!nodeIds.includes(actor.id) && actor.id !== actorId) {
        nodeIds.push(actor.id);
        nodes.push({ id: actor.id, name: actor.name });
      }
    });
  });

  const compare = (a, b) => a.id.localeCompare(b.id);
  nodes.sort(compare);

  const sourceTarget = {};
  data.Movie.forEach((movie) => {
    const sortedActors = Array.from(movie.Actor).sort(compare);
    sortedActors.forEach((source, index) => {
      if (source.id !== actorId) {
        const targets = [];
        sortedActors.slice(index).forEach((target) => {
          if (source.id !== target.id && target.id !== actorId) {
            targets.push(target.id);
          }
        });
        sourceTarget[source.id] = {};
        targets.forEach((target) => {
          sourceTarget[source.id][target] =
            (sourceTarget[source.id][target] || 0) + 1;
        });
      }
    });
  });

  const links = [];
  for (const source in sourceTarget) {
    for (const target in sourceTarget[source]) {
      links.push({ source, target, weight: sourceTarget[source][target] });
    }
  }

  const initialNetwork = { nodes, links };

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

  return (
    <Layout>
      {data && (
        <main className="section">
          <div className="columns">
            <div className="column">
              <img width="300px" height="450px" src={actorImgUrl} />
            </div>
            <div className="column is-flex is-align-items-center">
              <div>
                <h1 className="title">{actorName}</h1>
              </div>
            </div>
          </div>

          <div className="columns">
            <div
              className="ml-2 column is-7 has-background-"
              style={{ height: "1000px" }}
            >
              <Network
                initialNetwork={initialNetwork}
                selected={selected}
                handleSelect={handleSelect}
              />
            </div>

            <div className="column">
              <div className="columns is-multiline">
                {movieImgUrls.map(({ id, imgUrl }) => {
                  return (
                    <Link href={`/movie/${id}`} key={id}>
                      <a className="column is-6">
                        <Card caption={movies[id].title} imgUrl={imgUrl} />
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const actorId = String(ctx.query.actorId);
  const data = await prisma.actor.findFirst({
    where: {
      id: actorId,
    },
    include: {
      Movie: {
        include: {
          Actor: true,
        },
      },
    },
    take: 1,
  });

  const movieImgUrls = await Promise.all(
    data.Movie.map(async (movie) => {
      const imgUrl = await getMovieImgUrl(movie.title);
      return {
        imgUrl,
        id: movie.id,
      };
    })
  );

  const actorImgurl = await getActorImgUrl(data.name);

  return {
    props: {
      data: forceSerialize({ ...data, movieImgUrls, actorImgurl }),
    },
  };
};

export default ActorDetails;

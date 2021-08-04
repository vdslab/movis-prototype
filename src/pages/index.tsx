import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ActorCard from "~/components/actor-card";
import Layout from "~/components/layout";
import { GetServerSideProps } from "next";
import { forceSerialize } from "~/lib/forceSerialize";
import { Movie, PrismaClient, Actor } from "@prisma/client";
import { Revenue } from "~/components/revenue";

interface ServerSideProps {
  query: {
    page?: string;
    name?: string;
  };
  data: Movie[];
}
const prisma = new PrismaClient();

const Home: React.VFC<ServerSideProps> = ({ query: { page, name }, data }) => {
  const [input, setInput] = useState({ name });
  const [actors, setActors] = useState<Actor[]>([]);
  console.log(actors);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (name) {
      (async () => {
        const res = await fetch(`/api/actor/name/${name}`);
        const data: Actor[] = await res.json();

        setActors(data);
      })();
    } else {
      (async () => {
        const params = new URLSearchParams();
        params.set("page", "1");
        if (name) {
          params.set("name", name);
        }

        const res = await fetch(`/api/actors?${params.toString()}`);
        const data: Actor[] = await res.json();

        setActors(data);
      })();
    }
  }, [name, page]);

  // useEffect(() => {
  //   (async () => {
  //     const params = new URLSearchParams();
  //     params.set("page", "1");
  //     if (name) {
  //       params.set("name", name);
  //     }

  //     const res = await fetch(`/api/actors?${params.toString()}`);
  //     const data: Actor[] = await res.json();

  //     setActors(data);
  //   })();
  // }, [name, page]);

  return (
    <Layout>
      <section className="section">
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="box">
              <form>
                <div className="py-4">
                  <label className="label">俳優名</label>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        name="name"
                        className="input"
                        type="text"
                        value={input.name}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="control">
                      <Link
                        href={{
                          pathname: "/",
                          query: {
                            name: input.name,
                            page,
                          },
                        }}
                      >
                        <button className="button is-link">検索</button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className="py-4">
                  <label className="label">製作・制作会社名</label>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        name="あ"
                        className="input"
                        type="text"
                        value={input.name}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="control">
                      <Link
                        href={{
                          pathname: "/",
                          query: {
                            name: input.name,
                            page,
                          },
                        }}
                      >
                        <button className="button is-link">検索</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <label className="label">監督・脚本</label>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        name="あい"
                        className="input"
                        type="text"
                        value={input.name}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="control">
                      <Link
                        href={{
                          pathname: "/",
                          query: {
                            name: input.name,
                            page,
                          },
                        }}
                      >
                        <button className="button is-link">検索</button>
                      </Link>
                    </div>
                  </div>
                </div> */}
              </form>
            </div>
          </div>

          <div className="column">
            <div className="box">
              {actors
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
            </div>
          </div>
        </div>
        <div className="container">
          <Revenue data={data} />
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name ? String(context.query.name) : "";
  const page = context.query.page ? String(context.query.page) : "1";

  const movie = await prisma.movie.findMany({
    where: {
      AND: {
        revenue: {
          not: null,
        },
      },
    },
  });

  return {
    props: {
      query: {
        name,
        page,
      },
      data: forceSerialize(movie),
    },
  };
};

export default Home;

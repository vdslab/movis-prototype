import { Actor } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ActorCard from "~/components/actor-card";
import Layout from "~/components/layout";

const Home: React.VFC = () => {
  const [input, setInput] = useState({ name: "" });
  const [actors, setActors] = useState<Actor[]>([]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams();
      params.set("page", "0");
      const res = await fetch(`/api/actors?${params.toString()}`);
      const data: Actor[] = await res.json();
      console.log(data);

      setActors(data);
    })();
  }, []);

  return (
    <Layout>
      <section className="section">
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="box">
              <form>
                <label className="label">名前</label>
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
                    <button className="button is-link">検索</button>
                  </div>
                </div>
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
                          <Link href={`/network/${actor.id}`} key={actor.id}>
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
      </section>
    </Layout>
  );
};

export default Home;

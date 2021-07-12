import React from "react";
import Layout from "~/components/layout";
import Image from "next/image";
import "bulma/css/bulma.css";
import Link from "next/link";

const ActorDetails = () => {
  return (
    <Layout>
      <main>
        <div className="columns margin-top mt-6">
          <div className="column margin-left ml-5">
            <Image width="340px" height="510px" src={"/noImage.jpeg"} />
            <h1 className="title">
              <u>森菜々</u>
            </h1>
            <p>・女性</p>
            <p>・2001年8月31日生まれ</p>
            <p>・デビュー曲となる主題歌「カエルノウタ」を</p>
            <p>　2020年1月15日にリリースする。</p>
          </div>
          <div className="column is-two-thirds has-background-danger">
            <div className="Box "></div>
          </div>
        </div>

        <div className="container"></div>
        <section className="section">
          <div className="columns">
            <div className="column">
              <div className="Box">
                <div className="columns">
                  <Link href="/movie/movieId">
                    <a className="column is-3">
                      <div className="card">
                        <div className="card-image">
                          <Image
                            width="622px"
                            height="933px"
                            src="/noImage.jpeg"
                          />
                        </div>
                        <div className="card-content">
                          <div className="content">
                            <p>天気の子</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>東京喰種</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>地獄少女</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>青くて痛くて脆い</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="columns">
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>天気の子</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>東京喰種</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a className="column is-3">
                    <div className="card">
                      <div className="card-image">
                        <Image
                          width="622px"
                          height="933px"
                          src="/noImage.jpeg"
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p>地獄少女</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ActorDetails;

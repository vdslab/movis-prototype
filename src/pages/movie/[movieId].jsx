import React from "react";
import Layout from "~/components/layout";
import Image from "next/image";
import "bulma/css/bulma.css";


const MovieDetails = () => {
  return(
  <Layout>
    <main>

<div className="columns margin-top mt-6">
   <div className="column margin-left ml-5">
     <Image width="340px" height="510px" src={"/noImage.jpeg"} />
     </div>
     <div className="column is-two-thirds">
       <h1 className="title" >
         <u>ライアー×ライアー</u>
         </h1>
       <div className="card">
         <div className="card-content">
           <div className="content">
             Minato (Nana Mori) is a university student and has a fear of germs. She isn't interested in looking pretty. She lives with her stepbrother Toru (Hokuto Matsumura), who is her stepbrother from her mother's remarriage. Meanwhile, Toru is handsome and a player with the ladies. He doesn't resist women who come on to him and he doesn't stop women from leaving him either. Minato is uncomfortable with Toru and his ways with women. They are the same age and attend the same university. They have an agreement, where Toru will not approach Minato within 2 meters when they are outside. One day, due to her friend’s request, Minato puts on make-up and wears her friend’s high school uniform. While she is out walking in public, she happens to meet Toru. She unexpectedly lies to him about her identity and tells him that she is a high school student. Toru falls in love with her at first sight. --asianwiki
          　</div>
          </div>
          </div>
        </div>
      </div>

   <h1 className="title" >
         <u>主な出演者</u>
         </h1>

<div className="container">
</div>
  <section className="section">
    <div className="columns">
      <div className="column">

      <div className="Box">
        <div className="columns">

        <a className="column is-3">
          <div className="card">
            <div className="card-image">
                <Image width="622px" height="933px" src="/noImage.jpeg" />
          </div>
          <div className="card-content">
            <div className="content">
              <p>松村北斗</p>
            </div>
          </div>
      </div>
        </a>
        <a className="column is-3">
          <div className="card">
            <div className="card-image">
                <Image width="622px" height="933px" src="/noImage.jpeg" />
          </div>
          <div className="card-content">
            <div className="content">
              <p>森菜々</p>
            </div>
          </div>
      </div>
        </a>
        <a className="column is-3">
          <div className="card">
            <div className="card-image">
                <Image width="622px" height="933px" src="/noImage.jpeg" />
          </div>
          <div className="card-content">
            <div className="content">
              <p>堀田真由</p>
            </div>
          </div>
      </div>
        </a>
        <a className="column is-3">
          <div className="card">
            <div className="card-image">
                <Image width="622px" height="933px" src="/noImage.jpeg" />
          </div>
          <div className="card-content">
            <div className="content">
              <p>小関裕太</p>
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
  )
};
  

export default MovieDetails;

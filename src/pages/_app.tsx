import "bulma/css/bulma.min.css";
import Head from "next/head"
import "./_app.css";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho" rel="stylesheet"/>
        
      </Head>
        <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
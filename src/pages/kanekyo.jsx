import { PrismaClient } from "@prisma/client";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
const prisma = new PrismaClient();

const MyResponsiveSwarmPlot = ({ data /* see data tab */ }) => (
  <div style={{ width: "1600px", height: "600px" }}>
    <ResponsiveSwarmPlot
      data={data}
      groups={[
        "日本アカデミー賞",
        "ゴールデングローブ賞",
        "東京国際映画祭",
        "カンヌ国際映画祭",
        "ヴェネチア国際映画祭",
        "ベルリン国際映画祭",
        "サンダンス国際映画祭",
        "トロント国際映画際",
      ]}
      identity="id"
      value="price"
      valueFormat="$.2f"
      valueScale={{
        type: "linear",
        min: 0,
        max: 10 ** 11,
        reverse: false,
      }}
      size={{ key: "volume", values: [4, 20], sizes: [6, 20] }}
      forceStrength={4}
      simulationIterations={100}
      borderColor={{
        from: "color",
        modifiers: [
          ["darker", 0.6],
          ["opacity", 0.5],
        ],
      }}
      margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
      axisTop={{
        orient: "top",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: -46,
      }}
      axisRight={{
        orient: "right",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: 76,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: -76,
      }}
    />
  </div>
);

export default function Kanekyo({ movie }) {
  console.log(movie);
  const awards = [
    "日本アカデミー賞",
    "ゴールデングローブ賞",
    "東京国際映画祭",
    "カンヌ国際映画祭",
    "ヴェネチア国際映画祭",
    "ベルリン国際映画祭",
    "サンダンス国際映画祭",
    "トロント国際映画際",
  ];
  let data = [];
  let awardslist = [];
  // let = ;
  for (const movie_ of movie) {
    const revenue = movie_["revenue"];
    const title = movie_["title"];
    for (const item of movie_["Award"]) {
      awardslist[awardslist.length] = item["title"];
      for (const award of awards) {
        if (item["title"].includes(award)) {
          console.log(title);
          data[data.length] = {
            id: `${title}`,
            group: `${award}`,
            price: revenue,
            volume: 15,
            title: `${title}`,
          };
        }
      }
    }
  }
  console.log(awardslist);
  console.log(data);

  return (
    <div>
      <h1>
        hello, this is kanekyo. see{" "}
        <a href="https://twitter.com/kanekyohunter">@kanekyohunter</a>
      </h1>
      <MyResponsiveSwarmPlot data={data} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const movie = await prisma.movie.findMany({
    where: {
      AND: {
        revenue: { not: null },
        Award: { some: { title: { not: "" } } },
      },
    },
    include: {
      Award: true,
    },
  });
  // const movie = await prisma.movie.findFirst({
  //   take: 1,
  // });
  console.log("movie", movie);
  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
    },
  };
};

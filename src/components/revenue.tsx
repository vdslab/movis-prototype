import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { Movie } from "@prisma/client";

export const Revenue = ({ data }: { data: Movie[] }) => {
  const yearSet = new Set();
  data.forEach((movie) => {
    const year = (movie.releaseDate as any).slice(0, 4);
    yearSet.add(year);
  });
  const years = Array.from(yearSet);

  const graphData = {
    title: "revenue",
    children: years.map((year) => {
      return {
        title: year,
        children: data.filter(
          (movie) => (movie.releaseDate as any).slice(0, 4) === year
        ),
      };
    }),
  };
  return (
    <ResponsiveCirclePacking
      data={graphData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id={"title"}
      value={"revenue"}
      valueFormat={" >-,~"}
      colors={{ scheme: "paired" }}
      childColor={{ from: "color", modifiers: [["brighter", 0.4]] }}
      padding={4}
      enableLabels={true}
      labelsFilter={function (e) {
        return 2 === e.node.depth;
      }}
      labelsSkipRadius={11}
      labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "none",
          color: "inherit",
          rotation: -45,
          lineWidth: 5,
          spacing: 8,
        },
      ]}
      onClick={(e) => console.log(e)}
    />
  );
};

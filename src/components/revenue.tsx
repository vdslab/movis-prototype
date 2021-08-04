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
    <div className="">
      <div
        className="columns"
        style={{
          overflowX: "auto",
        }}
      >
        {graphData.children.map((d) => {
          return (
            <div
              className="column is-4 is-text-center is-inline-block"
              style={{ height: "300px", marginBottom: "50px" }}
            >
              <h2 className="subtitle">{d.title}</h2>
              <ResponsiveCirclePacking
                data={d}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id={"title"}
                value={"revenue"}
                valueFormat={" >-,~"}
                colors={{ scheme: "paired" }}
                childColor={{ from: "color", modifiers: [["brighter", 0.4]] }}
                padding={4}
                enableLabels={true}
                labelsSkipRadius={0}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

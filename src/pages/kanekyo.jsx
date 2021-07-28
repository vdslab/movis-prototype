import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Kanekyo({ movie }) {
  console.log(movie);
  return (
    <div>
      <h1>
        hello, this is kanekyo. see{" "}
        <a href="https://twitter.com/kanekyohunter">@kanekyohunter</a>
      </h1>
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

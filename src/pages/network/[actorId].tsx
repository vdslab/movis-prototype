import { GetServerSideProps } from "next";
import { useState } from "react";

interface ServerSideProps {
  actorId: string;
}

const Network: React.VFC = () => {
  const [network, setNetwork] = useState([]);
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const actorId = context.query.actorId;
  return {
    props: {
      actorId,
    },
  };
};

export default Network;

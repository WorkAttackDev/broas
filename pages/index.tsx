import { Broas } from ".prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../features/core/components/Card";
import { getBroasClient } from "../features/core/config/client";

const Home: NextPage = () => {
  const [broas, setBroas] = useState<Broas[]>([]);

  useEffect(() => {
    (async () => {
      const b = await getBroasClient();

      setBroas(b);
    })();
  }, []);

  return (
    <main className='p-16'>
      <ul className='grid gap-8'>
        {broas.map((broa) => (
          <Card key={broa.id} broa={broa} />
        ))}
      </ul>
    </main>
  );
};

export default Home;

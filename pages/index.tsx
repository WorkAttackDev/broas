import { Broa } from ".prisma/client";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import Card from "../features/client/core/components/Card";
import Loading from "../features/client/core/components/Loading";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { sortByDate } from "../features/client/core/utils";

const Home: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { broas, setBroas } = useBroasStore();

  const getBroasApi = useApi<typeof getBroasClient>();

  sortByDate<Broa>(broas);

  useEffect(() => {
    (async () => {
      const data = await getBroasApi.request(getBroasClient());
      if (!data) return;
      setBroas(data);
    })();
  }, []);

  return (
    <main className='p-16'>
      <ul className='max-w-[102.4rem] mx-auto flex flex-wrap -m-4'>
        {broas.map((broa) => (
          <li
            key={broa.id}
            className='flex-auto m-4  min-w-[23rem] md:min-w-[30rem] max-w-[40rem]'
          >
            <Card broa={broa} editorMode={!!user} />
          </li>
        ))}
      </ul>
      <Loading isLoading={getBroasApi.loading} />
      {/* <Popup
        isOpen={isLoading}
        texts={["lorem ipsum dolor sit amet consectetur"]}
        onClose={() => setIsLoading(false)}
      /> */}
    </main>
  );
};

export default Home;

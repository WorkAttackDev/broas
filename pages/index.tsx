import { Broa } from ".prisma/client";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useBroasStore } from "../features/broa/stores/useBroasStore";
import Card from "../features/core/components/Card";
import Loading from "../features/core/components/Loading";
import { getBroasClient } from "../features/core/config/client";
import useApi from "../features/core/hooks/use_api";
import { sortByDate } from "../features/core/utils";
import Link from "next/link";
import { links } from "../features/core/data/links";

const Home: NextPage = () => {
  const { broas, setBroas } = useBroasStore();

  const getBroasApi = useApi(getBroasClient);

  sortByDate<Broa>(broas);

  useEffect(() => {
    (async () => {
      const data = await getBroasApi.request();
      if (!data) return;
      setBroas(data);
    })();
  }, []);

  return (
    <main className='p-16'>
      <ul className='max-w-[102.4rem] mx-auto flex flex-wrap -m-4'>
        {broas.map((broa) => (
          <Link
            key={broa.id}
            href={links.broaById(broa.id.toString())}
            passHref
          >
            <a className='flex-auto m-4  min-w-[23rem] md:min-w-[30rem] max-w-[40rem]'>
              <Card broa={broa} />
            </a>
          </Link>
        ))}
      </ul>
      <Loading isLoading={getBroasApi.loading} />
    </main>
  );
};

export default Home;

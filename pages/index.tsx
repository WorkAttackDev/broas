import { Broa } from ".prisma/client";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import ListBroas from "../features/client/broa/components/ListBroas";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import Loading from "../features/client/core/components/Loading";
import MainLayout from "../features/client/core/components/MainLayout";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { sortByDate } from "../features/client/core/utils";

// TODO: Add a search bar
// TODO: Add a side filter
// TODO: Add a pagination
// TODO: Add a sort by
// TODO: sync broas when user like a broa

export const Home: NextPage = () => {
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
    <MainLayout>
      <ListBroas user={user} broas={broas} />
      <Loading isLoading={getBroasApi.loading} />
    </MainLayout>
  );
};

export default Home;

import type { NextPage } from "next";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import ListBroas from "../features/client/broa/components/ListBroas";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import MainLayout from "../features/client/core/components/MainLayout";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";

// TODO: Connect Search text to the main get broas request
// TODO: Add a side filter
// TODO: Add a sort by
// TODO: sync broas when user like a broa
// TODO: Add reset search

export const Home: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { broas, broasPagination, broaFilterBy, setFilters } = useBroasStore();

  const getBroasApi = useApi<typeof getBroasClient>();

  useEffect(() => {
    (async () => {
      await handleGetBroas();
    })();
  }, []);

  const handleGetBroas = async () => {
    await getBroasApi.request(getBroasClient());
  };

  const handleSearch = async (search: string) => {
    if (!search) {
      setFilters({ wrongVersion: undefined });
      await getBroasApi.request(getBroasClient());
      return;
    }

    setFilters({ wrongVersion: search });
    await getBroasApi.request(getBroasClient({ wrongVersion: search }));
  };

  const handleGetNextBoas = async () => {
    const bp = broasPagination;
    const bfb = broaFilterBy;

    if (bp.page + 1 >= Math.ceil(bp.total / bp.limit)) return;
    await getBroasApi.request(
      getBroasClient({
        page: bp.page + 1,
        limit: bp.limit,
        wrongVersion: bfb.wrongVersion,
      })
    );
  };

  const handleGetPreviousBoas = async () => {
    const bp = broasPagination;
    const bfb = broaFilterBy;

    if (bp.page < 0) return;
    await getBroasApi.request(
      getBroasClient({
        page: bp.page - 1,
        limit: bp.limit,
        wrongVersion: bfb.wrongVersion,
      })
    );
  };

  return (
    <MainLayout>
      <ListBroas
        user={user}
        broas={broas}
        onNextPage={handleGetNextBoas}
        onPrevPage={handleGetPreviousBoas}
        pagination={broasPagination}
        onSearch={handleSearch}
        isLoading={getBroasApi.loading}
      />
      {/* <Loading isLoading={} /> */}
    </MainLayout>
  );
};

export default Home;

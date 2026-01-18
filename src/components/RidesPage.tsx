"use client";

import {useEffect, useState} from "react";
import type {Offer, OfferType} from "@/types/offers";
import HeaderHero from "@/components/rides/HeaderHero";
import RidesBoard from "./rides/RidesBoard";
import AddRideForm from "./rides/AddRideForm";
import Footer from "./rides/Footer";

type RidesApiResponse = {
  items: Offer[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export const RidesPage = () => {
  const [filter, setFilter] = useState<"all" | OfferType>("all");
  const [rides, setRides] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 6;

  const fetchRides = async (opts?: {page?: number; filter?: typeof filter}) => {
    const nextPage = opts?.page ?? page;
    const nextFilter = opts?.filter ?? filter;

    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(nextPage),
        limit: String(limit),
        type: nextFilter,
      });

      const res = await fetch(`/api/rides?${qs.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Fetch failed");

      const data: RidesApiResponse = await res.json();

      setRides(data.items);
      setPages(data.pages);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
      setRides([]);
      setPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // 1) start + zmiana filtra => reset page
  useEffect(() => {
    setPage(1);
    fetchRides({page: 1, filter});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // 2) zmiana strony
  useEffect(() => {
    fetchRides({page, filter});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilterChange = (v: "all" | OfferType) => {
    setFilter(v);
  };

  const handleCreated = async () => {
    // po dodaniu ogłoszenia: wróć na stronę 1 i odśwież
    setPage(1);
    await fetchRides({page: 1, filter});
  };

  return (
    <>
      <main
        className="min-h-screen text-slate-100"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% -10%, #143052, transparent 60%), radial-gradient(900px 500px at 90% 10%, #122a3b, transparent 55%), #0b0f14",
        }}
      >
        <div className="mx-auto max-w-[920px] p-5">
          <HeaderHero />

          <div className="mt-[14px] grid grid-cols-1 gap-[14px] lg:grid-cols-[1.05fr_.95fr]">
            <RidesBoard
              filter={filter}
              onFilterChange={handleFilterChange}
              offers={rides}
              loading={loading}
              page={page}
              pages={pages}
              total={total}
              onPageChange={setPage}
            />
            <AddRideForm onCreated={handleCreated} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

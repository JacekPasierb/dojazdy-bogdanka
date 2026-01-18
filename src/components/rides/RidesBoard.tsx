"use client";

import type {Offer, OfferType} from "@/types/offers";
import {Chip} from "./ui/Chip";
import RideCard from "./RideCard";

type Props = {
  filter: OfferType | "all";
  onFilterChange: (value: OfferType | "all") => void;
  offers: Offer[];
  loading?: boolean;

  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
};

const RidesBoard = ({
  filter,
  onFilterChange,
  offers,
  loading = false,
  page,
  pages,
  total,
  onPageChange,
}: Props) => {
  return (
    <section
      id="listPanel"
      className="rounded-[18px] border border-slate-700/70 bg-slate-900/70 p-[14px]"
    >
      <h2 className="mb-[10px] text-[18px] font-extrabold">Ogłoszenia</h2>

      <div className="mb-[10px] flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => onFilterChange("all")}>
          Wszystko
        </Chip>

        <Chip
          active={filter === "offer"}
          onClick={() => onFilterChange("offer")}
        >
          Jadę (mam miejsce)
        </Chip>

        <Chip active={filter === "need"} onClick={() => onFilterChange("need")}>
          Szukam
        </Chip>
      </div>

      {loading ? (
        <div className="py-6 text-center text-slate-300">
          Ładowanie ogłoszeń...
        </div>
      ) : offers.length === 0 ? (
        <div className="py-6 text-center text-slate-400">Brak ogłoszeń</div>
      ) : (
        <div className="grid gap-3">
          {offers.map((offer) => (
            <RideCard key={offer._id ?? offer.id} offer={offer} />
          ))}
        </div>
      )}

      {!loading && total > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/70 pt-3">
          <div className="text-[12px] text-slate-400">
            Strona <span className="font-semibold text-slate-100">{page}</span>{" "}
            / {pages} • {total} ogłoszeń
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="rounded-xl border border-slate-700/80 bg-slate-800/60 px-3 py-2 text-[13px] font-semibold disabled:opacity-50"
            >
              ← Poprzednia
            </button>

            <button
              type="button"
              disabled={page >= pages}
              onClick={() => onPageChange(page + 1)}
              className="rounded-xl border border-slate-700/80 bg-slate-800/60 px-3 py-2 text-[13px] font-semibold disabled:opacity-50"
            >
              Następna →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RidesBoard;

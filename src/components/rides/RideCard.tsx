import { Offer } from "@/types/offers";

const RideCard=({ offer }: { offer: Offer })=> {
  const isOffer = offer.type === "offer";

  function isUrl(value: string) {
    return (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("www.") ||
      value.startsWith("m.me/")
    );
  }

  function getContactHref(contact: string) {
    const trimmed = contact.trim();

    if (isUrl(trimmed)) {
      if (trimmed.startsWith("m.me/")) {
        return `https://${trimmed}`;
      }
      if (trimmed.startsWith("www.")) {
        return `https://${trimmed}`;
      }
      return trimmed;
    }

    // telefon
    const phone = trimmed.replace(/[^\d+]/g, "");
    return `tel:${phone}`;
  }

  return (
    <article className="grid gap-2 rounded-2xl border border-slate-700/70 bg-slate-950/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <span
          className={[
            "rounded-full border px-[10px] py-[6px] text-[12px] font-extrabold",
            "bg-black/25 border-slate-700/70",
            isOffer ? "border-teal-400/40" : "border-amber-300/40",
          ].join(" ")}
        >
          {isOffer ? "Jadę • mam miejsce" : "Szukam podwózki"}
        </span>

        <div className="text-[14px] leading-[1.35] text-slate-300">
          {offer.date} •{" "}
          <span className="font-extrabold text-slate-100">{offer.time}</span>
        </div>
      </div>

      <div className="text-[14px] leading-[1.35] text-slate-300">
        <span className="font-extrabold text-slate-100">{offer.from}</span> →{" "}
        <span className="font-extrabold text-slate-100">{offer.to}</span>
      </div>

      {isOffer && (
        <div className="text-[14px] leading-[1.35] text-slate-300">
          Wolne miejsca:{" "}
          <span className="font-extrabold text-slate-100">{offer.seats}</span>
        </div>
      )}

      <div className="text-[14px] leading-[1.35] text-slate-300">
        Kontakt:{" "}
        <a
          href={getContactHref(offer.contact)}
          target={isUrl(offer.contact) ? "_blank" : undefined}
          rel={isUrl(offer.contact) ? "noreferrer" : undefined}
          className="font-extrabold text-slate-100 underline decoration-slate-500/40 underline-offset-4 hover:decoration-slate-300"
        >
          {offer.contact}
        </a>
      </div>

      {offer.note && (
        <div className="text-[14px] leading-[1.35] text-slate-300">
          {offer.note}
        </div>
      )}
    </article>
  );
}
export default RideCard;
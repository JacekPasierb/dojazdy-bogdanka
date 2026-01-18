const HeaderHero = () => {
  return (
    <section className="rounded-[18px] border border-slate-700/70 bg-gradient-to-b from-slate-900/90 to-slate-900/65 p-[18px]">
      <h1 className="mb-2 text-[26px] font-extrabold leading-tight">
        🚗 Dojazdy Bogdanka
      </h1>

      <p className="mb-[14px] text-[14px] leading-[1.35] text-slate-300">
        Prosta tablica ogłoszeń dla dojazdów{" "}
        <span className="font-semibold text-slate-100">do i z Bogdanki</span>.
        Bez kont. Bez aplikacji. Dodajesz ogłoszenie i kontaktujesz się
        bezpośrednio.
      </p>

      <div className="flex flex-wrap gap-[10px]">
        <a
          href="#formPanel"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-[14px] py-3 font-semibold text-slate-950 hover:bg-blue-400"
        >
          ➕ Dodaj ogłoszenie
        </a>

        <a
          href="#listPanel"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-[14px] py-3 font-semibold text-slate-100 hover:border-slate-600"
        >
          🔍 Zobacz ogłoszenia
        </a>
      </div>

      <div className="mt-[10px] rounded-xl border border-dashed border-blue-400/60 bg-blue-500/10 px-3 py-[10px] text-[13px] text-slate-300">
        ℹ️ To lokalna tablica ogłoszeń. Ogłoszenia są publikowane bez kont i
        widoczne dla wszystkich.
      </div>
    </section>
  );
}
export default HeaderHero;
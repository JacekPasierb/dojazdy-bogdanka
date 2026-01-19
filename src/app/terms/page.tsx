import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[920px] p-5 text-slate-100">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-slate-400 hover:text-slate-200"
      >
        ← Wróć do strony głównej
      </Link>
      <h1 className="text-2xl font-extrabold">Zasady</h1>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
        <p>
          Serwis{" "}
          <span className="font-semibold text-slate-100">
            Dojazdy do Bogdanki
          </span>{" "}
          to tablica ogłoszeń. Nie jesteśmy przewoźnikiem, nie pośredniczymy w
          płatnościach i nie odpowiadamy za przejazdy.
        </p>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Odpowiedzialność
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Ustalenia przejazdu są wyłącznie między użytkownikami.</li>
            <li>Serwis nie weryfikuje ogłoszeń ani osób.</li>
            <li>Zachowaj ostrożność i nie udostępniaj danych wrażliwych.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Co wolno publikować
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>tylko ogłoszenia dot. dojazdów</li>
            <li>bez spamu, obraźliwych treści, danych osób trzecich</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">Zgłoszenia</h2>
          <p className="mt-2">
            Jeśli widzisz spam / nadużycie albo chcesz usunąć ogłoszenie, napisz
            na{" "}
            <a
              className="underline underline-offset-2 hover:text-slate-100"
              href="mailto:dojazdy.bogdanka@o2.pl"
            >
              dojazdy.bogdanka@o2.pl
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[920px] p-5 text-slate-100">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-slate-400 hover:text-slate-200"
      >
        ← Wróć do strony głównej
      </Link>
      <h1 className="text-2xl font-extrabold">Prywatność</h1>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
        <p>
          Serwis{" "}
          <span className="font-semibold text-slate-100">
            Dojazdy do Bogdanki
          </span>{" "}
          to prosta tablica ogłoszeń. Publikując ogłoszenie, użytkownik sam
          decyduje, jakie dane kontaktowe podaje (telefon lub link do
          Messengera).
        </p>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Jakie dane przetwarzamy
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              dane ogłoszenia: skąd, dokąd, data i godzina przejazdu, liczba
              miejsc (opcjonalnie), notatka (opcjonalnie)
            </li>
            <li>
              dane kontaktowe podane przez użytkownika: numer telefonu lub link
              do Messengera
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">W jakim celu</h2>
          <p className="mt-2">
            Dane służą wyłącznie do publikacji ogłoszenia i umożliwienia
            kontaktu między użytkownikami.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Jak długo przechowujemy
          </h2>
          <p className="mt-2">
            Ogłoszenia (wraz z danymi kontaktowymi) są automatycznie usuwane{" "}
            <span className="font-semibold text-slate-100">
              około 6 godzin po czasie przejazdu
            </span>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Podstawa przetwarzania
          </h2>
          <p className="mt-2">
            Podstawą jest zgoda użytkownika – ogłoszenie jest dodawane
            dobrowolnie, a dane kontaktowe są podawane i publikowane świadomie w
            treści ogłoszenia.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Komu udostępniamy dane
          </h2>
          <p className="mt-2">
            Dane ogłoszeń są widoczne publicznie na stronie. Technicznie mogą
            być przetwarzane przez dostawców hostingu i bazy danych (w zakresie
            niezbędnym do działania serwisu).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-100">
            Kontakt w sprawie danych
          </h2>
          <p className="mt-2">
            Jeśli chcesz usunąć ogłoszenie szybciej lub masz pytania dot.
            prywatności, napisz na{" "}
            <a
              className="underline underline-offset-2 hover:text-slate-100"
              href="mailto:dojazdy.bogdanka@o2.pl"
            >
              dojazdy.bogdanka@o2.pl
            </a>
            . W wiadomości podaj treść ogłoszenia albo numer/link z ogłoszenia
            oraz datę/godzinę.
          </p>
        </section>

        <p className="text-xs text-slate-400">
          Uwaga: nie podawaj danych wrażliwych. Serwis nie weryfikuje
          użytkowników.
        </p>
      </div>
    </main>
  );
}

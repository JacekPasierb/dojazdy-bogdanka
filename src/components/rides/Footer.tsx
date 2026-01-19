export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-700/70 py-6 text-center text-[12px] text-slate-400">
      <p className="font-semibold text-slate-300">
        Dojazdy do Bogdanki © {new Date().getFullYear()}
      </p>

      <p className="mt-2 leading-relaxed">
        Lokalna tablica ogłoszeń do wspólnych dojazdów.
        <br />
        Serwis nie pośredniczy w płatnościach ani przejazdach.
        <br />
        Kontakt i ustalenia odbywają się bezpośrednio między użytkownikami.
      </p>

      <p className="mt-3">
        Masz uwagi, pomysł na ulepszenie lub chcesz pomóc w rozwoju?
        <br />
        Napisz do nas:
        <a
          href="mailto:dojazdy.bogdanka@o2.pl"
          className="font-semibold text-slate-300 underline underline-offset-2 hover:text-slate-100"
        >
          dojazdy.bogdanka@o2.pl
        </a>
      </p>
    </footer>
  );
}

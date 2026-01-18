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
    </footer>
  );
}

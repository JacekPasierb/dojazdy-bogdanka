export function Chip({
    active,
    onClick,
    children,
  }: {
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "rounded-full border px-[10px] py-2 text-[14px] font-semibold",
          "border-slate-700/80 bg-slate-950/30 text-slate-100",
          "hover:border-slate-600",
          active ? "border-blue-400/90 shadow-[0_0_0_3px_rgba(43,140,255,0.15)]" : "",
        ].join(" ")}
      >
        {children}
      </button>
    );
  }
  
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div>
        <div className="mb-[6px] text-[13px] text-slate-300/90">{label}</div>
        {children}
      </div>
    );
  }
  
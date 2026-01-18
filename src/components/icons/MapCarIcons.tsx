export function MapCarIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="9"
        y="7"
        width="6"
        height="3.5"
        rx="0.7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="11.5" r="0.7" fill="currentColor" />
      <circle cx="14" cy="11.5" r="0.7" fill="currentColor" />
    </svg>
  );
}

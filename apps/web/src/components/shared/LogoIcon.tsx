import { cn } from "@/lib/utils";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={cn("text-primary", className)}
    >
      {/* ─── Outer Plate / Clock Boundary (Time + Food) ─── */}
      <circle
        cx="16"
        cy="16"
        r="13"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-90"
      />

      {/* Clock ticks (representing Time) */}
      <line x1="16" y1="5.5" x2="16" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="24.5" x2="16" y2="26.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="16" x2="7.5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24.5" y1="16" x2="26.5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* ─── Table / Schedule Grid lines in the Center (Table + Schedule) ─── */}
      <path
        d="M10 12H22M10 16H22M10 20H22M13 9V23M19 9V23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 2"
        className="opacity-40"
      />

      {/* ─── Clock Hands as Utensils (Food + Time) ─── */}
      {/* Spoon Hour Hand pointing to 2 o'clock */}
      <g transform="rotate(60, 16, 16)">
        {/* Spoon stem */}
        <line x1="16" y1="16" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Spoon head */}
        <ellipse cx="16" cy="9" rx="2" ry="3" fill="currentColor" />
      </g>

      {/* Fork Minute Hand pointing to 10 o'clock */}
      <g transform="rotate(-60, 16, 16)">
        {/* Fork stem */}
        <line x1="16" y1="16" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Fork tines base */}
        <path d="M14 9H18V6H14V9Z" fill="currentColor" />
        {/* Fork tines */}
        <line x1="14.5" y1="6" x2="14.5" y2="4" stroke="currentColor" strokeWidth="1" />
        <line x1="16" y1="6" x2="16" y2="3.5" stroke="currentColor" strokeWidth="1" />
        <line x1="17.5" y1="6" x2="17.5" y2="4" stroke="currentColor" strokeWidth="1" />
      </g>

      {/* Clock Center pin */}
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonsCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonsCard({ label = "Border Magic", className, ...props }: ButtonsCardProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-grey-600",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#393bb2_0%,#22236b_50%,#393bb2_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {label}
      </span>
    </button>
  );
}
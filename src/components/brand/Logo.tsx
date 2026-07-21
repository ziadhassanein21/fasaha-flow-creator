import { Link } from "@tanstack/react-router";

type Props = {
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

export function Logo({ size = "md", className = "" }: Props) {
  const heightClass = sizeMap[size];

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="فصاحة"
        className={`${heightClass} w-auto object-contain transition-all group-data-[state=collapsed]:h-6`}
      />
    </Link>
  );
}


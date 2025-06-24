interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

export function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-12",
  };

  const src = variant === "icon" ? "/vap-icon.svg" : "/vap-logo.svg";
  const alt = variant === "icon" ? "VAP Icon" : "VAP Logo";

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
}

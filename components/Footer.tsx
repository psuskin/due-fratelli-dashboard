interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <div className={`text-center mt-8 ${className}`}>
      <p className="text-sm text-[var(--foreground)]/60 font-[var(--font-fjalla-one)]">
        Powered by Due Fratelli Restaurant Management
      </p>
    </div>
  );
}
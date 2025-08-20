interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`text-center mt-6 sm:mt-8 ${className}`}>
      <p className="text-xs sm:text-sm text-[var(--foreground)]/60">
        Powered by Due Fratelli Restaurant Management
      </p>
    </footer>
  );
}

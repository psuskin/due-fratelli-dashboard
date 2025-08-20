interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="font-[var(--font-fjalla-one)] text-4xl md:text-5xl font-bold text-gradient-due mb-4">
        Due Fratelli
      </h1>
      <p className="text-lg text-[var(--secondary)] font-medium">
        Menu Upload Portal
      </p>
      <p className="text-sm text-[var(--foreground)] mt-2 opacity-80">
        Upload new menu PDFs to update the restaurant website
      </p>
    </div>
  );
}
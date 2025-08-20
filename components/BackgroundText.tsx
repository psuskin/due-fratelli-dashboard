interface BackgroundTextProps {
  text: string;
}

export default function BackgroundText({ text }: BackgroundTextProps) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Multiple lines from top to bottom */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute w-full flex justify-center"
          style={{
            top: `${i * 24}%`,
            left: `${(i % 7) * 10 - 30}%`,
            transform: 'rotate(-5deg)',
            // animation: `slowMove ${190 + i * 80}s linear infinite`,
          }}
        >
          <div
            className="text-transparent hover:text-orange-900 select-none whitespace-nowrap leading-none transition-colors duration-[1000ms] ease-linear font-bold"
            style={{
              fontSize: 'clamp(6rem, 18rem, 18rem)',
              WebkitTextStroke: '2px rgba(139, 69, 19, 0.1)',
              letterSpacing: '0.5rem',
            }}
          >
            {Array(8).fill(text).join(' ')}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slowMove {
          0% {
            transform: translateX(-100%) rotate(-5deg);
          }
          100% {
            transform: translateX(100%) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}

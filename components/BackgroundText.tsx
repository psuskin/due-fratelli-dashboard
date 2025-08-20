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
          className="absolute w-full flex justify-center "
          style={{
            top: `${i * 24}%`,
            left: `${(i % 7) * 10 - 30}%`,
            transform: 'rotate(-5deg)',
          }}
        >
          <div
            className=" text-transparent hover:text-orange-900 select-none whitespace-nowrap leading-none transition-colors duration-300 font-bold"
            style={{
              fontSize: 'clamp(6rem, 18rem, 18rem)',
              // textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              WebkitTextStroke: '2px rgba(139, 69, 19, 0.1)',
              letterSpacing: '0.5rem',
              // wordSpacing: '1rem',
            }}
          >
            {Array(4).fill(text).join(' ')}
          </div>
        </div>
      ))}
    </div>
  );
}

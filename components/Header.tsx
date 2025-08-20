interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <div className={` p-8 mb-12 ${className}`}>
      <h3 className=" lg:-top-8 text-lg lg:text-2xl text-[#dfbf5b]/70 tracking-[0.2em] uppercase">
        Ristorante
      </h3>
      <h1 className="uppercase text-4xl md:text-[3.8rem] font-bold text-primary mb-4 -mt-1.5">
        Due Fratelli
      </h1>
      <p className="text-sm font-medium">Menu Upload Portal</p>
      <p className="text-sm opacity-80">Upload new menu PDFs to update the restaurant website</p>
    </div>
  );
}

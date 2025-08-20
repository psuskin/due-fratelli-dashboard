import Header from '@/components/Header';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-background text-foreground">
      <div className="grid md:grid-cols-12">
        <div className="col-span-4 hidden md:block shadow-2xl shadow-primary">
          <Header />
        </div>
        <div className="col-span-8 ">{children}</div>
      </div>
    </div>
  );
};

export default layout;

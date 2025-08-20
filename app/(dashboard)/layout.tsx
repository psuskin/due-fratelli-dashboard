import Header from '@/components/Header';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-background text-foreground">
      <div className="grid grid-cols-12">
        <div className="col-span-4 shadow-2xl shadow-primary">
          <Header />
        </div>
        <div className="col-span-8 ">{children}</div>
      </div>
    </div>
  );
};

export default layout;

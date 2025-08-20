const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="bg-background text-foreground">{children}</div>;
};

export default layout;

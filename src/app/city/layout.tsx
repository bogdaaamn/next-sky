type PropsType = {
  children: React.ReactNode;
};

export default function CityLayout({ children }: PropsType) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {children}
    </main>
  );
}

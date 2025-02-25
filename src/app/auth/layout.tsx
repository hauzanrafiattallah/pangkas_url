export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center w-full max-w-7xl mx-auto py-24">
      {children}
    </main>
  );
}

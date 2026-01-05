export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <article className="space-y-6 text-gray-700 dark:text-gray-300">
          {children}
        </article>
      </div>
    </main>
  );
}

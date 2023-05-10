import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="mb-3 text-2xl font-semibold">Hey sky</h2>
      <ul className="list-disc">
        <li>
          <Link href="/london">London</Link>
        </li>
        <li>
          <Link href="/rome">Rome</Link>
        </li>
        <li>
          <Link href="/piatra-neamt">Piatra</Link>
        </li>
      </ul>
    </main>
  );
}

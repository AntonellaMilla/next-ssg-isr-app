import { ReactNode } from "react";
import Link from "next/link";

interface RickLayoutProps {
  children: ReactNode;
}

export default function RickLayout({ children }: RickLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-black bg-opacity-40 backdrop-blur-sm sticky top-0 z-50 p-4">
        <Link href="/rick" className="text-white text-2xl font-bold hover:text-green-400">
          Rick and Morty Characters
        </Link>
      </nav>
      {children}
    </div>
  );
}

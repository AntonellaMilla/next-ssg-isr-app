import { Character } from "@/types/rick";
import Image from "next/image";
import Link from "next/link";

interface RickPageProps {
  params: {
    id: string;
  };
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 } // ISR 10 días
  });
  if (!res.ok) throw new Error("Personaje no encontrado");
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: { results: Character[] } = await res.json();
  return data.results.map(char => ({ id: char.id.toString() }));
}

export default async function RickDetail({ params }: RickPageProps) {
  const char = await getCharacter(params.id);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex justify-center items-center">
          <Image src={char.image} width={300} height={300} alt={char.name} className="rounded-lg" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{char.name}</h1>
          <p><strong>Status:</strong> {char.status}</p>
          <p><strong>Species:</strong> {char.species}</p>
          <p><strong>Type:</strong> {char.type || "N/A"}</p>
          <p><strong>Gender:</strong> {char.gender}</p>
          <p><strong>Origin:</strong> {char.origin.name}</p>
          <p><strong>Location:</strong> {char.location.name}</p>
          <p><strong>Created:</strong> {new Date(char.created).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/rick" className="text-white bg-black px-4 py-2 rounded hover:bg-green-700">← Volver</Link>
      </div>
    </div>
  );
}

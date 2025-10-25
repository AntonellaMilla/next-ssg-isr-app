// app/rick/[id]/page.tsx
import Image from "next/image";

interface CharacterDetailProps {
  params: { id: string };
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin?: { name: string; url?: string } | null;
  location?: { name: string; url?: string } | null;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default async function CharacterPage({ params }: CharacterDetailProps) {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${params.id}`,
      { next: { revalidate: 864000 } } // ISR 10 días
    );

    if (!res.ok) {
      return (
        <div className="p-8 text-red-500">
          Personaje con id {params.id} no encontrado
        </div>
      );
    }

    const character: Character = await res.json();

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
        <Image
          src={character.image}
          width={300}
          height={300}
          alt={character.name}
          className="rounded-lg"
          priority={false} // Lazy loading
        />
        <ul className="mt-4 text-lg">
          <li><strong>Status:</strong> {character.status}</li>
          <li><strong>Species:</strong> {character.species}</li>
          <li><strong>Type:</strong> {character.type || "N/A"}</li>
          <li><strong>Gender:</strong> {character.gender}</li>
          <li><strong>Origin:</strong> {character.origin?.name || "N/A"}</li>
          <li><strong>Location:</strong> {character.location?.name || "N/A"}</li>
          <li><strong>Episodes:</strong> {character.episode.length}</li>
          <li><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}</li>
        </ul>
      </div>
    );
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return <div className="p-8 text-red-500">Error: {error.message}</div>;
    }
    return <div className="p-8 text-red-500">Error desconocido</div>;
  }
}

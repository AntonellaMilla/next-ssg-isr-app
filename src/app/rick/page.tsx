"use client"; // Necesario para CSR

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/rick";

export default function RickListCSR() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");

  // Cargar personajes desde la API
  useEffect(() => {
    async function fetchCharacters() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchCharacters();
  }, []);

  // Filtrado en tiempo real usando useMemo
  const filtered = useMemo(() => {
    return characters.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.gender.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, characters]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl text-white font-bold mb-4">Personajes Rick and Morty</h1>
      <input
        type="text"
        placeholder="Buscar por nombre, estado, tipo o género..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 rounded text-black"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((char) => (
          <Link key={char.id} href={`/rick/${char.id}`}>
            <div className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:scale-105 transition">
              <Image
                width={200}
                height={200}
                src={char.image}
                alt={char.name}
                className="rounded-lg"
                priority={false}
              />
              <h2 className="text-xl font-bold mt-2">{char.name}</h2>
              <p className="text-gray-500">#{char.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

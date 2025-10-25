import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>¡Uh-oh! Pokémon no encontrado 🔍</h2>
      <p>No pudimos encontrar el Pokémon que buscabas.</p>
      <Link
        href="/pokemon"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#48bb78',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Volver a la lista de Pokémon
      </Link>
    </div>
  )
}

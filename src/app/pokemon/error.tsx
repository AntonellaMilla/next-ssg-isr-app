'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
      // ---------- FORZAR ERROR PARA PRUEBA ----------
  // Descomenta la siguiente línea para probar tu página de error:
  // throw new Error('Error de prueba en Pokémon')

  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    
  useEffect(() => {
    // Registrar el error en consola o en un servicio de monitoreo
    console.error('Error en Pokémon:', error)
  }, [error])

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>¡Oops! Algo salió mal 🐛</h2>
      <p>No pudimos cargar la información de los Pokémon.</p>
      <button
        onClick={() => reset()}
        style={{
          margin: '1rem',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: '#f56565',
          color: 'white',
          border: 'none',
        }}
      >
        Intentar de nuevo
      </button>
      <div>
        <Link href="/pokemon" style={{ color: '#3182ce', textDecoration: 'underline' }}>
          Volver a la lista de Pokémon
        </Link>
      </div>
    </div>
  )
}

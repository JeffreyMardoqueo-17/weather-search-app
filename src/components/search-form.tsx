"use client"

import { type FormEvent, useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  // que recibe el nombre de ciudad cuando el usuario hace submit 
  onSearch: (city: string) => void
  ///Bloquea el formulario mientras se está consultando 
  isLoading: boolean
  initialCity?: string
}


// SearchForm formulario de busqueda de la ciudad

export function SearchForm({
  onSearch,
  isLoading,
  initialCity = "",
}: SearchFormProps) {
  const [city, setCity] = useState(initialCity)

  useEffect(() => {
    setCity(initialCity)
  }, [initialCity])

    // Maneja el submit del formulario v
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = city.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ej: San Salvador, Sonsonate, New York..."
        aria-label="Nombre de la ciudad"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="min-w-28 gap-2"
      >
        <Search className="size-4" />
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </form>
  )
}

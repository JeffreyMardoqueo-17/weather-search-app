"use client"

import { useEffect, useRef, useState } from "react"
import { CloudSun } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SearchForm } from "@/components/search-form"
import { WeatherCard } from "@/components/weather-card"
import { getWeatherByCity } from "@/services/weatherService"
import type { WeatherData } from "@/types/weather"

// Posibles estados del flujo de búsqueda
type Status = "idle" | "loading" | "error" | "success"

interface WeatherSearchShellProps {
  fetchWeather?: (city: string) => Promise<WeatherData>
}

// WeatherSearchShell orquestador principal
// Gestiona el estado de la app y coordina SearchForm + WeatherCard
export function WeatherSearchShell({
  fetchWeather = getWeatherByCity,
}: WeatherSearchShellProps) {
  const [status, setStatus] = useState<Status>("idle")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const didSyncFromUrl = useRef(false)

  function syncCityQueryParam(city: string) {
    if (typeof window === "undefined") return

    const url = new URL(window.location.href)
    url.searchParams.set("city", city)
    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`)
  }

  async function handleSearch(city: string, syncUrl = true) {
    const trimmedCity = city.trim()
    if (!trimmedCity) return

    if (syncUrl) {
      syncCityQueryParam(trimmedCity)
    }

    setSearchCity(trimmedCity)
    setStatus("loading")
    setErrorMessage("")
    setWeather(null)

    try {
      const data = await fetchWeather(trimmedCity)
      setWeather(data)
      setStatus("success")
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido."
      )
      setStatus("error")
    }
  }

  useEffect(() => {
    if (didSyncFromUrl.current || typeof window === "undefined") return

    didSyncFromUrl.current = true
    const cityFromQuery = new URLSearchParams(window.location.search).get("city")

    if (cityFromQuery?.trim()) {
      void handleSearch(cityFromQuery, false)
    }
  }, [])

  return (
    <div className="space-y-5">
      {/* Formulario de BUSQUEDA */}
      <SearchForm
        onSearch={(city) => {
          void handleSearch(city)
        }}
        isLoading={status === "loading"}
        initialCity={searchCity}
      />

      {/* Estado cargando */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
          <CloudSun className="size-10 animate-pulse" />
          <p className="text-sm">Consultando el clima...</p>
        </div>
      )}

      {/* Estado error */}
      {status === "error" && (
        <Alert variant="destructive">
          <AlertTitle>No se pudo obtener el clima</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Estadoexito — muestra la tarjeta del clima */}
      {status === "success" && weather && <WeatherCard data={weather} />}

      {/* Estado idle — pista inicial */}
      {status === "idle" && (
        <p className="text-center text-xs text-muted-foreground">
          Escribe el nombre de cualquier ciudad del mundo y presiona Buscar.
        </p>
      )}
    </div>
  )
}

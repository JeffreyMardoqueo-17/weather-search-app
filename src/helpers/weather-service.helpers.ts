import { AxiosError } from "axios"

import { getOpenWeatherConfig } from "@/lib/openweather-config"
import type { OpenWeatherResponse, WeatherData } from "@/types/weather"

export function getWeatherApiKey(): string {
  return getOpenWeatherConfig().apiKey
}
//mapea la respuesta en crudo de la api al modelo que uso en la UI
export function mapWeatherResponse(raw: OpenWeatherResponse): WeatherData {
  return {
    city: raw.name,
    country: raw.sys.country,
    temperature: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    tempMin: Math.round(raw.main.temp_min),
    tempMax: Math.round(raw.main.temp_max),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: raw.weather[0].description,
    icon: raw.weather[0].icon,
    visibility: raw.visibility,
    pressure: raw.main.pressure,
  }
}
//por si pasa algun error al consultar mapea el error de axios a un mensaje mas amigable para el usuario
export function mapWeatherRequestError(error: unknown, city: string): never {
  if (error instanceof AxiosError && error.response?.status === 404) {
    throw new Error(`No se encontro "${city}". Verifica el nombre e intenta de nuevo.`)
  }

  if (error instanceof AxiosError && error.response?.status === 401) {
    throw new Error(
      "La clave de API es invalidad o auun no esta activada"
    )
  }

  if (error instanceof AxiosError && !error.response) 
    throw new Error("No se pudo conectar al servicio de clima")
    
  if (error instanceof AxiosError) 
    throw new Error("Error al consultar el clima")

  throw error
}

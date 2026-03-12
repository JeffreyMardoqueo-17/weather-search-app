import axios from "axios"

import {
  getWeatherApiKey,
  mapWeatherRequestError,
  mapWeatherResponse,
} from "@/helpers/weather-service.helpers"
import { getOpenWeatherConfig } from "@/lib/openweather-config"
import type { OpenWeatherResponse, WeatherData } from "@/types/weather"

// la funcion principa consulta el clima de una ciudad 
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = getWeatherApiKey()
  const { apiBaseUrl } = getOpenWeatherConfig()

  try {
    const { data } = await axios.get<OpenWeatherResponse>(
      `${apiBaseUrl}/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
          lang: "es",
        },
        timeout: 10000, //para eviat esperas largas
      }
    )

    return mapWeatherResponse(data)
  } catch (error) {
    mapWeatherRequestError(error, city)
  }
}

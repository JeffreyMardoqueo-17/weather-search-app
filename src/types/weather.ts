// ---------------------------------------------------------------------------
// Tipos RAW de la respuesta de OpenWeatherMap (data/2.5/weather)
// Sólo mapeamos los campos que realmente usamos en la UI.
// ---------------------------------------------------------------------------

export interface OpenWeatherResponse {
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  clouds: {
    all: number
  }
  cod: number
}

// ---------------------------------------------------------------------------
// Modelo de dominio usado en la UI (simplificado y already-mapped)
// ---------------------------------------------------------------------------

export interface WeatherData {
  /** Nombre de la ciudad */
  city: string
  /** Código de país (ej: "CO", "ES", "MX") */
  country: string
  /** Temperatura actual en °C (redondeada) */
  temperature: number
  /** Sensación térmica en °C (redondeada) */
  feelsLike: number
  /** Temperatura mínima del día en °C */
  tempMin: number
  /** Temperatura máxima del día en °C */
  tempMax: number
  /** Humedad relativa en % */
  humidity: number
  /** Velocidad del viento en m/s */
  windSpeed: number
  /** Descripción del clima en español (ej: "cielo claro") */
  description: string
  /** Código de ícono de OpenWeatherMap (ej: "01d") */
  icon: string
  /** Visibilidad en metros */
  visibility: number
  /** Presión atmosférica en hPa */
  pressure: number
}

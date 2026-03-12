
// Este archivo es una capa de configuración para OpenWeather
// el objetivo es que el resto de la app no tenga que saber 
// donde estan las URLs ni la API key perooo  que si falta algo 
// importante falle con un mensaje claro
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "")
}

//si la variable de entorno no existe lanza un error y dice cual falta
function getPublicEnvValue(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Falta la variable de entorno: ${name}`)
  }

  return value
}

//exporta la configuraciion de openwather 
export function getOpenWeatherConfig() {
  return {
    apiKey: getPublicEnvValue(
      process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
      "NEXT_PUBLIC_OPENWEATHERMAP_API_KEY"
    ),
    apiBaseUrl: normalizeBaseUrl(
      getPublicEnvValue(
        process.env.NEXT_PUBLIC_OPENWEATHER_API_BASE_URL,
        "NEXT_PUBLIC_OPENWEATHER_API_BASE_URL"
      )
    ),
    iconBaseUrl: normalizeBaseUrl(
      getPublicEnvValue(
        process.env.NEXT_PUBLIC_OPENWEATHER_ICON_BASE_URL,
        "NEXT_PUBLIC_OPENWEATHER_ICON_BASE_URL"
      )
    ),
  }
}
//
export function buildOpenWeatherIconUrl(icon: string): string {
  return `${getOpenWeatherConfig().iconBaseUrl}/${icon}@2x.png`
}

import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { WeatherCard } from "@/components/weather-card"
import { WeatherSearchShell } from "@/components/weather-search-shell"
import type { WeatherData } from "@/types/weather"

type FetchWeatherFn = (city: string) => Promise<WeatherData>

jest.mock("@/lib/openweather-config", () => ({
  buildOpenWeatherIconUrl: (icon: string) => `https://example.test/icons/${icon}@2x.png`,
  getOpenWeatherConfig: () => ({
    apiKey: "test-key",
    apiBaseUrl: "https://api.openweathermap.org/data/2.5",
    iconBaseUrl: "https://example.test/icons",
  }),
}))

const mockWeatherData: WeatherData = {
  city: "San Salvador",
  country: "SV",
  temperature: 27,
  feelsLike: 29,
  tempMin: 24,
  tempMax: 30,
  humidity: 65,
  windSpeed: 3.8,
  description: "cielo claro",
  icon: "01d",
  visibility: 10000,
  pressure: 1014,
}

// Pruebas para el componente WeatherCard
describe("WeatherCard", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.history.replaceState(null, "", "/")
  })
  // Verifica que el componente muestre correctamente la informacion del clima proporcionada
  it("muestra correctamente ciudad, temperatura, humedad y descripcion", () => {
    render(<WeatherCard data={mockWeatherData} />)

    expect(screen.getByText(/san salvador/i)).toBeTruthy()
    expect(screen.getByText("27°C")).toBeTruthy()
    expect(screen.getByText("65%")).toBeTruthy()
    expect(screen.getByText(/cielo claro/i)).toBeTruthy()
  })
// Pruebas para el componente WeatherSearchShell
  it("renderiza los datos del clima despues de una busqueda exitosa", async () => {
    const user = userEvent.setup()
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockResolvedValueOnce(mockWeatherData)

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "San Salvador")
    await user.click(button)

    expect(await screen.findByText(/san salvador/i)).toBeTruthy()
    expect(await screen.findByText("27°C")).toBeTruthy()
    expect(await screen.findByText("65%")).toBeTruthy()
    expect(await screen.findByText(/cielo claro/i)).toBeTruthy()
  })
// Verifica que se muestre un mensaje de error amigable cuando la ciudad no se encuentra
  it("muestra mensaje de error cuando la ciudad es invalida", async () => {
    const user = userEvent.setup()
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockRejectedValueOnce(
      new Error("No se encontró \"CiudadInexistente\". Verifica el nombre e intenta de nuevo.")
    )

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "CiudadInexistente")
    await user.click(button)

    expect(await screen.findByText(/no se pudo obtener el clima/i)).toBeTruthy()
    expect(
      await screen.findByText(/no se encontró \"ciudadinexistente\"/i)
    ).toBeTruthy()
  })

// Verifica que se muestre un mensaje de error generico cuando ocurre un error no estandar
  it("muestra estado inicial e indicador de carga durante la busqueda", async () => {
    const user = userEvent.setup()
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockImplementationOnce(() => new Promise<WeatherData>(() => undefined))

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    expect(
      screen.getByText(/escribe el nombre de cualquier ciudad del mundo/i)
    ).toBeTruthy()

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "Madrid")
    await user.click(button)

    expect(await screen.findByText(/consultando el clima/i)).toBeTruthy()
  })
// Verifica que se muestre un mensaje de error generico cuando ocurre un error no estandar
  it("muestra mensaje generico cuando ocurre un error no estandar", async () => {
    const user = userEvent.setup()
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockImplementationOnce(() => Promise.reject("fallo-no-controlado"))

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "Roma")
    await user.click(button)

    expect(await screen.findByText(/error desconocido/i)).toBeTruthy()
  })

  it("sincroniza la ciudad buscada en la URL", async () => {
    const user = userEvent.setup()
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockResolvedValueOnce(mockWeatherData)

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "Sonsonate")
    await user.click(button)

    expect(window.location.search).toBe("?city=Sonsonate")
  })

  it("carga automaticamente desde la URL cuando existe city", async () => {
    const fetchWeather: jest.MockedFunction<FetchWeatherFn> = jest.fn()
    fetchWeather.mockResolvedValueOnce(mockWeatherData)
    window.history.replaceState(null, "", "/?city=Sonsonate")

    render(<WeatherSearchShell fetchWeather={fetchWeather} />)

    expect(fetchWeather).toHaveBeenCalledWith("Sonsonate")
    expect(await screen.findByText(/san salvador/i)).toBeTruthy()
  })
})

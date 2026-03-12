import { describe, expect, it, jest } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SearchForm } from "@/components/search-form"
// Pruebas para el componente SearchForm
describe("SearchForm", () => {
    // Verifica que el formulario renderice correctamente el input y el boton
  it("renderiza el input de ciudad y el boton de busqueda", () => {
    render(<SearchForm onSearch={jest.fn()} isLoading={false} />)

    expect(screen.getByRole("textbox", { name: /nombre de la ciudad/i })).toBeTruthy()
    expect(screen.getByRole("button", { name: /buscar/i })).toBeTruthy()
  })
  // Verifica que el usuario pueda escribir en el input y que el valor se actualice correctamente
  it("permite que el usuario escriba en el input", async () => {
    const user = userEvent.setup()

    render(<SearchForm onSearch={jest.fn()} isLoading={false} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    await user.type(input, "Medellin")

    expect((input as HTMLInputElement).value).toBe("Medellin")
  })
// Verifica que el boton de busqueda se deshabilite cuando el input esta vacio o con espacios
  it("ejecuta onSearch con el nombre de la ciudad al enviar el formulario", async () => {
    const user = userEvent.setup()
    const onSearch = jest.fn()

    render(<SearchForm onSearch={onSearch} isLoading={false} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    const button = screen.getByRole("button", { name: /buscar/i })

    await user.type(input, "San Salvador")
    await user.click(button)

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith("San Salvador")
  })
    // Verifica que el boton de busqueda se deshabilite cuando el input esta vacio o con espacios
  it("no ejecuta onSearch cuando el campo esta vacio o con espacios", async () => {
    const user = userEvent.setup()
    const onSearch = jest.fn()

    render(<SearchForm onSearch={onSearch} isLoading={false} />)

    const input = screen.getByRole("textbox", { name: /nombre de la ciudad/i })
    await user.type(input, "   ")

    const button = screen.getByRole("button", { name: /buscar/i })
    expect(button.getAttribute("disabled")).not.toBeNull()
    expect(onSearch).not.toHaveBeenCalled()
  })
})

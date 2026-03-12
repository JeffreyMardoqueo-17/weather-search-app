import { ModeToggle } from "@/components/mode-toggle"
import { ThemePaletteSwitcher } from "@/components/theme-palette-switcher"
import { WeatherSearchShell } from "@/components/weather-search-shell"

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Weather Search App
            </h1>
            <p className="max-w-2xl text-muted-foreground">
             Solo escriba el nombre de la ciudad que desea consultar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemePaletteSwitcher />
            <ModeToggle />
          </div>
        </header>

        <section className="mx-auto w-full max-w-2xl">
          <WeatherSearchShell />
        </section>
      </div>
    </main>
  )
}

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function WeatherSearchShell() {
  return (
    <Card className="w-full border-border/70 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            type="text"
            placeholder="Ejemplo: San Salvador"
            aria-label="Ciudad a consultar"
          />
          <Button type="button" className="sm:min-w-32">
            Buscar
          </Button>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
      Aqui voy a buscar las ciudades y mostrare informacion del clima
      </CardFooter>
    </Card>
  )
}

import Image from "next/image"
import { Droplets, Gauge, Thermometer, Wind } from "lucide-react"

import { buildOpenWeatherIconUrl } from "@/lib/openweather-config"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import type { WeatherData } from "@/types/weather"

interface WeatherCardProps {
  data: WeatherData
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

//muesstra el clima de la ciudad consultada en una tarjeta con detalles 
export function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = buildOpenWeatherIconUrl(data.icon)
  const visibilityKm = (data.visibility / 1000).toFixed(1)

  return (
    <Card className="w-full border-border/70 shadow-lg">
      <CardHeader className="pb-4">
        {/* Ciudad + icono del clima */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {data.city},{" "}
              <span className="text-muted-foreground">{data.country}</span>
            </h2>
            <p className="mt-0.5 capitalize text-muted-foreground">
              {data.description}
            </p>
          </div>
          <Image
            src={iconUrl}
            alt={data.description}
            width={64}
            height={64}
            priority
          />
        </div>

        {/* Temperatura principal */}
        <div className="mt-2 flex items-end gap-3">
          <span className="text-6xl font-bold tracking-tight">
            {data.temperature}°C
          </span>
        </div>

        {/* Sensación terminca + rango */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Thermometer className="size-4" />
            Sensación {data.feelsLike}°C
          </span>
          <span>
            ↓ {data.tempMin}°C &nbsp; ↑ {data.tempMax}°C
          </span>
        </div>
      </CardHeader>

      {/* Grid de estadisticas */}
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatItem
            icon={<Droplets className="size-4" />}
            label="Humedad"
            value={`${data.humidity}%`}
          />
          <StatItem
            icon={<Wind className="size-4" />}
            label="Viento"
            value={`${data.windSpeed} m/s`}
          />
          <StatItem
            icon={<Gauge className="size-4" />}
            label="Presión"
            value={`${data.pressure} hPa`}
          />
          <StatItem
            icon={<Droplets className="size-4 opacity-60" />}
            label="Visibilidad"
            value={`${visibilityKm} km`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

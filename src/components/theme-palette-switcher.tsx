"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PaletteId = "default" | "clynic" | "ocean" | "sunset";

interface PaletteConfig {
  id: PaletteId;
  name: string;
  swatches: [string, string, string];
}

const STORAGE_KEY = "weather-search-palette";

const PALETTES: PaletteConfig[] = [
  {
    id: "default",
    name: "Escala de grises",
    swatches: ["#171717", "#737373", "#e5e5e5"],
  },
  {
    id: "clynic",
    name: "Clynic Azul",
    swatches: ["#1f6feb", "#4f8fff", "#a8c5ff"],
  },
  {
    id: "ocean",
    name: "Ocean Teal",
    swatches: ["#0d9488", "#14b8a6", "#74e2d5"],
  },
  {
    id: "sunset",
    name: "Sunset Coral",
    swatches: ["#e85d3f", "#f97316", "#f8b77b"],
  },
];

function isValidPalette(value: string | null): value is PaletteId {
  return PALETTES.some((palette) => palette.id === value);
}

export function ThemePaletteSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<PaletteId>(() => {
    if (typeof window === "undefined") return "default";
    const savedValue = window.localStorage.getItem(STORAGE_KEY);
    return isValidPalette(savedValue) ? savedValue : "default";
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedPalette === "default")
      document.documentElement.removeAttribute("data-palette");
    else document.documentElement.setAttribute("data-palette", selectedPalette);

    window.localStorage.setItem(STORAGE_KEY, selectedPalette);
  }, [selectedPalette]);

  function applyPalette(paletteId: PaletteId) {
    setSelectedPalette(paletteId);
    setIsOpen(false);
  }

  const renderedPalette = mounted ? selectedPalette : "default";

  const activePalette =
    PALETTES.find((palette) => palette.id === renderedPalette) ?? PALETTES[0];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <Palette className="size-4" />
            <span suppressHydrationWarning>Paleta: {activePalette.name}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Selecciona una paleta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={renderedPalette}
            onValueChange={(value) => {
              if (isValidPalette(value)) 
                applyPalette(value);
            }}
          >
            {PALETTES.map((palette) => (
              <DropdownMenuRadioItem key={palette.id} value={palette.id}>
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="font-medium">{palette.name}</span>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {palette.swatches.map((swatch) => (
                      <span
                        key={swatch}
                        className="h-3 w-3 rounded-full border border-black/15"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </div>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

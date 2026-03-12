# Sistema de Tema y Paletas de Color

Como funciona el cambio de tema visual en la app (modo claro/oscuro + paletas de color) y por que la base de variables globales ya deja el proyecto listo para escalar 
## 1. Objetivo

El proyecto ahora soporta:

- modo `light` y `dark` (con `next-themes`)
- selector de paletas de color desde menu desplegable
- persistencia de paleta seleccionada en `localStorage`
- tema por defecto en escala de grises (estilo original)

La idea es mantener una UI simple para el buscador de clima, pero con una arquitectura de estilos preparada para crecer para qeu se vea esa parte lo djee listo 

## 2. Componentes y archivos clave

- `src/components/mode-toggle.tsx`
: Controla el cambio entre `light`, `dark` y `system`.

- `src/components/theme-palette-switcher.tsx`
: Boton con menu dropdown para elegir paleta de color.

- `src/app/globals.css`
: Define los tokens globales de color (variables CSS) para:
  - tema base (grises)
  - paleta `clynic`
  - paleta `ocean`
  - paleta `sunset`
  - variantes para modo oscuro (`.dark`)

- `src/app/layout.tsx`
: Incluye `ThemeProvider` con `attribute="class"` para que `next-themes` aplique la clase `dark` en `html`.

## 3. Como funciona el cambio de paleta

En `theme-palette-switcher.tsx` se hace lo siguiente:

1. Se define la lista de paletas disponibles (`default`, `clynic`, `ocean`, `sunset`).
2. Se lee la paleta guardada desde `localStorage` con la key `weather-search-palette`.
3. Cuando el usuario selecciona una paleta:
   - se actualiza estado local
   - se aplica atributo en `html`: `data-palette="..."`
   - si es `default`, se elimina el atributo para usar tema gris base
   - se guarda la seleccion en `localStorage`
4. El menu se cierra automaticamente al seleccionar una opcion.

## 4. Como funciona junto con light/dark

El modo claro/oscuro y la paleta trabajan en capas:

- Capa 1: `next-themes` agrega o quita clase `.dark` en `html`.
- Capa 2: la paleta agrega (o no) `data-palette` en `html`.

En CSS existen bloques como:

- `:root` (default light)
- `.dark` (default dark)
- `:root[data-palette="ocean"]` (o cualquier paleta)
- `.dark[data-palette="ocean"]` (misma paleta en dark)

Esto permite que cada paleta conserve su identidad de color tanto en claro como en oscuro.

## 5. Tokens globales: que ya existe aunque hoy no se use todo

En `globals.css` hay varios tokens globales listos para crecimiento del proyecto, por ejemplo:

- base UI: `--background`, `--foreground`, `--card`, `--popover`
- acciones: `--primary`, `--secondary`, `--accent`, `--destructive`
- formularios: `--input`, `--ring`, `--border`
- graficas: `--chart-1` a `--chart-5`
- sidebar: `--sidebar-*`

Hoy, por ser una app pequena, no todos esos tokens se ven en pantalla.

Pero si el proyecto crece (dashboard, reportes, widgets, modulos admin, etc.), ya esta lista una base de paletas consistente para reutilizar en botones, cards, tablas, graficas, sidebar y estados visuales sin rehacer el sistema de estilos.

## 6. Ventajas de la implementacion

- Escalable: se pueden agregar nuevas paletas sin tocar cada componente
- Consistente: todos los componentes consumen tokens globales
- Mantenible: cambios visuales globales se hacen en un solo lugar y ese ess`globals.css` 
- UX simple: selector compacto, sin ruido visual extra muy importante sin tanto abrumo

## 7. Como agregar una nueva paleta

1. Agregar la opcion en `PALETTES` dentro de `theme-palette-switcher.tsx`.
2. Agregar tokens en `globals.css` para:
   - `:root[data-palette="nueva"]`
   - `.dark[data-palette="nueva"]`
3. Validar contraste en light/dark y revisar estados (`hover`, `focus`, `ring`)

## Algo muy importnatee 

Se aplico manejo de hidratacion en el selector de paleta para evitar mismatch SSR/CSR en Next.js (error de hydration) cuando hay valor persistido en `localStorage`
quiere decir que se agrego una estrategia para que el primer render sea igual en servidor y cliente, y despues ya se aplica la paleta guardada.
Asi se evita el error

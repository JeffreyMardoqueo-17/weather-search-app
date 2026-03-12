# Weather Search App

Esta es mi prueba tecnica Una app web para consultar el clima actual por ciudad usando Next.js, TypeScript y OpenWeather.

## 1. Requisitos

Antes de iniciar, necesitas:

- Node.js 20 o superior
- npm 10 o superior
- Una API key valida de OpenWeather

Verifica versiones:

```bash
node -v
npm -v
```

## 2. Instalacion del proyecto

1. Instala dependencias

```bash
npm install
```

2. Se debe crear `.env.local` en la raiz del proyecto con estas variables

```env
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=aquivalakey
NEXT_PUBLIC_OPENWEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_OPENWEATHER_ICON_BASE_URL=https://openweathermap.org/img/wn
```

Notas importantes

- Si falta una variable, la app lanzara un error claro al inicializar la configuracion.
- Todas las variables son `NEXT_PUBLIC_*` porque se usan desde el cliente.

## 3. Como iniciar en desarrollo

Ejecuta:

```bash
npm run dev
```
En el navegador:

- http://localhost:3000

## 4. Scripts disponibles

### Desarrollo

```bash
npm run dev
```

Inicia servidor de desarrollo de Next.js.

### Build de produccion

```bash
npm run build
```

Genera el build optimizado.

### Ejecutar build en produccion

```bash
npm run start
```

Levanta la app usando el build generado.

### Lint

```bash
npm run lint
```

Ejecuta ESLint para validar calidad de codigo.

### Tests

```bash
npm run test
```

Ejecuta pruebas con Jest.

### Cobertura

```bash
npm run test:coverage
```

Genera reporte de cobertura en la carpeta `coverage/`.

## 5. Testing (Jest + Testing Library)

El proyecto usa:

- Jest como test runner
- React Testing Library para pruebas de componentes
- user-event para simular interacciones reales


Documentacion extendida de testing:

- `docs/testing-react-testing-library.md`

## 6. Tema visual y paletas de color

La app tiene dos capas de tema:

1. Modo de color: `light` / `dark` / `system` (con `next-themes`).
2. Paleta: `default` (grises), `clynic`, `ocean`, `sunset`.

Comportamiento clave:

- La paleta seleccionada se guarda en `localStorage`.
- Se aplica en `html` usando `data-palette`.
- Si la paleta es `default`, se elimina `data-palette` para usar el tema base.
- El selector evita errores de hidratacion SSR/CSR.

Documentacion extendida de paletas:

- `docs/theming-paletas.md`

## 7. Stack tecnico y paquetes usados

### Base del proyecto

- Next.js 16.1.6
- React 19
- TypeScript 5


### Datos y servicios

- axios

### Calidad y pruebas

- eslint + eslint-config-next
- jest + jest-environment-jsdom
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event

## 8. Solucion de problemas comunes

### Error por variables de entorno faltantes

Revisa `.env.local` y confirma que estan las 3 variables `NEXT_PUBLIC_OPENWEATHER...`.

### Error de API key invalida

Verifica que tu key de OpenWeather sea correcta y este activa.

### No carga iconos del clima

Confirma que `NEXT_PUBLIC_OPENWEATHER_ICON_BASE_URL` sea:

```text
https://openweathermap.org/img/wn
```

### Warning/error de hidratacion

El selector de paletas ya incluye manejo para evitar mismatch SSR/CSR cuando existe un valor guardado en `localStorage`.

## 10. Estado actual

- App funcional para busqueda de clima por ciudad.
- Sistema de paletas listo para crecer a mas pantallas.
- Pruebas base implementadas para flujo principal.

## 11. Documentacion adicional (archivos .md)

Para mantener el README limpio, este proyecto separa detalles tecnicos en documentos especificos dentro de `docs/`.

### 11.1 Testing detallado

- Archivo: `docs/testing-react-testing-library.md`
- Enlace rapido: [docs/testing-react-testing-library.md](docs/testing-react-testing-library.md)


### 11.2 Temas y paletas de color

- Archivo: `docs/theming-paletas.md`
- Enlace rapido: [docs/theming-paletas.md](docs/theming-paletas.md)

### 11.3 Orden recomendado de lectura

Para entnder todo

1. Este README (setup + comandos).
2. [docs/theming-paletas.md](docs/theming-paletas.md) (sistema visual).
3. [docs/testing-react-testing-library.md](docs/testing-react-testing-library.md) (calidad y pruebas).

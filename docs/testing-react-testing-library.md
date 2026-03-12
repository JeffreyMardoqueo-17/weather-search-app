# Testing con React Testing Library y Jest


Nota:
- Yo no sabia sobre test pero ahora investigue mucho sobre esto 

## 1. ¿Que aprendi?

**React Testing Library** se utiliza para probar componentes de React desde la perspectiva del usuario, simulando interacciones como clics o escritura. 
**Jest** es el framework de testing que ejecuta las pruebas, proporciona funciones de aserción y permite crear mocks para validar comportamientos.

En este proyecto se usa junto con Jest para:

- ejecutar pruebas unitarias de componentes React
- simular interaccion real de usuario
- validar flujos exitosos y de error del buscador de clima

## 2. Componentes probados

Se probaron los siguientes componentes principales:

- `SearchForm`: formulario de entrada y disparo de busqueda
- `WeatherCard`: visualización de datos de clima (ciudad, temperatura, humedad y descripcion)

Adicionalmente, en pruebas de integracion ligera se valida el flujo en `WeatherSearchShell` para escenarios de éxito y error

## 3. Casos de prueba implementados

### SearchForm

- Renderizacion del input de ciudad
- Renderización del botón de busqueda
- Interaccion del usuario escribiendo en el input con `userEvent.type`
- Ejecucion de `onSearch` al enviar el formulario, validando que recibe la ciudad ingresada

### WeatherCard / flujo de clima

- Renderización correcta de datos en `WeatherCard`:
  - nombre de ciudad
  - temperatura
  - humedad
  - descripciom
- Renderizacion de clima exitoso tras busquedz (mock de API exitosa)
- Manejo de error cuando se busca una ciudad invalida (mock de API con rechazo)

## 4. Herramientas utilizadas

- **Jest**: runner de pruebas, mocks y assertions
- **React Testing Library**: renderizado de componentes y consultas accesibles
- **userEvent**: simulación de interacciones reales de usuario
- **screen**: consultas del DOM desde la perspectiva del usuario
- **render**: montaje de componentes en entorno de pruebas

## 5. Cómo ejecutar los tests

Ejecutar pruebas:

```bash
npm run test
```

Ejecutar cobertura:

```bash
npm run test:coverage
```

## 6. ¿Que validan las pruebas?

Las pruebas validan los comportamientos críticos del buscador de clima

- que el formulario está disponible y usable
- que el usuario puede ingresar una ciudad y disparar la búsqueda
- que la UI muestra correctamente los datos de clima cuando la API responde bien
- que la UI informa correctamente errores cuando la ciudad no existe

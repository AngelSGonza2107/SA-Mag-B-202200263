# API de tienda e inventario

API REST desarrollada con Node.js, Express y TypeScript. Permite registrar productos,
ventas y reabastecimientos, además de consultar el inventario actual.

Los datos se guardan **en memoria** porque el alcance no especifica una base de datos.
Al reiniciar el proceso se vacían. La dependencia de persistencia está detrás de
interfaces, por lo que puede reemplazarse por PostgreSQL, MySQL u otra tecnología sin
cambiar los casos de uso.

## Requisitos y ejecución

- Node.js 20 o superior
- npm

```bash
npm install
npm run dev
```

La API estará disponible en `http://localhost:3000`. Para compilar y ejecutar la
versión de producción:

```bash
npm run build
npm start
```

## Endpoints

### Registrar un producto

`POST /api/productos`

```json
{
  "descripcion": "Teclado mecánico",
  "precio": 350.50,
  "existenciasIniciales": 10
}
```

`existenciasIniciales` es opcional y vale `0` por defecto. `disponible` se devuelve
como `true` cuando las existencias son mayores que cero.

### Registrar una venta

`POST /api/ventas`

```json
{
  "items": [
    { "productoId": "UUID-DEL-PRODUCTO", "cantidad": 2 }
  ]
}
```

Una venta puede contener uno o varios productos. Si falta un producto o no existen
suficientes unidades, se rechaza toda la operación y el inventario no cambia.

### Reabastecer uno o varios productos

`POST /api/reabastecimientos`

```json
{
  "items": [
    { "productoId": "UUID-DEL-PRIMER-PRODUCTO", "cantidad": 5 },
    { "productoId": "UUID-DEL-SEGUNDO-PRODUCTO", "cantidad": 8 }
  ]
}
```

### Listar productos e inventario

`GET /api/inventario` o `GET /api/productos`

La respuesta incluye cada producto, sus existencias, su disponibilidad y un resumen
con el total de productos y unidades.

### Estado del servicio

`GET /salud`

## Validaciones principales

- Descripción entre 2 y 200 caracteres.
- Precio positivo con un máximo de 2 decimales.
- Existencias y cantidades enteras no negativas.
- Cantidades de venta y reabastecimiento mayores que cero.
- Una venta nunca permite dejar existencias negativas.
- Los productos repetidos en `items` se agrupan antes de procesar la operación.

## Diseño y principios SOLID

- `domain`: entidades, errores e interfaces de repositorios.
- `application`: casos de uso y puertos, independientes de Express.
- `infrastructure`: UUID y persistencia concreta en memoria.
- `presentation`: controladores y manejo HTTP.

Los casos de uso tienen una sola responsabilidad y dependen de abstracciones. La
composición de dependencias ocurre en `src/app.ts`, haciendo posible sustituir las
implementaciones sin modificar las reglas del negocio.

## Pruebas

```bash
npm test
npm run typecheck
```

Las pruebas cubren el descuento por venta, el rechazo por inventario insuficiente y
el reabastecimiento de varios productos.

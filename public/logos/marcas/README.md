# Logotipos de las marcas representadas

Un archivo por marca, con el nombre exacto del `slug` que aparece en
`src/datos/marcas.ts`. Si el archivo no está, la página cae a la marca
tipográfica: nunca a un ícono genérico ni a un rectángulo vacío.

| Archivo esperado      | Marca        |
|-----------------------|--------------|
| `tuttnauer.svg`       | Tuttnauer    |
| `sanqiang.svg`        | Sanqiang     |
| `servimedical.svg`    | Servimedical |
| `2i.svg`              | 2i           |
| `akarmak.svg`         | Akarmak      |
| `celitron.svg`        | Celitron     |

## Formato

- **SVG** con fondo transparente. Es el formato que se sirve.
- Si no hay SVG, **PNG a 2× con fondo transparente, mínimo 480 px de ancho**,
  y se cambia la extensión en `logo.src` dentro de `src/datos/marcas.ts`.
- Una sola versión por marca, en color. El gris de reposo lo aplica el
  componente `BrandLogo`; no se suben versiones en escala de grises.

## Qué logo subir

El **logotipo oficial del fabricante**, tal como lo publica en su manual de
marca o en su sitio. No se redibuja, no se recolorea y no se rehace un logo
de fabricante: o es el suyo, o no es.

## Peso óptico

Un logo horizontal y uno cuadrado no pesan igual a la misma altura de caja.
Si uno queda visiblemente más grande o más pequeño que el resto, se corrige
con `logo.escala` en `src/datos/marcas.ts` (`1` es el tamaño natural; `0.85`
lo reduce, `1.15` lo agranda). No se recorta el archivo para compensar.

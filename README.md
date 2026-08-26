# Servimedical Group — sitio web

**Estado: paso 1 — esqueleto navegable.** Las 24 rutas existen, la navegación
funciona de punta a punta y no hay enlaces muertos. El contenido y los
componentes de página llegan en el paso 2; todo lo pendiente está marcado con
`{{ POR CONFIRMAR }}` o `{{ CONTENIDO PENDIENTE — paso 2 }}`.

```bash
grep -rn "POR CONFIRMAR\|CONTENIDO PENDIENTE" src
```

---

## Stack

Astro · TypeScript estricto · `output: 'static'` · Tailwind CSS 4 · sin
librerías de componentes. JavaScript sólo en el panel de productos y el menú
móvil; todo lo demás es HTML estático.

> **Nota sobre la versión de Astro.** El pliego pedía Astro 5; el proyecto usa
> **Astro 7**, que es la versión vigente y la que ya estaba instalada. Todo lo
> especificado (salida estática, TS estricto, Tailwind 4, `@fontsource`)
> funciona igual en ambas. Si se prefiere 5 por alguna dependencia externa:
> `npm i astro@5`.

### Requisitos

Node **22.12 o superior**. El repositorio trae `.nvmrc`.

```bash
nvm use && npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (es lo que corre Vercel)
npm run check     # verificación de tipos
npm run verify    # check + build, antes de hacer push
npm run preview   # sirve dist/ tal como quedará en producción
```

`build` no incluye `check` a propósito: un aviso de tipos no debe tumbar un
deploy de producción.

---

## Estructura

```
src/
  content/
    navegacion.ts     ← FUENTE ÚNICA DE VERDAD de toda la navegación
    sitio.ts          ← datos de contacto y textos globales
  components/
    Header.astro  NavEscritorio.astro  PanelProductos.astro
    MenuMovil.astro  Footer.astro  Migas.astro  Logo.astro
  layouts/
    Base.astro        ← html, head, header, footer
    Pagina.astro      ← página interna, con migas
  pages/
    index.astro       ← home
    [...ruta].astro   ← genera las 23 páginas internas desde navegacion.ts
    404.astro
  styles/global.css   ← Tailwind 4: tokens, base y utilidades
```

### `navegacion.ts` manda

Header, panel de productos, menú móvil, pie, migas, sitemap y las 24 páginas
salen de ese archivo. **No hay ningún enlace de navegación escrito a mano en
una plantilla.** Añadir un nodo crea su página, su entrada de menú, su lugar
en el pie y su fila en el sitemap sin tocar nada más.

Funciones derivadas: `rutaActiva(url)` devuelve la cadena de ancestros —la
usan el estado activo y las migas—, más `esActivo`, `todosLosNodos`,
`columnaFooter` y `normalizar`.

`normalizar()` quita el `.html` del pathname: con `build.format: 'file'`,
`Astro.url.pathname` llega como `/productos/mobiliario.html` durante la
generación y sin eso no casaría con ningún nodo del árbol.

### Cuando llegue el contenido (paso 2)

Basta con crear el archivo de la ruta concreta —por ejemplo
`src/pages/productos/esterilizacion.astro`—. Astro da prioridad a la ruta
estática sobre `[...ruta].astro`, así que la página nueva sustituye a la
provisional sin refactorizar nada.

---

## Decisiones que conviene revisar

- **Panel de productos.** El pliego dice «cuatro columnas» y después «la
  quinta columna es un bloque de cierre», que no cuadran con cinco
  categorías. Implementado como rejilla de **cuatro columnas**: las cinco
  categorías en orden y el bloque de cierre ocupando el resto de la segunda
  fila. Si se quería otra cosa, es un cambio de una clase.
- **Trazabilidad en el pie.** El mapa del pie sólo nombra las cinco
  categorías en la columna de productos. Trazabilidad, por ser pilar propio y
  no categoría de producto, quedó en la columna «Servicios y compañía».
- **Ancla del ciclo.** El pliego escribe `/#/ciclo`; se interpretó como
  `/#ciclo`. La home ya trae la sección con ese `id` para que el enlace del
  panel no quede muerto.
- **Corte del menú móvil.** 1000 px, según el pliego. Se hizo redefiniendo
  `--breakpoint-lg` en `@theme` para que todo el sitio use un único umbral.
- **`IBM Plex Mono` no tiene versión variable** en Fontsource: se usan los
  pesos estáticos 400/500/600. Archivo e IBM Plex Sans sí son variables.
- **`og.png`** viene del trabajo anterior y sigue referenciado en `Base.astro`.
  Su titular es contenido y habrá que revisarlo en el paso 2. El generador
  está en el commit `d465a53`.

---

## Deploy en Vercel

`vercel.json` fija build, salida, `cleanUrls`, el **301 de
`/productos/trazabilidad` → `/trazabilidad`** y las cabeceras de seguridad.

Las URLs no llevan barra final: `build.format: 'file'` más `cleanUrls` las
sirve tal cual, sin saltos de redirección. La entrada `redirects` de
`astro.config.mjs` existe sólo para que la redirección también funcione en
`dev` y `preview`; en producción manda la de Vercel, que sí es un 301 real.

Los despliegues de preview salen con `noindex` para no competir con el
dominio.

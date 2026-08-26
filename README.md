# Servimedical Group — sitio web

Sitio estático de **Servimedical Group SAS** (Bogotá, Colombia): equipamiento
hospitalario y centrales de esterilización.

Construido con [Astro](https://astro.build) sin framework de UI: HTML y CSS
propios, cero JavaScript de terceros, fuentes autoalojadas. Las tres piezas
gráficas del sitio —la carta de ciclo, el anillo de seis estaciones y la
etiqueta de trazabilidad— son SVG hechos a mano, no imágenes.

---

## Requisitos

Node **22.12 o superior**. El repositorio trae `.nvmrc`:

```bash
nvm use
```

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera dist/  (es lo que corre Vercel)
npm run check     # verificación de tipos
npm run verify    # check + build, antes de hacer push
npm run preview   # sirve dist/ tal como quedará en producción
npm run og        # regenera public/og.png
```

`build` no incluye `check` a propósito: un aviso de tipos no debe tumbar un
deploy de producción. Para eso está `verify`, que es lo que conviene correr
antes de subir cambios.

---

## Estructura

```
scripts/og.mjs        ← generador de la tarjeta para compartir
public/
├─ fonts/             ← Archivo + IBM Plex (subconjunto latino, OFL)
├─ img/productos/     ← fotos de las familias de producto
└─ og.png             ← generado, no editar a mano
src/
├─ data/
│  ├─ site.ts         ← contacto, menú, MARCAS, sectores
│  └─ catalogo.ts     ← LÍNEAS DE NEGOCIO (fuente única de verdad)
├─ styles/global.css  ← tokens, tipografía y primitivas
├─ components/        ← Header, Footer, formulario y piezas gráficas
├─ layouts/Base.astro
└─ pages/
   ├─ index · nosotros · contacto · 404
   ├─ productos/index  ·  productos/[slug]
   ├─ servicios/index  ·  servicios/[slug]
   └─ marcas/[slug]
```

### Dónde se edita el contenido

Casi todo el texto vive en **`src/data/catalogo.ts`** y **`src/data/site.ts`**.
Alimentan a la vez el menú, la home, las páginas de detalle, el pie y el
sitemap. Las cifras que muestra el sitio («6 marcas», «5 categorías», «6 / 6
estaciones») **se calculan desde esos datos**: no hay que actualizarlas a mano.

- `productos[]` → las categorías de la Línea 1 → crean `/productos/<slug>/`
- `servicios[]` → los servicios de la Línea 2 → crean `/servicios/<slug>/`
- `marcas[]` → cada marca crea su `/marcas/<slug>/`, su fila en Nosotros, su
  lugar en la cinta y en el pie
- `ciclo[]` → las seis estaciones del anillo interactivo

La relación marca ↔ producto **no se escribe dos veces**: vive en el campo
`marcas` de cada familia, y las páginas de marca la consultan con
`porMarca()` y `estacionesDeMarca()`.

### Fotos de producto

Cada familia acepta `imagen` e `imagenAlt`. Si no tiene foto, la ficha se
muestra sólo con texto y no se rompe nada — se pueden ir llenando de a poco.
Formato y convención de nombres en `public/img/productos/README.md`.

### Dónde se edita el diseño

`src/styles/global.css`. Los tokens del bloque `:root` gobiernan todo el sitio.

| Token         | Valor     | Uso                                   |
|---------------|-----------|---------------------------------------|
| `--navy`      | `#26416B` | Color institucional, texto, campos     |
| `--navy-deep` | `#1B3050` | Pie de página, estados hover           |
| `--steel`     | `#395A85` | Texto secundario                       |
| `--blue`      | `#446791` | Trazos y detalles                      |
| `--mist`      | `#DBDBDB` | Trazo inerte                           |
| `--paper`     | `#F2F5F8` | Fondo de sección alterna               |
| `--signal`    | `#89D800` | Acento único: marca estado, no decora  |

Tipografías: **Archivo** (títulos), **IBM Plex Sans** (texto) e **IBM Plex
Mono** (metadatos). Se sirven desde `/fonts/`, no desde Google Fonts.
Procedencia y licencia en `public/fonts/LICENSE.txt`.

---

## Formulario de cotización

`/contacto/` arma la solicitud y la entrega por WhatsApp —el canal real de
este negocio— con el correo como alternativa. **No hay servidor detrás:** los
datos no salen del navegador hasta que la persona pulsa el botón, y no se
envían a ningún tercero.

Si más adelante quieren que la solicitud quede registrada (CRM, hoja de
cálculo o correo automático), hay que añadir una función serverless en
`api/` y las credenciales del proveedor de correo. El componente
`FormularioCotizacion.astro` ya construye el objeto de datos.

---

## Deploy en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project → Import**.
3. `vercel.json` fija build, salida, barra final, cabeceras de seguridad y
   caché inmutable de `_astro/` y `fonts/`.
4. Al conectar el dominio, revisar `site` en `astro.config.mjs`: de ahí salen
   la URL canónica, el `og:url` y el `sitemap.xml`.

**Analítica.** El sitio carga Vercel Web Analytics sólo en producción. Hay que
activarla una vez en el panel del proyecto (*Analytics → Enable*); mientras no
se active, el script simplemente no registra nada.

**Previews.** Los despliegues de preview salen con `noindex` y sin analítica,
para que no compitan en Google con el dominio real.

---

## Pendiente de decisión del cliente

- **Celitron y Easy Medical** aparecen en el sitio en producción y no están
  aquí. Agregarlas es añadir una entrada a `marcas[]` en `src/data/site.ts`:
  la página, el menú y las cifras se actualizan solas.
- **Trazabilidad** está como categoría 1.2 de Productos. Si se prefiere que
  no sea categoría propia, se mueve como familia dentro de Equipos.
- **Origen y año de representación** de cada marca: los campos `origen` y
  `desde` existen en `src/data/site.ts` y están vacíos a propósito, para no
  publicar datos de fábrica sin confirmar. Si tienen valor, se muestran solos.
- **Cifras de credibilidad** (años de operación, equipos instalados, clientes
  atendidos). Hoy la página de Nosotros sólo tiene cifras cualitativas.

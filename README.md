# Servimedical Group — sitio web

Sitio estático de **Servimedical Group SAS** (Bogotá, Colombia): equipamiento
hospitalario y centrales de esterilización.

Construido con [Astro](https://astro.build) sin framework de UI: HTML y CSS
propios, cero JavaScript de terceros. Las tres piezas gráficas del sitio —la
carta de ciclo, el anillo de seis estaciones y la etiqueta de trazabilidad—
son SVG hechos a mano, no imágenes.

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
npm run build     # verifica tipos y genera dist/
npm run preview   # sirve dist/ tal como quedará en producción
```

---

## Estructura

```
src/
├─ data/
│  ├─ site.ts        ← contacto, menú, marcas, sectores
│  └─ catalogo.ts    ← LÍNEAS DE NEGOCIO (fuente única de verdad)
├─ styles/
│  └─ global.css     ← tokens de color, tipografía y primitivas
├─ components/       ← Header, Footer, y las piezas gráficas propias
├─ layouts/Base.astro
└─ pages/
   ├─ index.astro
   ├─ nosotros.astro
   ├─ contacto.astro
   ├─ 404.astro
   ├─ productos/index.astro   ·  productos/[slug].astro
   └─ servicios/index.astro   ·  servicios/[slug].astro
```

### Dónde se edita el contenido

Casi todo el texto del sitio vive en **`src/data/catalogo.ts`**. Ese archivo
alimenta a la vez el menú, la home, las páginas de detalle, el pie de página y
el sitemap. Agregar una categoría de producto ahí crea su página, su entrada en
el menú y su enlace en el pie **sin tocar ninguna plantilla**.

- `productos[]` → las cinco categorías de la Línea 1
- `servicios[]` → los dos servicios de la Línea 2
- `ciclo[]` → las seis estaciones del anillo interactivo

Los datos de contacto y las marcas representadas están en `src/data/site.ts`.

### Dónde se edita el diseño

`src/styles/global.css`. Los tokens del bloque `:root` gobiernan todo el sitio:
cambiar `--navy` o `--signal` ahí cambia el color en todas las páginas.

| Token       | Valor     | Uso                                    |
|-------------|-----------|----------------------------------------|
| `--navy`    | `#26416B` | Color institucional, texto, campos      |
| `--navy-deep` | `#1B3050` | Pie de página, estados hover           |
| `--steel`   | `#395A85` | Texto secundario                        |
| `--blue`    | `#446791` | Trazos y detalles                       |
| `--mist`    | `#DBDBDB` | Trazo inerte                            |
| `--paper`   | `#F2F5F8` | Fondo de sección alterna                |
| `--signal`  | `#89D800` | Acento único: marca estado, no decora   |

Tipografías: **Archivo** (títulos, eje de ancho variable), **IBM Plex Sans**
(texto) e **IBM Plex Mono** (metadatos e índices). Se cargan desde Google Fonts.

---

## Deploy en Vercel

El proyecto está listo para Vercel sin configuración adicional.

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project → Import** el repositorio.
3. Vercel detecta Astro solo. `vercel.json` ya fija el build, el directorio de
   salida, las cabeceras de seguridad y el caché de los assets.
4. Al conectar el dominio, actualizar `site` en `astro.config.mjs` si cambia —
   de ahí salen la URL canónica y el `sitemap.xml`.

---

## Notas

- `.claude/launch.json` apunta a una ruta absoluta de Node para el servidor de
  desarrollo local. No afecta el build ni el deploy.
- El sitio es 100 % estático: no hay backend, base de datos ni formularios que
  guarden datos. El contacto se resuelve por WhatsApp, teléfono y correo.

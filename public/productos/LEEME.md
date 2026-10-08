# Fotos y brochures de producto

Una carpeta por producto, con el nombre `{marca}-{slug}`. Mientras falte una
foto, el hero del producto va a una sola columna y la franja de datos ocupa el
ancho: no se rompe nada y no aparece ningún hueco. Se pueden subir de a uno.

Para ver qué falta:

```bash
npm run media
```

---

## 1. Dónde va cada archivo

```
public/productos/{marca}-{slug}/
  foto.webp          ← la principal
  galeria-1.webp     ← opcional, hasta galeria-4
  brochure.pdf       ← opcional
```

Las carpetas, con el nombre exacto:

| Carpeta | Producto |
|---|---|
| `tuttnauer-autoclaves` | Autoclaves hospitalarios Tuttnauer |
| `tuttnauer-baja-temperatura` | PlazMax |
| `tuttnauer-termodesinfectoras` | TIVA |
| `sanqiang-autoclaves` | Serie MD.JD |
| `sanqiang-baja-temperatura` | SQ-WD |
| `sanqiang-termodesinfectoras` | SQ-KX y SQ-X360 |
| `sanqiang-residuos-hospitalarios` | Tratamiento de residuos Sanqiang |
| `celitron-residuos-hospitalarios` | ISS |
| `akarmak-residuos-hospitalarios` | AKR |
| `2i-indicadores-quimicos` | Indicadores químicos 2i |
| `2i-indicadores-biologicos` | Indicadores biológicos 2i |
| `svm-papel-para-esterilizacion` | Papel para esterilización y Tyvek |
| `svm-mobiliario-acero-inoxidable` | Mobiliario en acero inoxidable |
| `svm-repuestos` | Repuestos originales |

---

## 2. Cómo debe ser la foto

- **1600 × 1200 px**, proporción 4:3. Si llega más grande, no importa: se
  escala sola.
- **Fondo neutro**: blanco o gris muy claro. Nada de fotos de quirófano con el
  equipo al fondo.
- **El equipo entero**, centrado, sin recortes ni marcas de agua.
- **Formato `.webp`.** Si solo tiene `.jpg` o `.png`, sirve: cambie la
  extensión en el nombre del archivo y listo.
- Por debajo de **400 kB**. `npm run media` le avisa si se pasa.

De dónde sacarlas, en este orden: el kit de prensa del fabricante, la ficha
técnica en PDF (muchas traen la foto en alta), o pedírsela al contacto
comercial del fabricante.

---

## 3. El brochure

Es el PDF oficial del fabricante. `npm run media` imprime el enlace de
descarga de cada uno: ábralo, descárguelo, renómbrelo a `brochure.pdf` y
póngalo en la carpeta del producto.

Una vez esté el archivo, hay que declararlo en `src/datos/productos.ts`, en el
producto correspondiente:

```ts
media: {
  foto: '/productos/tuttnauer-baja-temperatura/foto.webp',
  brochure: {
    url: '/productos/tuttnauer-baja-temperatura/brochure.pdf',
    titulo: 'PlazMax · ficha técnica',
    pesoKB: 1240,
  },
},
```

El peso en kB lo da `npm run media` una vez el archivo está en la carpeta.

---

## 4. Cómo publicarlo

```bash
npm run media
```

```bash
npm run dev
```

Revise en http://localhost:4321 cómo quedó el producto. Cuando esté conforme:

```bash
git add public/productos src/datos/productos.ts
```

```bash
git commit -m "Agregar fotos y brochures de producto"
```

```bash
git push
```

---

## Resumen

1. Cree la carpeta `public/productos/{marca}-{slug}/`.
2. Meta `foto.webp` y, si lo tiene, `brochure.pdf`.
3. Declare las rutas en `media` dentro de `src/datos/productos.ts`.
4. `npm run media`, revise con `npm run dev`, y `git push`.

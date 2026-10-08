# Decisiones

Bitácora de lo que se resolvió por cuenta propia cuando la instrucción admitía
más de una lectura. Cada entrada dice qué se hizo, por qué, y cómo deshacerlo.

---

## 0 · Reconocimiento del repositorio

### Stack

- **Astro 7.2.7**, `output: 'static'`, `build.format: 'file'`, `trailingSlash: 'never'`.
  El sitio se compila a HTML plano; no hay servidor en producción salvo la
  función de correo del formulario.
- **Tailwind CSS 4** por `@tailwindcss/vite`, con tokens en `@theme` y utilidades
  propias en `@utility` (`senal`, `rejilla`, `deslizable`, `field-paper`).
- **zod** para validar los datos en tiempo de compilación.
- **TypeScript 6**. `npm run check` corre `astro check`.

### Dónde viven los datos

Todo el catálogo son módulos de TypeScript en `src/datos/`, no JSON. La razón
es que así cada campo puede llevar al lado un comentario `// TODO` o
`// VERIFICAR` diciendo qué falta confirmar y con qué fuente — en JSON eso no
cabe, y `npm run marcadores` los inventaría leyendo estos mismos comentarios.

| Archivo | Qué guarda |
|---|---|
| `src/datos/tipos.ts` | Las formas: `Marca`, `Linea`, `Producto`, `TablaModelos`, `Spec`. |
| `src/datos/marcas.ts` | Las marcas, su orden, su logo y las etapas del ciclo que cubren. |
| `src/datos/lineas.ts` | Los métodos, con `comoFunciona`, compatibilidades, normas y preguntas frecuentes. |
| `src/datos/productos.ts` | Lo que vende cada marca dentro de cada método, con modelos, normas y venta cruzada. |

Un cargador propio (`src/content.config.ts`) expone esos módulos como
colecciones de Astro y los valida con zod sobre los mismos arreglos, así que
no hay dos verdades.

### Cómo se generan las rutas

Las tres plantillas dinámicas derivan sus rutas de los datos:

- `src/pages/lineas/[linea].astro` → una por línea **con más de un producto**
  (`lineaTienePagina`). Una línea con un solo producto no tiene página: su
  enlace va directo al producto, para que la miga no pase por una redirección.
- `src/pages/marcas/[marca].astro` → una por marca.
- `src/pages/marcas/[marca]/[producto].astro` → una por producto publicado.

`src/content/navegacion.ts` deriva de ahí el árbol que alimenta navbar, mega
menú, pie, migas, buscador y sitemap. Agregar un producto en `src/datos/` lo
publica en los seis sitios sin tocar nada más.

Las validaciones que **rompen la compilación** (a propósito) viven en
`integraciones/validar-ciclo.mjs`: frases prohibidas, máximo tres destinos de
venta cruzada, máximo cuatro líneas por marca en el desplegable, ninguna línea
vacía, ningún enlace a sí mismo, coherencia entre las etapas que declara una
marca y las que cubren sus productos, y filas de modelos que cuadren con sus
encabezados.

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run logos` | Recorta y convierte los logos de marca a PNG + WebP + una versión de 280 px. También prepara el logotipo de la empresa. |
| `npm run media` | Revisa las fotos de producto de `public/productos/`. |
| `npm run hero` | Revisa el carrusel de la portada, empareja cada archivo con su ficha y genera las versiones por ancho en `public/home/hero/w/`. |
| `npm run marcadores` | Inventario de todo lo que quedó marcado como pendiente de confirmar. |
| `npm run redirecciones` | Genera las redirecciones 301 para `vercel.json`. |
| `npm run capturas antes\|despues` | Capturas de control de calidad (nuevo, ver abajo). |

Todos pasan por `herramientas/correr.mjs`, que vuelve a lanzar el proceso bajo
un Node 22 de nvm cuando la terminal está en Node 18, porque importan `.ts`
directamente.

### Componentes de navegación

- `src/components/Header.astro` — la barra. Contiene el logotipo, la navegación
  de escritorio, el buscador y el botón de contacto.
- `src/components/NavEscritorio.astro` — los enlaces de primer nivel y los dos
  disparadores de panel (`aria-controls="panel-lineas"` y `"panel-marcas"`).
- `src/components/PanelMenu.astro` — el mega menú. Se oculta con `visibility`,
  no con `display`, para que los enlaces salgan del orden de tabulación sin
  perder la transición. Abre al pasar el puntero; el clic solo alterna en
  táctil o por teclado.
- `src/components/MenuMovil.astro` — el menú del teléfono, independiente.

### Hero y barra de marcas

- `src/components/hero/Hero.astro` — titular, texto, botones y el recuadro con
  el equipo. Si `public/home/hero/` tiene más de una foto, el recuadro se
  vuelve carrusel; si no, sirve la imagen única de `public/hero/`.
- `src/lib/heroImagen.ts` — resuelve qué imágenes hay, las empareja con su
  ficha por el nombre del archivo (`{marca}-{slug}`) y arma el `srcset`.
- `src/components/marca/FranjaMarcas.astro` — la banda de logos bajo el hero.
- `src/components/marca/BrandLogo.astro` — pinta un logo de marca con su
  escala óptica y va cayendo de `.webp` a `.svg` a `.png` al nombre
  tipográfico si no encuentra archivo.

### Página de servicios

`src/pages/servicios.astro`, 45 líneas. Hoy es una lista de servicios con un
formulario al final. Es la página más pobre del sitio y la que el bloque 2.4
reconstruye.

---

## Decisiones

### D1 · Playwright como dependencia de desarrollo

**Qué.** Se instaló `playwright` (solo Chromium) y se creó
`herramientas/capturas.mjs` con el comando `npm run capturas antes|despues`.

**Por qué.** El encargo pide capturas de control de calidad a 375, 768 y
1440 px antes y después. No había ningún navegador headless en el proyecto.

**Cómo revertirlo.** `npm rm -D playwright` y borrar `herramientas/capturas.mjs`
y la entrada `capturas` de `package.json`. Las capturas ya tomadas quedan en
`qa/` y no dependen del paquete.

**Nota.** El guion no levanta el servidor: espera encontrarlo en marcha. Si lo
levantara él y fallara a mitad, dejaría un proceso huérfano ocupando el 4321 —
que es justo el problema que hubo esta semana.

### D2 · El v3 entra al repositorio

**Qué.** `svmg-catalogo-contenido-v3.md` se copió a `docs/`.

**Por qué.** El encargo lo declara fuente de verdad del catálogo y pide no
publicar nada marcado ⚠. Si vive en la carpeta de descargas de una persona, no
es fuente de verdad de nada.

**Cómo revertirlo.** Borrar `docs/svmg-catalogo-contenido-v3.md`.

### D3 · El campo de escala óptica se sigue llamando `logoEscala`

**Qué.** El encargo pide un factor `escalaLogo`. Ya existía `logoEscala` en
`src/datos/tipos.ts`, usado por `BrandLogo.astro`.

**Por qué.** Renombrarlo solo cambiaría la palabra: mismo significado, mismo
valor por defecto de `1`, y tocaría todos los sitios que lo leen sin ganar
nada. El resto del código está en español con el sustantivo primero
(`logoEscala`, `etapasCiclo`, `fuenteBrochure`), así que `escalaLogo` sería la
excepción, no la regla.

**Cómo revertirlo.** Un renombrado mecánico en `tipos.ts`, `marcas.ts` y
`BrandLogo.astro`.

### D4 · ⚠ Conflicto: los logos de marca en color o en escala de grises

**Qué.** El encargo (§1.1) pide los logos «en escala de grises con opacidad
0,7 y a color con opacidad 1 en hover o foco», y añade «si eso ya existe,
mantenlo». **Se dejaron en color**, como están hoy.

**Por qué.** Esa frase da por hecho que el sitio ya está en escala de grises.
No lo está, y no lo está por una instrucción explícita de Felipe el 8 de
octubre: «deja los logos de las marcas en color en la página principal **y en
todas**». Esa instrucción ya había revertido una decisión anterior en el
sentido contrario. Cambiarlo ahora sería deshacer una orden directa apoyándose
en una condicional que describe mal el estado actual.

**Esto necesita que Felipe lo zanje.** Si quiere la escala de grises, es un
cambio de dos líneas en `BrandLogo.astro`.

**Cómo revertirlo.** Añadir `filter: grayscale(1); opacity: .7` al logo y
quitarlo en `:hover, :focus-visible`.

---

## 1 · Página principal

### D5 · La franja normaliza por altura, no por caja

**Qué.** `BrandLogo.astro` pasó de una caja de ancho fijo con `object-fit:
contain` a fijar el **alto** y dejar que el ancho salga de la proporción del
archivo. El ancho queda solo como tope de seguridad.

**Por qué.** Con caja fija, Akarmak —de proporción 7,4:1— se ajustaba por el
ancho y salía a **27 px de alto** mientras 2i salía a 46. Ninguna escala
óptica arregla eso, porque el problema era geométrico, no de peso visual.

**Escalas calibradas** (medidas sobre el render, no a ojo). Altura pintada
resultante en escritorio:

| Marca | `logoEscala` | Alto | Por qué |
|---|---|---|---|
| Tuttnauer | 0,85 | 37 px | Palabra sola y ancha: a la altura nominal pesa más que un símbolo. |
| Sanqiang | 1,25 | 55 px | Símbolo sobre texto diminuto. Es el que el encargo señalaba como pequeño. |
| Celitron | 1,05 | 46 px | La bajada «medical technologies» es muy pequeña. |
| Akarmak | 0,80 | 35 px | Proporción 7,4:1; a la altura nominal se comía la franja. |
| 2i | 1,15 | 51 px | Símbolo circular pequeño dentro de un lienzo casi cuadrado. |
| SVM | 1,00 | 44 px | Referencia. |

**Los archivos no se tocaron.** Se comprobó con `sharp` que los seis ya vienen
sin margen transparente: `npm run logos` los recorta al generarlos. La
pequeñez de Sanqiang no venía de márgenes.

### D6 · La franja se centra en el espacio libre, no en el contenedor

**Qué.** Los logotipos se centran con hueco fijo (`justify-content: center`),
pero dentro del espacio que deja el rótulo «MARCAS QUE REPRESENTAMOS», que
sigue a la izquierda.

**Por qué.** Centrarlos en el contenedor completo los metería debajo del
rótulo. La alternativa —subir el rótulo a una línea propia— añade alto al
primer pantallazo, y Felipe pidió expresamente que la franja quepa en lo que
se ve sin desplazar.

**Cómo revertirlo.** Poner `.franja-caja { flex-direction: column }` también en
escritorio.

### D7 · En móvil la franja sigue siendo un carril deslizable

**Qué.** Se mantuvo el carril horizontal con enganche en vez de pasar a dos o
tres columnas.

**Por qué.** Ya estaba implementado con la utilidad `deslizable` del proyecto,
que además fija `scroll-padding-inline` —sin eso el enganche se come la
sangría—. Una rejilla de dos columnas con seis logotipos de proporciones tan
distintas (de 1,05 a 7,4) deja huecos muy desiguales.

### D8 · La tarjeta de marca pierde el subtítulo en la home **y** en /marcas

**Qué.** Se quitó el descriptor («Esterilización y desinfección térmica», etc.)
de `TarjetaMarca.astro`. Se conservaron los enlaces a las líneas de esa marca
y el «Ver marca →».

**Por qué.** El componente es uno solo y lo usan las dos páginas; dejar el
subtítulo en una y no en la otra obligaría a duplicarlo. Los enlaces a línea no
son subtítulo descriptivo: son el camino más corto a un producto, y el bloque
2.3 pide reforzar justamente esa navegación.

**Cómo revertirlo.** Devolver el `<span>` con `{marca.descriptor}`.

### D9 · El horario deja de estar sin confirmar

**Qué.** `sitio.horario` pasó de `{{ POR CONFIRMAR }}` a «Servicio técnico 24/7
· Cotizaciones en horario hábil».

**Por qué.** El encargo declara el 24/7 como dato de la empresa y pide que todo
el sitio sea coherente con él. El formulario decía «Respondemos en horario
hábil», que lo contradecía de frente.

Se separan los dos relojes a propósito: la avería se atiende a cualquier hora,
la cotización no. Decirlo junto evita que «24/7» se lea como que alguien cotiza
un domingo.

**Dónde se tocó:** `src/components/hero/Hero.astro` (subtítulo),
`src/components/formulario/Formulario.astro` (nota bajo el botón),
`src/content/sitio.ts` (dato de horario).

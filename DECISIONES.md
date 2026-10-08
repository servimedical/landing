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

---

## 2 · Navbar y estructura

### D10 · «Baja temperatura» en vez de «Plasma», y por qué el cambio es correcto

El encargo pide renombrar «Esterilización por plasma» a «Baja temperatura». No
es solo un nombre más corto: es más exacto. El plasma es **uno** de los
métodos de baja temperatura; el peróxido vaporizado sin fase de plasma y el
óxido de etileno también lo son. La línea queda abierta a lo que ya vende
Sanqiang y a lo que entre después, sin volver a renombrar.

Se añadió a las frases prohibidas (`src/content.config.ts`) para que nadie la
reintroduzca sin que el build se detenga.

### D11 · El empaque se funde en «Indicadores y empaque», y el producto declara su etapa

**Qué.** La línea `empaque` desaparece. Su producto —el papel y el Tyvek— pasa
a `indicadores`, que ahora se llama «Indicadores y empaque» en la página y
«Indicadores» en el menú (`nombreNav`).

**El problema técnico que destapó.** El validador deriva las etapas del ciclo
que cubre una marca a partir de las líneas de sus productos. Con una línea que
abarca dos etapas, el build exigía que 2i declarara «empaque» y SVM
«monitoreo» — o sea, que las dos marcas dijeran que venden algo que no venden.

**La solución.** `Producto.etapa` opcional. Solo hace falta cuando la línea
abarca varias: el papel declara `etapa: 'empaque'` y los indicadores heredan
`monitoreo` de la línea. El validador usa la etapa del producto.

La línea también declara `etapasAdicionales: ['empaque']`, que es lo que hace
cierta la afirmación de que cubre las dos.

**Tope de párrafos de 3 a 4.** `comoFunciona` estaba limitado a tres. Reunir
dos materias en una línea y explicarlas en tres párrafos obliga a apretarlas.
El tope sigue existiendo para que una línea no se vuelva un tratado.

### D12 · Las fotos del carrusel siguen valiendo con el nombre anterior

**Qué.** `src/datos/alias.ts` traduce los identificadores viejos
(`tuttnauer-vapor` → `tuttnauer-autoclaves`, `servimedical-*` → `svm-*`).
`npm run hero` acepta el nombre viejo, resuelve al nuevo y avisa **en
amarillo** de que conviene renombrar. También imprime la lista de nombres
válidos con la estructura nueva.

**Por qué.** Felipe subió las fotos del carrusel el mismo día del renombrado.
Romperle las imágenes por un cambio de nombre interno sería hacerle pagar a él
una decisión nuestra. El alias no es permanente: el día que los archivos estén
al día, se borra la entrada.

Las carpetas de `public/productos/` sí se renombraron, porque ahí no hay
archivos de por medio que alguien tenga que volver a subir.

### D13 · El desplegable de marcas muestra el logotipo

**Qué.** La cabecera de cada columna del mega menú de Marcas es el logotipo a
26 px de alto (tamaño `xs` nuevo), con el nombre como `aria-label`. Debajo
siguen los productos de esa marca como enlaces de texto.

**Por qué.** Quien llega buscando Tuttnauer reconoce el rojo antes que la
palabra.

### D14 · El menú móvil **sí** tenía Tuttnauer

El encargo (§3.2) pide corregir el menú móvil «al que hoy le falta Tuttnauer».
Se verificó con Playwright a 375 px: el menú lista las seis marcas, Tuttnauer
incluida, con sus tres productos. **No había nada que corregir.** El reporte
viene de un despliegue viejo; el sitio nunca se ha publicado, así que lo que
se esté mirando no corresponde al código actual.

Lo mismo pasó en la ronda anterior con la supuesta fila «Fabricante» del hero
de producto, que tampoco existía.

### D15 · Se quitó la muleta «Autoclaves de vapor»

El menú traducía el producto llamado «Autoclaves» a «Autoclaves de vapor» para
que no se confundiera con el nombre de la línea, que era «Esterilización por
vapor». Ahora la línea se llama «Autoclaves» y la muleta sobra: en el
desplegable de marcas se lee «Tuttnauer → Autoclaves», que es exacto.

---

## 3 · Mercado colombiano · 4 · Investigación

### D16 · Ningún dato eléctrico de fábrica se publica tal cual

Ver `docs/red-electrica-colombia.md`. Resumen de la regla:

- Si el fabricante declara 60 Hz o una tensión colombiana → se publica.
- Si declara solo 50 Hz, 380 V o 400 V → **no se publica la cifra**. Queda
  «Alimentación trifásica, configurada para la red de la institución (60 Hz)».
- Siempre se publica la potencia en kW o kVA, que es del equipo y no de la red,
  y es lo que necesita quien dimensiona una acometida.

Se retiraron tensiones europeas de once fichas. Quedan **siete confirmaciones
de 60 Hz** que pedirle a fábrica, listadas en el documento.

La excepción es Tuttnauer en autoclaves grandes: declara 208–415 V, y 208 V
**sí** es tensión normalizada colombiana. Esa se publica.

### D17 · Hongrun no entra al sitio

Ver `docs/investigacion/hongrun.md`. El catálogo es odontológico y de
laboratorio —los modelos se dimensionan por número de sillas odontológicas—,
no menciona central de esterilización, no declara ninguna norma de aire
medicinal (ni ISO 8573 ni HTM 02-01) y no publica una sola ficha técnica. Todo
lo encontrado está en 50 Hz.

El encargo (§4.3) preveía este desenlace: queda documentado y no se publica.

### D18 · Las reprocesadoras de Sanqiang tampoco, todavía

Ver `docs/investigacion/sanqiang-endoscopios.md`. Sanqiang **sí** fabrica
equipo de reprocesamiento de endoscopios, pero el sitio no publica un solo
dato técnico: ni endoscopios por ciclo, ni desinfectante, ni prueba de fugas,
ni ISO 15883-4, ni alimentación.

Hay además una confusión que hay que deshacer antes de escribir nada: el sitio
muestra **dos** categorías distintas —una lavadora-desinfectadora de
endoscopios (ISO 15883-4) y un esterilizador de ácido peracético (serie
SQ-CH)— y no son lo mismo. Publicarlas como una sola sería un error que un
jefe de central detecta de inmediato.

### D19 · De 2i solo es publicable la mini incubadora

Ver `docs/investigacion/2i-incubadoras.md`. La mini incubadora de 6 cavidades
tiene datos verificables (55–60 °C, bivolt 127/220 V, cámara de aluminio,
15 minutos de calentamiento). **El bivolt 127/220 V es buena noticia**: 127 V
es tensión normalizada colombiana.

Pero declara **50–58 Hz** y Colombia es 60 Hz. Dos hercios por fuera. En la
práctica un calentador resistivo funciona igual, pero «en la práctica» no se
publica: la frecuencia queda fuera de la ficha hasta que 2i lo confirme.

De las lectoras de 4 y 12 pozos **no se encontró ninguna ficha**, ni en el
fabricante ni en su distribuidor oficial.

### D20 · De EasySeal solo se publican las automáticas

Ver `docs/investigacion/easyseal.md`. El fabricante publica ficha técnica de
sus **seis selladoras automáticas** y de ninguna de las manuales ni de las
rotativas: hay nombre y fotografía, no hay dato.

Dos precisiones que cambian lo que se puede decir:

1. **EF122-A y EF058 declaran 110/220 V, 50/60 Hz.** Son los dos únicos
   equipos de todo el portafolio que declaran 60 Hz de fábrica. Esos sí se
   publican con su tensión.
2. **Las máquinas no declaran ISO 11607-2.** Declaran «función OQ» y la norma
   **china** WS 310.2-2016. La referencia a ISO 11607-2 del catálogo
   corresponde a la tarjeta de prueba EF351, que es un consumible. Decir
   «selladora ISO 11607-2» sería falso: la ISO 11607-2 obliga a validar el
   proceso, y quien valida es la institución.

### D21 · «Otros equipos» queda con dos productos, no con cinco

El encargo pide una línea nueva con selladoras EasySeal, reprocesadoras
Sanqiang, compresores Hongrun e incubadoras 2i. De los cuatro fabricantes,
**dos no tienen datos publicables** (Hongrun y Sanqiang) y uno los tiene a
medias (2i: la incubadora sí, las lectoras no).

La línea se crea con lo que sí se puede sostener. Las otras entradas quedan
documentadas con la lista exacta de lo que hay que pedirle a cada fabricante.

### D22 · «Otros equipos» nace con dos productos

La línea entra al menú en la posición 4, como pide el encargo, con lo único
que tiene datos verificables:

- **`easyseal/selladoras`** — las seis automáticas, con ficha del fabricante.
  Las manuales y las rotativas quedan fuera: hay nombre y foto, no hay dato.
- **`2i/incubadoras`** — la mini incubadora de seis cavidades. Las lectoras de
  4 y 12 pozos quedan fuera por lo mismo.

Faltan, documentadas: reprocesadoras Sanqiang (D18) y compresores Hongrun
(D17, descartados).

**EasySeal se pinta con su nombre, no con un logotipo.** No hay archivo
oficial y no se dibuja el logotipo de un fabricante. El componente cae solo a
la marca tipográfica.

**Una precisión que evita una afirmación falsa.** La ficha declara
«WS 310.2-2016» y «función de calificación operacional (OQ)», que es lo que
dice el fabricante. **No** dice ISO 11607-2: esa norma obliga a validar el
proceso de sellado y quien valida es la institución, no la máquina. La
referencia a ISO 11607-2 del catálogo de EasySeal corresponde a su tarjeta de
prueba, que es otro producto.

---

## Ronda de ajustes posterior

### D23 · Los logotipos se igualan por mancha de tinta, no por altura

**El error anterior.** D5 normalizaba por altura. Eso resolvió el caso
Akarmak —que salía a 27 px— pero dejó otro problema: dos logotipos de la
misma altura pesan distinto si uno es una palabra maciza y el otro un símbolo
con aire.

**Lo que se midió.** La densidad de cada archivo, es decir la proporción de
píxeles opacos sobre su caja recortada, y de ahí la superficie de tinta que
cada uno pinta en la franja:

| Marca | Densidad | Mancha | Escala |
|---|---|---|---|
| Tuttnauer | 0,32 | 1.357 px² | 1,00 — referencia |
| Sanqiang | 0,27 | 1.005 px² | 1,30 |
| Celitron | 0,44 | 1.633 px² | 1,16 |
| Akarmak | 0,53 | 4.757 px² | 0,67 |
| 2i | 0,79 | 2.142 px² | 1,19 |
| SVM | 1,00 | 3.608 px² | 0,90 |

**Por qué media corrección y no completa.** Igualar la mancha al 100 % llevaría
a Sanqiang a 1,94: casi el doble de alto que Tuttnauer, porque su logotipo es
un lockup apilado con mucho aire. Se aplica la **raíz cuarta** de la razón de
manchas en vez de la raíz cuadrada, y un tope de 1,30. Acerca los pesos sin
que ninguno se desborde de la fila.

Los archivos siguen sin tocarse: se comprobó con `sharp` que los seis vienen
recortados.

### D24 · Repuestos sale del menú de Líneas y sube al navbar

**Qué.** Entrada propia `/repuestos` en la barra, y fuera del desplegable de
Líneas. La línea sigue existiendo en los datos.

**Por qué no se pudo borrar del árbol.** De la rama de Líneas cuelgan las
rutas de producto, y de ahí salen las migas y la validación de enlaces:
filtrarla en el árbol dejó nueve enlaces de «completa el ciclo» apuntando a
rutas inexistentes y rompió el build. El filtro vive en `nodosLineas`, que es
la vista, no en `navegacion`.

**Por qué saltó al navbar.** Repuestos nunca fue un método de esterilización;
estaba en el menú de métodos porque no había otro sitio. Y es de lo que más
se busca con el equipo ya parado: tres clics era demasiado.

### D25 · Fuera el rótulo «03 · Esterilización»

Se eliminó `rotuloEtapa` y sus dos usos. Numerar las etapas sugiere una
secuencia obligatoria que no existe: una central no recorre las seis.

### D26 · Reprocesadoras de endoscopios, como línea propia

Entra en la posición 4, después de termodesinfectoras.

**Lo que se publica es el método, no la máquina.** La página de línea tiene
contenido completo —ISO 15883-4, prueba de fugas, irrigación de canales,
enjuague con agua tratada, elección del desinfectante— porque eso es
conocimiento del método y se sostiene solo.

**La ficha del producto va casi vacía a propósito.** Sanqiang no publica un
solo dato: no hay tabla de modelos, ni requisitos de instalación, ni normas
declaradas. Seis `TODO` dicen exactamente qué pedirle al fabricante. Ver D18.

### D27 · Correcciones de la revisión independiente

La revisión del §6.8 encontró once hallazgos. Los que eran reales:

1. **La Resolución 2183 de 2004 se citaba con tres cifras que nadie verificó**
   (18–22 °C, 35–70 % de humedad, revalidación cada doce meses), en cinco
   lugares. **El mensaje del commit de servicios afirmaba que no se citaba:
   era falso.** Se retiraron las tres cifras; la norma se sigue nombrando,
   que eso sí consta.
2. **A la Resolución 3100 se le atribuía un estándar de infraestructura** que
   la investigación no documenta. Reescrito.
3. **«Tyvek» en las selladoras** no está en ninguna ficha de EasySeal. Fuera.
4. **«Quince años» de vida útil** no tiene fuente — y el v3 ya había quitado
   un «cinco años» por lo mismo. Fuera.
5. **Dos productos de Sanqiang conservaban «220 V monofásico»**, que es justo
   la formulación que `docs/red-electrica-colombia.md` prohíbe por ambigua.
6. **El lead de «Otros equipos» prometía reprocesamiento** sin tenerlo.
7. **La meta de la línea acoplaba las selladoras a ISO 11607-2.**
8. **La fuente de las lectoras de 2i** citaba un «catálogo de equipos» que la
   propia investigación declara inexistente.
9. **`±1 %` y `≤ 1 %`** convivían para el mismo dato de EasySeal.

Lo que la revisión señaló y **no** era error: el `±4 °C`, el microcomputador,
la impresión de dos líneas y el corte de varios rollos **sí** salen del sitio
del fabricante. Lo que faltaba era registrarlos en
`docs/investigacion/easyseal.md`, que ahora los recoge textuales. Y el 24/7 y
los técnicos propios no salen de la investigación: los afirma Felipe en el
encargo, y así quedó anotado en `docs/investigacion/servicios.md`.

### D28 · El panel del mega menú cierra con siete marcas

Con 7 marcas en rejilla de 3 quedaban dos celdas vacías, y en los huecos no
se veía blanco: se veía el fondo gris que hace de línea divisoria. Se
rellenan con celdas vacías.

### D29 · El índice de búsqueda metía «[object Object]»

`normasDeclaradas` es un arreglo de objetos y se unía sin aplanar. Catorce
ocurrencias en el índice de las 37 páginas, y ninguna norma era buscable.

### D30 · El logotipo horizontal de Servimedical

**Qué.** Entró `public/logos/servimedical-group.svg`, horizontal, proporción
5:1. Sustituye al bloque apilado.

**Se optimizó: de 517 kB a 11 kB** (−97,8 %). Era un export de Illustrator con
veintiún trazos y el resto metadatos del programa. Va en el encabezado de las
37 páginas, así que medio megabyte ahí se paga en cada visita. El original
quedó fuera del repositorio; `herramientas/svgo.config.mjs` conserva el
`viewBox` y el `xmlns`, sin los cuales el archivo no escala o no parsea como
`<img>`.

**No se recoloreó.** El archivo trae varios tonos propios —un azul `#18375c`,
negros y grises—. Es la marca del cliente, no una pieza del sistema de color
del sitio.

**La proporción se lee del `viewBox`, no se escribe a mano.** El componente
declaraba `width="260" height="119"` (2,2:1), que era la del logotipo
apilado. Con el nuevo archivo esa reserva mentía y producía salto de
maquetación. Ahora se calcula: cambiar el archivo basta.

**El alto baja de 46 px a 38.** El apilado necesitaba altura para que su
segunda línea se leyera; un 5:1 a 46 px se comía la barra de 72. A 38 px la
palabra «SERVIMEDICAL» mide lo mismo que antes, porque ya no compite con un
símbolo encima.

**`npm run logos` buscaba el JPG antes que el SVG**, así que cada corrida
regeneraba el lockup apilado que el vectorial venía a reemplazar. Se invirtió
el orden. Y se borraron `servimedical-group.png` y `.webp`, que eran ese
lockup: una sola verdad.

**Pendiente: la versión blanca.** El pie va sobre azul oscuro y sigue con la
marca tipográfica, que cumple contraste AA. En cuanto exista
`servimedical-group-blanco.svg` el componente la toma solo.

### D31 · El logotipo sube a 44 px, y eso destapó el desborde horizontal

**Qué.** El logotipo del encabezado pasa de 38 px a 44 de alto: 220 × 44, con
14 px de aire a cada lado de la barra de 72.

**Lo que apareció al medirlo en móvil.** La página tenía 11 px de
desplazamiento horizontal en los 375 px, y no era el logotipo —termina en el
píxel 240—: era el **mega menú de escritorio**, que se ocultaba con
`visibility` pero seguía maquetándose. Su contenido, desde que muestra
logotipos de hasta 280 px, se salía del viewport.

Afectaba a **todas las páginas** y venía de antes de esta ronda, aunque los
logotipos del desplegable lo empeoraron. Ahora el panel lleva `display: none`
por debajo de `lg`, donde manda el menú del teléfono y el mega menú no existe.

Comprobado a 375, 768 y 1440 px: `scrollWidth` igual al viewport en los tres,
y el mega menú sigue abriendo en escritorio.

### D32 · La franja de marcas cabe en el primer pantallazo

**El problema.** El envoltorio ya pedía `100svh − barra`, pero el contenido
era más alto y la franja caía por debajo del pliegue en **todos** los tamaños
de escritorio: 1 px a 1440×900, 49 px a 1366×768.

**Dos causas.**

1. **Un píxel de borde.** `--spacing-header` vale 72, pero la caja de la barra
   mide 73: lleva un borde inferior. La resta se quedaba corta en un píxel, y
   un píxel por debajo del pliegue es igual de invisible que cien.
2. **La columna de la figura mandaba el alto.** A `min(60vh, 440px)` ocupaba
   526 px de los 696 disponibles en un portátil de 768.

**La solución.** El recuadro cede alto cuando la pantalla es baja: 52vh por
defecto, 46vh por debajo de 800 px de alto, 44vh por debajo de 736 y 38vh por
debajo de 672. Más aire vertical recortado en el hero a pantalla baja.

Resultado, medido: la franja termina **exactamente en el borde** del viewport
a 1920×1080, 1512×860, 1440×900, 1440×800, 1366×768, 1280×720 y 1024×768.

**La excepción.** A 1024×640 sigue cayendo 50 px por debajo. Ahí el suelo no
es el recuadro —que ya está en 38vh— sino la columna de texto, que mide 399 px
y no se puede encoger sin bajar el tamaño del titular en todas las demás
pantallas. Ningún equipo estándar tiene ese viewport; es una ventana
redimensionada a mano.

**En móvil no se fuerza.** El hero del teléfono mide 1.022 px por sí solo;
meterlo en 812 exigiría encoger titular, texto y equipo hasta dejarlos
ilegibles. Allí la franja va donde cae.

### D33 · Las escalas, revisadas con dos métricas en vez de una

**Qué estaba mal.** D23 igualaba la **mancha total de tinta**. Eso mejoró el
caso Akarmak pero dejó a Celitron y SVM leyendo pequeños, porque la mancha no
distingue dónde está esa tinta.

**Lo que se midió esta vez.** Para cada archivo, la **banda de letra**: la
franja horizontal que contiene el 80 % central de la tinta, expresada como
fracción del alto total. En una palabra esa banda es la altura de la letra;
en un lockup con símbolo, es el símbolo.

| Marca | Proporción | Banda de letra | Qué significa |
|---|---|---|---|
| Tuttnauer | 3,11 | 0,40 | Palabra con astas: la letra ocupa poco del alto |
| Akarmak | 7,37 | 0,59 | Palabra sin astas: la letra es casi todo el alto |
| SVM | 3,66 | 0,81 | Monograma: el trazo llena la caja |
| Celitron | 1,77 | 0,67 | Palabra más cuadro verde más bajada |
| Sanqiang | 1,26 | 0,81 | Símbolo sobre texto diminuto |
| 2i | 1,05 | 0,72 | Símbolo circular |

**Y la conclusión incómoda:** ninguna métrica sola sirve. Igualar la banda de
letra pedía dejar Akarmak en 0,67 —que es donde estaba cuando Felipe lo vio
«mucho más grande»—, porque su letra es baja respecto a su enorme ancho: a
esa escala ocupa 259 px de fila contra los 116 de Tuttnauer. Igualar la
mancha lo bajaba a 0,55, y entonces su letra quedaba más baja que la de
todos.

**Se cedió algo de letra a cambio de no dominar la fila: 0,62.** Akarmak
queda con letra de 16 px contra los 18 de Tuttnauer, y con 201 px de ancho en
vez de 259.

| Marca | Escala | Pintado | Letra |
|---|---|---|---|
| Tuttnauer | 1,00 | 137 × 44 | 18 px |
| Akarmak | 0,62 | 201 × 27 | 16 px |
| Celitron | 1,22 | 95 × 54 | — |
| SVM | 1,08 | 89 × 48 | — |
| Sanqiang | 1,25 | 69 × 55 | — |
| 2i | 1,15 | 53 × 51 | — |

Las mismas escalas rigen los tres contextos —franja del hero, desplegable de
marcas y tarjetas de la home—, porque la corrección es del archivo, no del
sitio donde se pinta. Verificado en los tres: la caja del logotipo mide lo
mismo en las siete tarjetas y los enlaces arrancan todos a 28 px del borde.

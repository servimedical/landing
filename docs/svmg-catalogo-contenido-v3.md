# Servimedical: contenido del catálogo por marca, línea y producto

> **Versión 3, 8 de octubre de 2026.** Reemplaza la v2. Fuente de verdad para reescribir `src/datos/` del sitio.
> Toda la investigación se rehízo con fuentes primarias: sitios oficiales, PDFs del fabricante y la tienda oficial verificada de Sanqiang en Made-in-China.
> Convención: `[F#]` remite a la lista de fuentes al final. `⚠` marca un dato que no se pudo confirmar o que el fabricante publica con cifras contradictorias. Un dato con ⚠ no se publica hasta que Felipe lo confirme.

---

## 0. Qué cambia frente a la v2

### Cambios de plantilla (decisiones de Felipe, 8-oct)
1. **Producto:** se elimina la fila "Fabricante · {origen} · desde {año}" del hero de todas las páginas de producto. El origen y el año viven solo en la página de marca y en las tarjetas de la línea.
2. **Marca:** se elimina la sección "Dónde entra en la central" (el diagrama de 6 etapas).
3. **Home:** la imagen derecha del hero pasa a ser un carrusel (ver §2.5).

### Correcciones de datos (investigación del 8-oct)
4. **Tuttnauer vapor ahora incluye los equipos de mesa y los medianos.** El rango pasa de 120–1.010 L a **21–1.010 L**. Las familias son:
   - Mesa Clase B: T-Top y T-Edge.
   - Mesa Clase S: EA/EKA y D-Line.
   - Medianos móviles: HSG.
   - Central: GS, 44/55 Compact, T-Max, 6671130 y 69180.
5. **Tuttnauer no tiene autoclaves verticales médicos.** Sus verticales (ELV-D y T-Lab) se venden solo como equipo de laboratorio [F2c], así que no entran en el sitio. Si Servimedical las vende igual en hospitales, se agrega un bloque "Verticales" y se aclara que son de laboratorio.
6. **El modelo Tuttnauer 4480 (140 L) no existe en ninguna fuente oficial.** Hoy está publicado en el sitio y hay que quitarlo.
7. **Sanqiang vapor también tiene equipos de mesa y compactos.** El rango pasa a **18–1.500 L**:
   - Mesa Clase B: SQ-Z18, SQ-Z23 y SQ-Z45.
   - Horizontales compactos EN 13060: SQ-M100 y SQ-M200.
   - Las cámaras grandes tienen volumen real de 638, 832, 1.001 y 1.203 L. Las cifras redondas que se usaban (600, 800, 1.000 y 1.200 L) son comerciales.
8. **Las medidas y pesos del plasma SQ-WD sí tienen fuente.** Están en la tienda oficial de Sanqiang [F11b]. El reparo que hice ayer queda retirado. La medida externa es igual en los tres modelos porque comparten el mismo gabinete.
9. **Las termodesinfectoras Sanqiang estaban mal descritas.**
   - La SQ-X360 lleva **8 cestas DIN**, no 12.
   - "17 programas" y "93–97 °C" aplican solo a la serie KX.
   - Existe además la SQ-X560, de 560 L.
10. **Sanqiang no publica ningún equipo de tratamiento de residuos.** No aparece en su sitio, en su tienda oficial ni en búsquedas abiertas [F10, F11b]. Felipe confirmó que el equipo existe, así que la página se mantiene. Recomiendo dejarla con `publicado: false` hasta tener la ficha del proveedor, para no afirmar en el sitio un producto que el fabricante no muestra.
11. **Celitron: solo el modelo de 150 L tiene ficha vigente.**
    - La cifra "25 · 150 · 560 L, 5–150 kg/h" sale de la página general de la línea.
    - Los modelos de 25 y 560 L solo aparecen en un folleto de 2019.
    - "15–35 min" es el tiempo de la línea completa. El AC-575 tarda 30–40 min.
12. **Akarmak serie A: la capacidad es por ciclo, no por hora.**
    - La web dice 500–700, 1.000–1.250 y 1.500–1.800 **kg/ciclo**.
    - El AKR1000A es de 1.000–1.250, no de 1.000–1.200.
13. **2i:**
    - No tiene indicador químico Tipo 1 en su catálogo.
    - El Bowie-Dick es Tipo 2 según el distribuidor; el sitio de 2i no le asigna tipo.
    - Existe un biológico de vapor de 8 h.
    - El de 24 h es de la línea odontológica y viene en caja de 10.
    - No tiene línea de pruebas de limpieza.
14. **Cifras de empresa corregidas:**
    - Sanqiang: 304 empleados y 51.677 m² (dato auditado por SGS). Las cifras 500+ y 56.000 eran del sitio propio.
    - Akarmak: más de 70 países.
    - Tuttnauer: 1925 se mantiene (en 1952 se constituyó formalmente).

---

## 1. Arquitectura

| Nivel | Ruta | Qué responde |
|---|---|---|
| Marca | `/marcas/{marca}` | Quién fabrica y qué respalda Servimedical en Colombia |
| Línea | `/lineas/{linea}` | Qué es el método, cuándo se usa y qué productos lo ofrecen |
| Producto | `/marcas/{marca}/{linea}` | El equipo o consumible concreto, con datos, foto y brochure |

### Mapa línea × marca → producto

| # | Etapa | Línea | Productos |
|---|---|---|---|
| 01 | Lavado y desinfección | `termodesinfectoras` | `tuttnauer/termodesinfectoras` · `sanqiang/termodesinfectoras` |
| 02 | Empaque | `empaque` | `servimedical/papel-y-tyvek` (una sola marca, redirige al producto) |
| 03 | Esterilización | `vapor` | `tuttnauer/vapor` · `sanqiang/vapor` |
| 03 | Esterilización | `plasma` | `tuttnauer/plasma` · `sanqiang/plasma` |
| 04 | Monitoreo | `indicadores` | `2i/indicadores-quimicos` · `2i/indicadores-biologicos` |
| 05 | Almacenamiento | `mobiliario` | `servimedical/mobiliario-acero-inoxidable` (redirige al producto) |
| 06 | Residuos | `residuos-hospitalarios` | `celitron/residuos-hospitalarios` · `akarmak/residuos-hospitalarios` · `sanqiang/residuos-hospitalarios` (oculto hasta tener ficha) |
| — | Transversal | `repuestos` | `servimedical/repuestos` (redirige al producto) |

**Dropdown Marcas**, en el orden del ciclo:
- **Tuttnauer:** Termodesinfectoras · Vapor · Plasma
- **Sanqiang:** Termodesinfectoras · Vapor · Plasma (· Tratamiento de residuos cuando se publique)
- **Celitron:** Tratamiento de residuos
- **Akarmak:** Tratamiento de residuos
- **2i:** Indicadores químicos · Indicadores biológicos (hoy el sitio muestra uno solo y hay que agregar el segundo)
- **Servimedical:** Papel y Tyvek · Mobiliario en acero inoxidable · Repuestos

**Menú móvil:** hoy la lista de marcas empieza en Sanqiang y falta Tuttnauer. Hay que corregirlo.

---

## 2. Plantillas

### 2.1 Marca: `/marcas/{marca}`
1. **Mini hero:** logo, H1, lead de 2 frases y una ficha con origen, año, rol de Servimedical y líneas.
2. **Quién es el fabricante:** un párrafo.
3. **Productos de esta marca:** una tarjeta por producto con foto si existe, nombre, rango y "Ver producto →".
4. **Por qué esta marca:** 3 pruebas con fuente.
5. **Respaldo en Colombia.**
6. **Documentos:** se oculta si no hay archivos.
7. **CTA.**

~~Dónde entra en la central~~: se elimina.

### 2.2 Línea: `/lineas/{linea}`
1. Mini hero: etapa del ciclo, H1 y lead.
2. Cómo funciona.
3. Qué procesa y qué no.
4. Normas de referencia.
5. **Productos disponibles:** una tarjeta por marca con foto, marca, familia, origen, rol de Servimedical y 3 `diferenciales`.
6. Preguntas frecuentes.
7. CTA.

### 2.3 Producto: `/marcas/{marca}/{linea}`
1. **Mini hero:** marca (logo enlazado a la marca), H1, lead, **franja de 3–4 datos del equipo** y botones "Cotizar" y "Descargar brochure" (este último solo si hay PDF). Foto a la derecha si existe.
   - **Sin fila "Fabricante"** y sin datos de la empresa en el hero. La franja lleva solo datos del producto: cámara, temperatura, norma, puertas, etc.
2. **Descripción:** 2 párrafos.
3. **Modelos:** tabla. **Cuando hay varias familias** (mesa, mediano, central), se usa una subtabla por familia con su encabezado. Una sola tabla de 20 filas no se lee.
4. **Ciclos y pruebas:** solo si hay datos. Se indica a qué familia aplican.
5. **Requisitos de instalación:** solo con cifras reales y se indica a qué familia aplican.
6. **Normas declaradas por el fabricante:** por familia cuando cambian.
7. Qué preguntamos antes de cotizar.
8. Servicio.
9. Completa el ciclo.
10. Sobre el método →
11. CTA.

Migas: **Inicio / Líneas / {Línea} / {Marca}**.

> ⚠ **Despliegue:** `/marcas/tuttnauer` y `/marcas/tuttnauer/plasma` siguen sirviendo el template viejo, con otro header, "130 países", "Países Bajos e Israel" e ISO 22441. Hay que forzar un redeploy sin caché y revisar todas las rutas con `npm run build`. Cualquier página estática que no se haya regenerado mantiene el contenido viejo.

### 2.4 Fotos y brochures de producto

```
public/productos/{marca}-{linea}/
  foto.webp          ← principal, 1600×1200 (4:3), fondo neutro o transparente
  galeria-1.webp …   ← opcional, máximo 4, mismo tamaño
  brochure.pdf       ← opcional
```

`media: { foto?: string, galeria?: string[], brochure?: { url, titulo, pesoKB } }`. El script `npm run media` lista qué falta.

### 2.5 Carrusel del hero de la home (nuevo)

**Dónde subir las fotos:**

```
public/home/hero/
  01-tuttnauer-vapor.webp
  02-tuttnauer-plasma.webp
  03-tuttnauer-termodesinfectoras.webp
  04-sanqiang-vapor.webp
  05-akarmak-residuos.webp
  06-2i-indicadores.webp
```

El prefijo numérico define el orden. Cada archivo se empareja con su producto por `{marca}-{linea}`, y de ahí salen la etiqueta y el enlace.

**Especificación de cada imagen:**

| | Valor |
|---|---|
| Tamaño | **1600 × 1280 px** (proporción 5:4, la del recuadro actual) |
| Formato | WebP con transparencia (alfa). Si la foto trae fondo, que sea el mismo gris claro del recuadro. |
| Peso | ≤ 250 KB por imagen (calidad WebP 80–85) |
| Encuadre | Equipo recortado y centrado, apoyado en el borde inferior, ocupando ~85 % del alto. Margen lateral libre de al menos 10 %. |
| Esquina inferior izquierda | Despejada en unos 40 % × 25 %, porque ahí va la etiqueta del producto. |
| Ángulo | Vista frontal o 3/4, la misma en todas las fotos, para que el cambio de slide no salte. |
| Cantidad | 4 a 6 |

Con la transparencia, el equipo puede sobresalir del recuadro como en el diseño actual. Si en vez de recortes vas a subir fotos de ambiente, avísame y cambio el encuadre a `cover`.

**Comportamiento:**
- Cambio automático cada 6 s con fundido de 600 ms. Se pausa con hover o foco.
- Puntos de navegación debajo y flechas solo en escritorio.
- Con `prefers-reduced-motion` no hay autoplay ni fundido.
- La primera imagen carga con `fetchpriority="high"` y las demás con `loading="lazy"`.
- Cada slide tiene `alt` = "{tipo de equipo} {marca}".
- **Etiqueta por slide,** generada desde los datos del producto (no se escribe a mano): "{Tipo} · {Marca}" y, debajo, "{rango} · {norma} →", con enlace al producto. Ejemplo actual: *Autoclave de vapor · Tuttnauer — 430–565 L · EN 285 →*.
- **Móvil:** la misma imagen debajo del texto, al 100 % del ancho, sin flechas.

**Slides sugeridos:**

| # | Producto | Etiqueta |
|---|---|---|
| 1 | Tuttnauer T-Max | Autoclave de vapor · Tuttnauer — 430–565 L · EN 285 |
| 2 | Tuttnauer PlazMax | Plasma de peróxido · Tuttnauer — 47–162 L · desde 32 min |
| 3 | Tuttnauer TIVA 15-V | Termodesinfectora · Tuttnauer — hasta 18 cestas DIN |
| 4 | Sanqiang PVS·JD | Autoclave de vapor · Sanqiang — hasta 1.500 L |
| 5 | Akarmak AKR | Tratamiento de residuos · Akarmak — 20 kg/ciclo a planta |
| 6 | 2i | Indicadores biológicos · 2i — lectura desde 19 min |

---

## 3. Marcas

### Tuttnauer
- **Ficha:** fabricante · fundada en 1925 · plantas en China y Hungría [F1] · Rol: representante en Colombia · Líneas: termodesinfectoras, vapor y plasma.
- **Lead:** Fabricante de autoclaves desde 1925, con distribuidores en más de 140 países. Esterilización por vapor, desde equipos de mesa hasta autoclaves de central de 1.010 L, plasma de peróxido de hidrógeno y lavado con termodesinfección, con instalación, calificación y repuesto original desde Bogotá.
- **Quién es el fabricante:** Tuttnauer empezó en 1925 como taller familiar de Aaron Tuttnauer y hoy diseña equipos de esterilización y control de infecciones para hospitales, clínicas, laboratorios y odontología. Fabrica en China y Hungría. Sus termodesinfectoras TIVA las produce AT-OS (Italia), empresa en la que Tuttnauer tiene participación. Los autoclaves de central se fabrican bajo EN 285, ANSI/AAMI ST8, ISO 13485 y la Directiva de Equipos a Presión 2014/68/UE, y los de mesa bajo EN 13060 [F1, F2].
- **Pruebas:**
  - Desde 1925 [F1]
  - Autoclaves de 21 a 1.010 L, de mesa a central [F2, F2a, F2b]
  - EN 285 y ANSI/AAMI ST8 en autoclaves de central [F2]
- ⚠ **Países:** el sitio global dice "más de 140", la página de empresa "más de 150" y el sitio de EE. UU. "más de 130". El copy usa 140.
- ⚠ **Israel y Países Bajos:** ninguna página oficial los nombra hoy. No se publican.

### Sanqiang
- **Ficha:** Henan Sanqiang Medical Equipment · Hua County, Henan, China · fundada en 2010 [F11b] · Rol: distribuidor autorizado · Líneas: termodesinfectoras, vapor y plasma.
- **Lead:** Fabricante chino de equipos para la central de esterilización, fundado en 2010 y exportador a más de 100 países. Cubre el lavado y la termodesinfección, el vapor (desde autoclaves de mesa hasta cámaras de 1.500 L) y el plasma de peróxido.
- **Quién es el fabricante:** Sanqiang diseña y fabrica en Hua County (Henan) autoclaves de vacío pulsante, esterilizadores de plasma de peróxido, termodesinfectoras y equipos de óxido de etileno, formaldehído y secado. Tiene 304 empleados y una planta de 51.677 m², según su perfil verificado por SGS. Declara ISO 13485, ISO 9001, ISO 14001, ISO 45001, marcado CE y ASME [F11b].
- **Pruebas:**
  - Cámaras de vapor de hasta 1.500 L [F11, F11c]
  - Plasma de 100 a 190 L con ciclo corto de 30 min [F10]
  - Termodesinfectoras de hasta 12 cestas DIN (serie KX) [F12b]
- **No se publica:** "500+ empleados", "56.000 m²" ni "5.000+ equipos instalados". Solo aparecen en el sitio propio, no en datos verificados.

### Celitron
- **Ficha:** Celitron Medical Technologies · Vác, Hungría [F16] · Rol: ⚠ confirmar · Línea: tratamiento de residuos.
- **Lead:** Fabricante húngaro del sistema ISS, que tritura y esteriliza residuos biosanitarios con vapor en un solo recipiente, dentro del hospital y sin incineración.
- **Quién es el fabricante:** Celitron diseña y fabrica en Vác (Hungría) esterilizadores de vapor y equipos de tratamiento de residuos sin incineración. Está certificada en ISO 9001:2015 e ISO 13485:2016, con marcado CE bajo MDR. Reporta más de 500 unidades de residuos vendidas en más de 40 países [F16, F19].
- **Pruebas:**
  - Tritura y esteriliza en el mismo recipiente [F19]
  - SAL > 6 log₁₀ [F19]
  - Más de 500 unidades de residuos instaladas [F19]
- Las cifras "80 países" (toda la empresa) y "40 países" (solo residuos) no se contradicen. El copy usa 40 porque habla de residuos.
- ⚠ El año de fundación no está publicado.

### Akarmak
- **Ficha:** Akar Makina · Eskişehir, Turquía · desde 1990 [F14] · Rol: distribuidor autorizado · Línea: tratamiento de residuos.
- **Lead:** Fabricante turco de autoclaves industriales desde 1990, con clientes en más de 70 países. Su línea médica esteriliza y tritura residuos biosanitarios, desde equipos para un hospital hasta plantas centralizadas.
- **Quién es el fabricante:** Akarmak fabrica autoclaves y recipientes a presión para las industrias del vidrio, compuestos, caucho y construcción, y aplica esa ingeniería al tratamiento de residuos médicos. Fabrica bajo PED 2014/68/UE, ASME VIII, AD 2000 e ISO 9001:2015. Declara que sus sistemas de residuos están validados por organismos independientes como el Instituto Robert Koch, con nivel STAATT IV [F14, F15].
- **Pruebas:**
  - Reducción microbiana de hasta 8 log₁₀ [F15]
  - Desde 20 kg por ciclo hasta 1.800 kg por ciclo [F15]
  - Trituradora de fabricación propia [F15]
- ⚠ La validación del Instituto Robert Koch es una declaración del fabricante sin informe público. Hay que pedir el informe antes de publicarla como hecho. Mientras tanto, el copy dice "declara".

### 2i
- **Ficha:** 2i Health Care · Cambé, Paraná, Brasil · Rol: distribuidor autorizado · Líneas: indicadores químicos y biológicos.
- **Lead:** Indicadores químicos y biológicos para vapor, peróxido de hidrógeno, óxido de etileno y formaldehído, con lectura biológica desde 19 minutos en vapor. La evidencia con la que la central libera cada carga.
- **Quién es el fabricante:** 2i fabrica en Brasil indicadores químicos de las clases 4, 5 y 6 de ISO 11140-1, prueba de Bowie-Dick, paquetes de prueba (PCD), indicadores biológicos autocontenidos, y lectoras e incubadoras propias [F21].
- ⚠ Faltan el registro INVIMA, la ISO 13485 y el año de fundación.

### Servimedical (línea propia)
Sin cambios frente a la v2.
- **Ficha:** Servimedical Group SAS · Bogotá · Líneas: empaque, mobiliario y repuestos.
- **Lead:** Lo que la central consume y lo que la sostiene: papel grado esterilización y Tyvek para la barrera estéril, mobiliario en acero inoxidable para el flujo de sucio a limpio a estéril, y repuestos para que los equipos no se detengan.

---

## 4. Líneas

### Termodesinfectoras: `/lineas/termodesinfectoras` (01)
- **Lead:** Lavado y desinfección térmica automática del instrumental antes del empaque. Sin una carga limpia no hay esterilización que valga.
- **Cómo funciona, compatibilidad, normas y FAQ:** sin cambios frente a la v2 (ISO 15883-1 y -2, valor A0).
- **Diferenciales.** En las tarjetas, el dato principal es el número de cestas DIN. Los litros no sirven para comparar entre marcas: la TIVA de 265 L y la KX de 470 L llevan las mismas 12 cestas.

| | Tuttnauer TIVA | Sanqiang SQ-X / SQ-KX |
|---|---|---|
| Capacidad | 8 a 18 cestas DIN | 8 a 12 cestas DIN |
| Cámara | 65–430 L | 350–560 L |
| Secado | Aire filtrado HEPA H14 | Aire caliente (> 100 °C) |

### Esterilización por vapor: `/lineas/vapor` (03)
- **Lead:** Vapor saturado a 121 o 134 °C para todo lo que resiste calor y humedad. El método de referencia de la central.
- **Cómo funciona:** igual que en la v2. Se agrega un párrafo:
  > Hay dos escalas. Los esterilizadores pequeños, de mesa y de hasta un módulo de esterilización, se rigen por EN 13060, que los clasifica en B (carga hueca y porosa), S (lo que declare el fabricante) y N (sólidos sin envolver). Los grandes, de central, se rigen por EN 285. Una clínica o un quirófano satélite suele necesitar un Clase B de mesa; una central hospitalaria, uno o varios equipos EN 285.
- **Normas:** ISO 17665 (proceso), EN 285 (grandes) y EN 13060 (pequeños).
- **Diferenciales:**

| | Tuttnauer | Sanqiang |
|---|---|---|
| Rango | 21–1.010 L, de mesa a central | 18–1.500 L, de mesa a central |
| Norma del equipo | EN 13060 (mesa) · EN 285 + AAMI ST8 (central) | Clase B / EN 13060 (mesa y compactos) · CE e ISO 13485 (central); EN 285 no declarada |
| Distintivo | Ciclo envuelto de 4 min a 134 °C (central) | 1–99 pulsos de vacío · ±0,5 °C |

- **FAQ:** se mantienen las de la v2 y se agrega una:
  - *¿Mesa o central?* Depende de la carga por turno y del tamaño de los sets. Un equipo de mesa procesa bandejas; uno de central procesa carros completos. Lo dimensionamos con las cirugías por día.

### Esterilización por plasma: `/lineas/plasma` (03)
Sin cambios frente a la v2, salvo los diferenciales:

| | Tuttnauer PlazMax | Sanqiang SQ-WD |
|---|---|---|
| Cámaras | 47 · 109 · 162 L | 100 · 135 · 190 L |
| Ciclos | 32–48 min, 3 programas | 30 / 50 / 60 min |
| Alimentación | 230 V monofásico | 220 V monofásico · agente en cápsula |

### Indicadores: `/lineas/indicadores` (04)
- Sin cambios frente a la v2, salvo **Cómo funciona**: se menciona el Tipo 1, pero se aclara que 2i no ofrece ese tipo (la cinta de proceso es otro producto).
- Se mantiene la Resolución 3100 de 2019: indicador químico en cada paquete y biológico como mínimo semanal [F25].

### Tratamiento de residuos: `/lineas/residuos-hospitalarios` (06)
- Lead, funcionamiento y compatibilidad sin cambios frente a la v2.
- **Diferenciales:** mientras Sanqiang esté oculta, la línea tiene dos marcas.

| | Celitron ISS | Akarmak AKR |
|---|---|---|
| Escala | Un hospital | Hospital, y planta centralizada |
| Capacidad | 15–30 kg/h (ISS AC-575) | 20–300 kg/ciclo (lote) · 500–1.800 kg/ciclo (planta) |
| Proceso | Tritura y esteriliza en un solo recipiente | Trituración antes del vapor (serie L) o después (serie A) |

- ⚠ Confirmar la norma colombiana aplicable (Decreto 780 de 2016 y el manual MGIRASA) antes de citarla.

---

## 5. Productos

### 5.1 `tuttnauer/vapor`: Autoclaves Tuttnauer

- **H1:** Autoclaves Tuttnauer
- **Lead:** Autoclaves de vapor de 21 a 1.010 L: de mesa Clase B para clínica y quirófano, medianos móviles, y de central EN 285 de una o dos puertas.
- **Franja:**
  - Cámara: 21–1.010 L
  - Temperatura: 121 y 134 °C
  - Normas: EN 13060 · EN 285
  - Puertas: simple o doble (central)
- **Descripción:**
  - Los equipos de mesa T-Top y T-Edge son Clase B, con prevacío fraccionado para carga hueca y porosa, trazabilidad por USB y conectividad Wi-Fi o Ethernet.
  - Los HSG son equipos medianos sobre ruedas, de 85 y 160 L, que funcionan sin acometidas del edificio.
  - En la central, las series GS, 44/55 Compact y T-Max, más los modelos 6671130 y 69180, van de 120 a 1.010 L. Todos tienen cámara de 316L, generador integrado o conexión a vapor de planta, y puerta de barrera que separa el área limpia de la estéril.
  - El sistema AquaMinimal, opcional en central, reduce el consumo de agua entre un 50 y un 90 % [F2].

**Modelos de mesa Clase B (EN 13060)** [F2a]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso | Notas |
|---|---|---|---|---|---|
| T-Top 10 | 21 L | Ø249 × 450 | 585 × 462 × 460 | 45 kg | 4 bandejas, llenado manual |
| T-Top 11 | 27 L | Ø280 × 452 | 594 × 495 × 457 | 52 kg | Llenado manual o automático |
| T-Edge 10 | 23 L | Ø250 × 460 | 480 × 500 × 580 | 53 kg | 5 bandejas, 230 V monofásico |
| T-Edge 11 | 27 L | Ø280 × 460 | 500 × 500 × 580 | 56 kg | 230 V monofásico |

**Modelos de mesa Clase S (EN 13060)** [F2a]

| Modelo | Cámara | Medidas externas (mm) | Potencia |
|---|---|---|---|
| 2540EKA | 23 L | 508 × 362 × 550 | 2.200 W · 230 V |
| D-Line 2840EKA | 28,5 L | ⚠ | 2.200 W · 230 V |
| 3850EA / D-Line 3850EA | 65 L | 660 × 525 × 695 / 720 × 540 × 765 | 2.400 W · 230 V |
| D-Line 3870EA | 85 L | 720 × 540 × 940 | 3.000 W · 230 V |

⚠ La página del 3870EA (no D-Line) dice 65 L y 85 L a la vez. Se publica solo la versión D-Line.

**Modelos medianos móviles (HSG D-Line)** [F2b]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso | Potencia |
|---|---|---|---|---|---|
| 3870HSG D-Line | 85 L | Ø384 × 758 | 720 × 1365 × 1180 | 180 kg | 9 kW, trifásico (monofásico opcional) |
| 5075HSG-D | 160 L ⚠ | Ø500 × 750 ⚠ | 857 × 1660 × 1286 | 366 kg | 18 kW |

⚠ Con Ø500 × 750 la cámara da 147 L, no 160. La serie GS usa 810 mm de largo para los mismos 160 L. Además, la página del 5075HSG declara EN 285 y EN 13060 a la vez. Hay que confirmar ambos datos con fábrica.

**Modelos de central (EN 285)** [F2, F3]

| Modelo | Cámara | Medidas de cámara (mm) | Generador | Puertas |
|---|---|---|---|---|
| 5075GS | 160 L | Ø500 × 810 | 18 kW | 1 o 2 |
| 50125GS | 250 L | Ø500 × 1250 | 18 kW | 1 o 2 |
| 4472 | 120 L | 408 × 408 × 730 | 18 kW | 1 o 2 |
| 4496 | 160 L | 408 × 408 × 970 | 18 kW | 1 o 2 |
| 5596 | 250 L | 508 × 508 × 970 | 27 kW | 1 o 2 |
| 55120 | 310 L | 508 × 508 × 1210 | 27 kW | 1 o 2 |
| T-Max 6 | 430 L · 6 StU | 660 × 660 × 990 | 36 kW | 1 o 2 |
| T-Max 8 | 565 L · 8 StU | 660 × 660 × 1295 | 36 kW | 1 o 2 |
| 6671130 | 610 L | 660 × 710 × 1295 | 36 kW | 1 o 2 |
| 69180 | 1.010 L | 610 × 910 × 1815 | ⚠ no publicado | 1 o 2 |

- Se elimina el **4480**, que no existe en fuentes oficiales.
- Verifiqué todos los volúmenes contra las medidas de cámara y cuadran.

**Ciclos**
- *Mesa (T-Top 10), tiempo total* [F2a]:
  - 134 °C sin envolver: 24 min
  - 134 °C envuelto: 52 min
  - 121 °C sin envolver: 34 min
  - 121 °C envuelto: 72 min
  - Priones: 70 min
  - Bowie-Dick y prueba de vacío
- *Central (44/55 Compact), tiempo de exposición* [F3]:
  - Sin envolver: 134 °C / 3 min
  - Envuelto: 134 °C / 4 min
  - Doble envuelto: 134 °C / 7 min
  - Poroso: 121 °C / 15 min
  - Priones: 134 °C / 18 min
  - Bowie-Dick: 134 °C / 3,5 min
  - Prueba de vacío

**Instalación (central 44/55 Compact)** [F3]:
- Trifásico 208–415 V, 18 kW (27 kW en el 55120).
- Agua del generador: dureza < 0,1 mmol/L y conductividad < 50 µS/cm, 25–37 L/h.
- Agua de enfriamiento: 2–5 bar, alrededor de 17 L/min.
- Drenaje: mínimo 2", resistente a 80 °C.
- Aire comprimido: 6–8 bar.
- Vapor de planta (opcional): 97–100 % seco, máximo 2,8 bar.

Los equipos de mesa piden una toma de 230 V monofásica y agua desmineralizada para el depósito.

**Normas declaradas:**
- Mesa: EN 13060, IEC 61010-1 y -2-040, PED 2014/68/UE, ISO 13485:2016; certificado CE bajo MDR [F2a].
- Central: EN 285, ANSI/AAMI ST8, ISO 13485:2016, PED 2014/68/UE, ASME [F2].

**Diferenciales:** 21–1.010 L, de mesa a central · EN 285 + AAMI ST8 · ciclo envuelto de 4 min.

**Brochure:** ficha 44/55 Compact [F3]. En casi todas las páginas de producto de Tuttnauer, el botón de descarga no lleva a ningún PDF, así que los demás folletos hay que pedirlos a fábrica.

**No se publica:**
- Las semiautomáticas M/MK, porque no declaran clase.
- Los modelos que solo se venden en EE. UU.
- La 6690, porque la web de EE. UU. dice 430 L y el folleto de 2021 dice 340 L.
- Los verticales ELV y T-Lab, que se venden como equipo de laboratorio.

### 5.2 `tuttnauer/plasma`: PlazMax
- **Lead:** Esterilización a baja temperatura con peróxido de hidrógeno vaporizado, por debajo de 55 °C y en ciclos de 32 a 48 minutos. Sin consumo de agua.
- **Franja:**
  - Cámara: 47 · 109 · 162 L
  - Ciclo: 32–48 min
  - Temperatura: 50–55 °C
  - Norma del equipo: ISO 14937
- **Descripción:**
  - Tres programas: estándar, avanzado (para lúmenes) y endoscopio.
  - Cámara de aluminio, una o dos puertas, y canastas de 40 × 60 cm (40 × 90 en el P160).
  - No consume agua; los subproductos son agua y oxígeno.
  - Imprime y exporta cada ciclo por USB y Ethernet [F4, F5].

**Modelos** [F4]

| Modelo | Cámara | Estándar | Avanzado | Endoscopio | Medidas externas (mm) | Potencia |
|---|---|---|---|---|---|---|
| P50 | 47 L | 35 min | 40 min | 32 min | 702 × 1528 × 729 | 3.100 W |
| P110 | 109 L | 39 min | 44 min | 37 min | 702 × 1768 × 729 | 4.300 W |
| P160 | 162 L | 43 min | 48 min | 41 min | 702 × 1768 × 1029 | 4.300 W |

- **Instalación:**
  - **230 V monofásico.** La web dice trifásico, pero los folletos 2020 en español, francés y alemán dicen monofásico, y la corriente publicada (13,5 y 18,7 A) es la de un equipo monofásico. Se publica monofásico y se pide confirmación escrita a fábrica.
  - No necesita agua.
  - Con dos puertas, el fondo sube a 736 mm (1.036 mm en el P160).
- **Lúmenes:** los folletos en francés y alemán dicen 1 mm de diámetro interno, hasta 4 m con ambos extremos abiertos y 1,4 m con un extremo cerrado. Es el dato del dispositivo de desafío (PCD) [F5]. El folleto en español de 2020 trae un error tipográfico ("4 mm"). En el sitio se publica: "Lúmenes de 1 mm de diámetro, hasta 4 m abiertos en ambos extremos, según el dispositivo de desafío del fabricante".
- **Normas declaradas:** ISO 14937, ISO 13485, EN 61010-2-040, EN 60601-1, CE 0344. **No declara ISO 22441**, así que ISO 22441 no va en la franja.
- **Diferenciales:** 47–162 L · desde 32 min · sin agua.
- **Brochure:** PlazMax en español [F5].

### 5.3 `tuttnauer/termodesinfectoras`: TIVA
- **Lead:** Termodesinfectoras de 65 a 430 L, de 8 a 18 cestas DIN, con secado por aire filtrado HEPA H14 y 40 programas.
- **Franja:**
  - Capacidad: hasta 18 cestas DIN
  - Cámara: 65–430 L
  - Desinfección: más de 90 °C
  - Secado: HEPA H14
- **Descripción:** sin cambios frente a la v2. Se agrega una frase: "Fabricadas por AT-OS en Italia para Tuttnauer".

**Modelos** [F7, F8]

| Modelo | Cámara | Cestas DIN | Puerta | Medidas externas (mm) |
|---|---|---|---|---|
| Tiva 2 | 65 L | — | Vidrio, manual | 595 × 520 × 600 |
| Tiva 8 | 165 L ⚠ | 8, en 4 niveles | Vidrio, manual batiente | 600 o 900 × 650 × 860 |
| Tiva 10-M | 265 L | 12, en 6 niveles | Vidrio, manual batiente · 1 o 2 puertas | 650 × 700 × 1850 |
| Tiva 10-V | 265 L | 12, en 6 niveles | Vidrio, automática corrediza · 1 o 2 puertas | 680 × 700 × 1950 |
| Tiva 15-V | 430 L | 18, en 6 niveles | Automática corrediza · 1 o 2 puertas | 1000 × 900 × 1900 |

⚠ El Tiva 8 aparece con 165 L en la web y 175 L en los folletos.

- **Instalación:**
  - Agua fría ablandada y desmineralizada; agua caliente opcional.
  - Drenaje DN40.
  - Tiva 8: de 6,3 a 8,8 kW, con opciones de 230 V monofásico o 380/415 V trifásico.
  - Calentamiento eléctrico, por vapor o híbrido.
- **Normas declaradas:** ⚠ ISO 15883 solo aparece en el folleto del Tiva 2. Las páginas actuales no declaran la norma ni el valor A0. Hay que pedir la declaración de conformidad antes de publicarla.
- **Diferenciales:** hasta 18 cestas DIN · 40 programas · secado HEPA H14.

### 5.4 `sanqiang/vapor`: Autoclaves Sanqiang

- **H1:** Autoclaves Sanqiang
- **Lead:** Autoclaves de vapor de 18 a 1.500 L: de mesa Clase B, horizontales compactos y de vacío pulsante para centrales de alto volumen.
- **Franja:**
  - Cámara: 18–1.500 L
  - Temperatura: 121 y 134 °C
  - Uniformidad: ±0,5 °C (central)
  - Vacío final: −96 kPa (central)
- **Descripción:**
  - Los equipos de mesa SQ-Z son Clase B, a 220 V, con ciclos de 18 a 40 minutos para instrumental sólido y envuelto.
  - Los horizontales SQ-M100 y SQ-M200, bajo EN 13060, sirven a clínicas y quirófanos satélite con generador de vapor integrado.
  - En la central, la serie MD.JD / PVS·JD extrae el aire con 1 a 99 pulsos de vacío programables, hasta −96 kPa, y sostiene una uniformidad de ±0,5 °C. El secado es al vacío y el control es por pantalla táctil con impresora térmica y USB [F11, F11c].

**Modelos de mesa Clase B** [F11d]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso | Potencia |
|---|---|---|---|---|---|
| SQ-Z18 | 18 L | Ø246 × 360 | 715 × 513 × 425 | 45 kg | 1,7 kVA · 220 V |
| SQ-Z23 | 23 L | Ø246 × 450 | 715 × 513 × 425 | 49 kg | 1,7 kVA · 220 V |
| SQ-Z45 | 45 L | Ø320 × 620 | 900 × 565 × 600 | 108 kg | 3,5 kVA · 220 V |

**Modelos horizontales compactos (EN 13060)** [F11e]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso | Potencia |
|---|---|---|---|---|---|
| SQ-M100 | 100 L | Ø420 × 700 | 1150 × 770 × 1520 | 310 kg | 15 kVA · 380 V ⚠ |
| SQ-M200 | 200 L | Ø500 × 1000 | 1360 × 810 × 1580 | 360 kg | 18 kVA · 380 V |

⚠ Una ficha del SQ-M100 dice 220 V.

**Modelos de central, vacío pulsante** [F11, F11c]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso |
|---|---|---|---|---|
| MD.JD-250S | 255 L | ⚠ no publicadas | ⚠ | ⚠ |
| MD.JD-360S | 360 L | ⚠ no publicadas | ⚠ | ⚠ |
| MD.JD-450S | 450 L | ⚠ no publicadas | ⚠ | ⚠ |
| PVS·JD-600 | 638 L | 610 × 910 × 1150 | 1440 × 1950 × 1620 | 1.250 kg |
| PVS·JD-800 | 832 L | 610 × 910 × 1500 | 1440 × 1950 × 2050 | 1.400 kg |
| PVS·JD-1000 | 1.001 L | 610 × 910 × 1820 | 1440 × 1950 × 2100 | 1.550 kg |
| PVS·JD-1200 | 1.203 L | 680 × 1180 × 1500 | 1480 × 1980 × 2100 | 1.950 kg |
| PVS·JD-1500 | 1.500 L | 680 × 1180 × 1900 | 1616 × 2150 × 2315 | 2.390 kg |

- Las tallas de 255, 360 y 450 L solo tienen volumen publicado. En la tabla se muestran con "—" en las demás columnas, y no se inventa ninguna medida.
- Los sufijos S y D aparecen en ambas versiones (600S/600D, 800S/800D). ⚠ Sanqiang no define qué significan. Por convención del sector suelen ser una puerta (S) y doble puerta (D), pero no se publica hasta confirmarlo.
- Verifiqué todos los volúmenes contra las medidas de cámara y cuadran.

**Ciclos (mesa SQ-Z23, tiempo total)** [F11d]:
- Sólidos 134 °C: 18–30 min
- Envuelto 134 °C: 30–40 min
- Textil: 45–65 min
- Priones: 45–70 min
- Plásticos 105 °C: 50–65 min
- Bowie-Dick: 22–35 min
- Vacío: 4–10 min

En central, los tiempos de ciclo no están publicados ⚠.

**Instalación (central)** [F11]:
- Presión máxima de trabajo: 0,28 MPa.
- Temperatura máxima: 139 °C.
- Fuga de vacío: ≤ 0,13 kPa/min.
- Alimentación: 380 V, 50 Hz ⚠. La tienda oficial dice 220 V, pero una potencia de 48–54 kVA solo es posible en trifásico.

**Normas declaradas:**
- Mesa: Clase B.
- Compactos: EN 13060.
- Central: CE, ISO 13485 y ASME.
- **No declara EN 285. No publicar "EN 285" ni "Clase B" para la central.**

**Diferenciales:** 18–1.500 L · uniformidad ±0,5 °C · 1–99 pulsos de vacío.

**No se publica:** los verticales SQ-ZL, que son de laboratorio.

### 5.5 `sanqiang/plasma`: SQ-WD
- **Lead:** Plasma de peróxido de hidrógeno de 100 a 190 L, con ciclo corto de 30 minutos y agente en cápsula.
- **Franja:**
  - Cámara: 100 · 135 · 190 L
  - Ciclo: 30 / 50 / 60 min
  - Temperatura: 45–55 °C
  - Norma del equipo: EN ISO 14937
- **Descripción:** sin cambios frente a la v2.

**Modelos** [F10, F11b]

| Modelo | Cámara | Medidas de cámara (mm) | Medidas externas (mm) | Peso | Potencia |
|---|---|---|---|---|---|
| SQ-WD-100 | 100 L | 700 × 430 × 360 | 1067 × 790 × 1782 | 301 kg | 3,4 kVA |
| SQ-WD-135 | 135 L | 750 × 450 × 400 | 1067 × 790 × 1782 | 308 kg | 3,5 kVA |
| SQ-WD-190 | 190 L | 820 × 510 × 460 | 1067 × 790 × 1782 | 341 kg | 4,3 kVA |

Los tres modelos comparten el mismo gabinete; solo cambia la cámara.

- **Instalación:** 220 V monofásico, sin agua.
- **Normas declaradas:** EN ISO 14937, EN ISO 13485:2016, EN 61010-2-040 y GB 27955-2020.
- **Diferenciales:** hasta 190 L · ciclo corto de 30 min · cápsula y 220 V.
- ⚠ **Lúmenes:** el dato de 1 mm × 1 m (rígido) y 1 mm × 3 m (flexible) es de las series SQ-D y SQ-DZ. Para la SQ-WD no está publicado.

### 5.6 `sanqiang/termodesinfectoras`: SQ-X y SQ-KX
- **H1:** Termodesinfectoras Sanqiang
- **Lead:** Termodesinfectoras de 350 a 560 L, de 8 a 12 cestas DIN, que lavan, desinfectan térmicamente y secan en un solo ciclo.
- **Franja:**
  - Capacidad: 8 a 12 cestas DIN
  - Cámara: 350–560 L
  - Desinfección: más de 90 °C (93–97 °C en la serie KX)
  - Alimentación: 380 V trifásico
- **Descripción:**
  - La serie KX trabaja entre 93 y 97 °C en la fase de desinfección, con 12 cestas en 4 niveles y programas estándar más configurables.
  - La SQ-X360 es la opción compacta, de doble puerta, con 8 cestas en 4 niveles.
  - El secado es por aire caliente a más de 100 °C [F12, F12b].

**Modelos**

| Modelo | Cámara | Cestas DIN | Medidas de cámara (mm) | Medidas externas (mm) | Potencia |
|---|---|---|---|---|---|
| SQ-X360 | 350 L | 8, en 4 niveles | 627 × 595 × 980 | 950 × 825 × 2060 | 31 kVA |
| SQ-KX-490 | 470 L | 12, en 4 niveles | 693 × 728 × 935 | 1190 × 900 × 2020 | 30 kVA |
| SQ-KX-530 | 536 L | 12, en 4 niveles | 693 × 828 × 935 | 1270 × 1000 × 2020 | 40 kVA |
| SQ-X560 | 560 L | 8 o 12 ⚠ | 750 × 740 × 940 | 1350 × 1050 × 2100 | 31 kW |

- **Instalación:** 380 V trifásico, 50 Hz; agua a 0,2–0,5 MPa; ≤ 75 dB [F12b].
- **Normas declaradas:** CE e ISO 13485. ⚠ No declara ISO 15883 ni el valor A0.
- ⚠ **Programas:** la ficha de la KX dice "6 + 11" en un lugar y "6 + DIY" en otro. No se publica un número; se escribe "programas estándar y configurables".
- **Diferenciales:** hasta 12 cestas DIN · 93–97 °C · 380 V.

### 5.7 `sanqiang/residuos-hospitalarios`
- **Estado:** `publicado: false` (recomendado).
- **Por qué:** Sanqiang no muestra ningún equipo de residuos en su sitio, en su tienda oficial ni en búsquedas abiertas [F10, F11b]. La existencia del equipo la confirmó Felipe, no el fabricante.
- **Para publicar, se necesita del proveedor:** modelo, capacidad (kg/ciclo o kg/h), temperatura y presión, tipo de triturado, reducción log validada, medidas, acometidas, certificaciones y brochure.
- Mientras tanto, el dropdown y la página de Sanqiang no listan Residuos.
- Cuando llegue la ficha, se usa el copy provisional de la v2 (§5.7) más los datos.

### 5.8 `celitron/residuos-hospitalarios`: ISS
- **Lead:** Esterilizador y triturador integrado: el residuo biosanitario se tritura y se esteriliza con vapor a 134 °C en un solo recipiente, dentro del hospital.
- **Franja:**
  - Cámara: 150 L
  - Capacidad: 15–30 kg/h
  - Ciclo: 30–40 min
  - Inactivación: SAL > 6 log₁₀
- **Descripción:**
  - El ISS carga el residuo, lo tritura con cuchillas reversibles y lo esteriliza con vapor a 134 °C sin abrir el recipiente.
  - No hay manipulación de residuo infeccioso entre la trituración y la esterilización.
  - Sale estéril, seco y reducido a una quinta parte de su volumen, y se dispone como residuo ordinario.
  - Celitron fabrica la línea en tres tamaños (25, 150 y 560 L); el sitio publica la ficha del modelo de 150 L, recomendado para hospitales medianos [F19, F20].

**Modelo con ficha vigente** [F20]

| Modelo | Cámara | Capacidad | Ciclo | Medidas externas (mm) | Peso | Potencia |
|---|---|---|---|---|---|---|
| ISS AC-575 | 150 L · Ø502 × 800 mm | 15–30 kg/h | 30–40 min | 1290 × 2150 × 2039 | 880 kg | 36 kW con generador · 380–400 V trifásico |

**Otros tamaños.** Se mencionan en la descripción; no van en la tabla ni en la franja hasta tener la ficha vigente.

| | ISS 25 L | ISS 560 L |
|---|---|---|
| Capacidad | 5–7,5 kg/h ⚠ | 100–150 kg/h ⚠ |
| Fuente | Folleto 2019 de un tercero [F20b] | Folleto 2019 de un tercero [F20b] |

- **Programas:** residuos, textiles, residuo especial, vidrio, prueba dinámica y limpieza.
- **Instalación:** generador de vapor, ósmosis inversa y drenaje vienen como accesorios estándar.
- **Normas declaradas:** CE, Directiva de Máquinas 2006/42/CE, PED 2014/68/UE, EMC 2014/30/UE, RoHS II.
- **Diferenciales:** un solo recipiente · 15–30 kg/h · reducción a 1/5 del volumen.
- **Brochure:** ISS medical [F20].

### 5.9 `akarmak/residuos-hospitalarios`: AKR
- **Lead:** Sistemas de esterilización de residuos biosanitarios con vapor y trituradora propia, desde 20 kg por ciclo en un hospital hasta 1.800 kg por ciclo en planta centralizada.
- **Franja:**
  - Por lote (serie L): 20–300 kg/ciclo
  - Planta (serie A): 500–1.800 kg/ciclo
  - Inactivación: hasta 8 log₁₀
  - Temperatura: 135–155 °C
- **Descripción:** sin cambios frente a la v2. La serie A se describe como "planta centralizada de alto volumen", no como "en continuo", porque el fabricante también la publica por ciclo.

**Modelos** [F15]

| Modelo | Tipo | Capacidad | Ciclo | Proceso | Inactivación |
|---|---|---|---|---|---|
| AKR250L | Trituración previa · hospital | 20–30 kg/ciclo | 30–35 min | 135–140 °C · 3–4 bar | 8 log₁₀ |
| AKR500L | Trituración previa · hospital | 50–70 kg/ciclo | 30–35 min | 135–140 °C · 3–4 bar | 8 log₁₀ |
| AKR1000L | Trituración previa · hospital | 100–130 kg/ciclo | 40–45 min | 135–140 °C · 3–4 bar | 8 log₁₀ |
| AKR2500L | Trituración previa · planta | 250–300 kg/ciclo | 50–60 min | 135–140 °C · 3–4 bar | 8 log₁₀ |
| AKR500A | Trituración posterior · planta | 500–700 kg/ciclo | 35–40 min | 140–155 °C · 4–5 bar | 6 log₁₀ |
| AKR1000A | Trituración posterior · planta | 1.000–1.250 kg/ciclo | 45–50 min | 140–155 °C · 4–5 bar | 6 log₁₀ |
| AKR1500A | Trituración posterior · planta | 1.500–1.800 kg/ciclo | 50–55 min | 140–155 °C · 4–5 bar | 6 log₁₀ |

⚠ Los tiempos de la serie A y las cifras de log salen de los PDFs, no de la web.

- **Normas y validación:** PED, ASME VIII, AD 2000 e ISO 9001:2015. En el sitio va "validación declarada por el fabricante: Instituto Robert Koch, STAATT nivel IV" hasta tener el informe.
- ⚠ **No se publican:** volumen de cámara de la serie A (tres versiones distintas entre documentos), potencias (los dos PDFs no coinciden) ni el porcentaje "99,9999 %", que corresponde a 6 log y no a 8.
- **Diferenciales:** de hospital a planta · hasta 8 log₁₀ · trituradora propia.

### 5.10 `2i/indicadores-quimicos`
- **Lead:** Indicadores químicos de las clases 4, 5 y 6 de ISO 11140-1, prueba de Bowie-Dick y paquetes de prueba, para vapor, peróxido de hidrógeno, óxido de etileno y formaldehído.
- **Franja:**
  - Clases: 2 · 4 · 5 · 6
  - Métodos: 4
  - Lectura: inmediata
- **Descripción:** el portafolio cubre el primer ciclo del día (Bowie-Dick) y el centro de cada paquete (multivariables, integradores y emuladores). El integrador de vapor es Tipo 5 y responde a tiempo, temperatura y vapor [F21].

**Presentaciones**

| Tipo | Producto | Método | Presentación |
|---|---|---|---|
| 2 ⚠ | Bowie-Dick | Vapor | ⚠ |
| — | PCD (paquete de prueba) | Vapor | ⚠ |
| 4 | Multivariable | Vapor | ⚠ |
| 4 | Multivariable | Peróxido de hidrógeno vaporizado | ⚠ |
| 4 | Multivariable | Formaldehído | ⚠ |
| 5 | Integrador | Vapor | 25 · 100 · 250 |
| 5 | Integrador | Óxido de etileno | ⚠ |
| 6 | Emulador | Vapor | ⚠ |

⚠ El Tipo 2 del Bowie-Dick lo asigna el distribuidor, no 2i.

- **Normas:** ISO 11140-1.
- **Diferenciales:** 4 métodos · integrador Tipo 5 · Bowie-Dick y PCD.
- **Se elimina:** la etiqueta de proceso Tipo 1, que no está en el catálogo de 2i, y la afirmación "sin metales pesados, vida útil de 5 años", que no tiene fuente oficial.

### 5.11 `2i/indicadores-biologicos`
- **Lead:** Indicadores biológicos autocontenidos con lectura desde 19 minutos en vapor, y lectoras e incubadora propias.
- **Franja:**
  - Lectura en vapor: 19 min a 24 h
  - Métodos: vapor, peróxido de hidrógeno, formaldehído y óxido de etileno
  - Lectoras de 4 y 12 pozos
- **Descripción:** el indicador de vapor lleva un mínimo de 10⁶ esporas de *Geobacillus stearothermophilus* (D121 entre 1,5 y 3 min) y se incuba a 60 ± 2 °C en lectora automática. Cumple ANSI/AAMI/ISO 11138-1:2017 [F21b].

**Presentaciones** [F21]

| Producto | Método | Lectura | Caja |
|---|---|---|---|
| Vapor 19 min | Vapor | 19 min | 50 |
| Vapor 1 h | Vapor | 1 h | 50 |
| Vapor 3 h | Vapor | 3 h | 50 |
| Vapor 8 h | Vapor | 8 h | 50 |
| Vapor 24 h | Vapor | 24 h | 10 |
| VH₂O₂ 24 min / 8 h | Peróxido de hidrógeno | 24 min / 8 h | 50 |
| FORM 2 h / 8 h | Formaldehído | 2 h / 8 h | 50 |
| EO 4 h / 12 h ⚠ | Óxido de etileno | 4 h / 12 h | 50 |

⚠ El sitio de 2i llama al EO 12 h "indicador pH". Hay que confirmarlo.

- **Equipos:** lectora de 4 pozos, lectora de 12 pozos y mini incubadora de 6 pozos.
- **Normas:** ISO 11138-1 (vapor).
- **Diferenciales:** desde 19 min · 4 métodos · lectoras propias.
- ⚠ Para peróxido, formaldehído y óxido de etileno no se publican ni organismo ni población. No se publican hasta tener la ficha.

### 5.12 a 5.14 Servimedical: papel y Tyvek, mobiliario y repuestos
Sin cambios frente a la v2. Siguen pendientes el catálogo propio y las fotos.

---

## 6. Lo que se elimina o se mueve

| Hoy en el sitio | Acción |
|---|---|
| Fila "Fabricante · {origen} · desde {año}" en el hero de producto | **Se elimina.** |
| Sección "Dónde entra en la central" en marcas | **Se elimina.** |
| Imagen fija del hero de la home | Pasa a carrusel (§2.5). |
| Tuttnauer 4480 (140 L) | **Se elimina.** No existe en fuentes oficiales. |
| Tuttnauer vapor "120–1.010 L" | Pasa a 21–1.010 L, con familias de mesa, medianos y central. |
| Sanqiang vapor "250–1.500 L" | Pasa a 18–1.500 L, con familias de mesa, compactos y central; volúmenes reales de la tabla técnica. |
| Sanqiang SQ-X360 con "12 cestas · 17 programas" | 8 cestas; los 93–97 °C solo para KX; sin número de programas. |
| Celitron "25 · 150 · 560 L · 5–150 kg/h" en la franja | Franja del AC-575: 150 L · 15–30 kg/h · 30–40 min. |
| Celitron lead "15 a 35 minutos" | Se quita el tiempo del lead. |
| Akarmak serie A "kg/h" y AKR1000A "1.000–1.200" | Pasa a kg/ciclo y 1.000–1.250. |
| 2i Tipo 1 y "sin metales pesados" | Se eliminan. |
| Página `sanqiang/residuos-hospitalarios` | `publicado: false` hasta tener la ficha. |
| Tuttnauer "130 países", "Países Bajos e Israel" e ISO 22441 en PlazMax | Se corrigen con el redeploy y los datos de esta v3. |
| Dropdown 2i con un solo producto | Se agrega Indicadores biológicos. |
| Menú móvil sin Tuttnauer | Se agrega Tuttnauer. |

---

## 7. Pendientes para Felipe

1. **Sanqiang residuos:** ficha del proveedor (modelo, capacidad, proceso, normas y brochure). Sin ella, la página queda oculta.
2. **Celitron:**
   - Rol de Servimedical (representante o distribuidor).
   - Fichas vigentes del ISS de 25 L y de 560 L.
   - Año de fundación.
3. **Akarmak:** informe de validación del Instituto Robert Koch y STAATT IV.
4. **Tuttnauer:**
   - Confirmación escrita de que el PlazMax es monofásico.
   - Declaración de conformidad ISO 15883 y valor A0 de las TIVA.
   - Volumen real del 5075HSG (147 o 160 L).
   - Potencia del 69180.
   - ¿Servimedical vende los verticales de laboratorio ELV o T-Lab? Si sí, se agrega un bloque.
5. **Sanqiang:**
   - Significado de los sufijos S y D.
   - Voltaje de la serie JD.
   - Medidas de las tallas de 255, 360 y 450 L.
   - Tiempos de ciclo de central.
   - Límite de lúmenes de la SQ-WD.
   - Número de programas de la KX.
6. **2i:**
   - Registro INVIMA e ISO 13485.
   - Fichas técnicas de los biológicos de baja temperatura y de los químicos.
   - Presentaciones de los químicos.
7. **Registros INVIMA por producto,** empezando por el SQ-WD-135, el PlazMax y los autoclaves.
8. **Catálogo propio** de papel, Tyvek, mobiliario y repuestos.
9. **Fotos:**
   - Producto: 1600 × 1200 px en `public/productos/{marca}-{linea}/`.
   - Carrusel de la home: 1600 × 1280 px en `public/home/hero/`.
10. **Líneas futuras posibles** (no se publican ahora):
    - Sanqiang: óxido de etileno, formaldehído, reprocesadora de endoscopios, secado y plasma SQ-D / SQ-DZ.
    - Tuttnauer: lavachatas Revo / Revo Pro (con A0 ajustable e ISO 15883-3 declarados) y gabinetes de secado Dry-INS.

---

## 8. Fuentes

| # | Fuente |
|---|---|
| F1 | Tuttnauer, empresa: https://tuttnauer.com/autoclave-manufacturer · https://tuttnauer.com/about/quality-assurance |
| F2 | Tuttnauer, autoclaves de central: https://tuttnauer.com/medical-autoclaves/hospital-cssd/large-autoclaves · 5596, T-Max 6 y 8, 6671130 y 69180 en sus subpáginas · GS: https://tuttnauer.com/medical-autoclaves/hospital-cssd/gs-autoclaves/gs5075 y /gs50125 |
| F2a | Tuttnauer, mesa: T-Top https://tuttnauer.com/medical-autoclaves/medical-clinics-or/tabletop-autoclaves/pre-post-vacuum-autoclaves/t-top · T-Edge …/t-edge · Clase S https://tuttnauer.com/medical-autoclaves/medical-clinics-or/tabletop-autoclaves/class-s-class-n-autoclaves/2540eka · …/ea-and-eka · …/d-line-ea-and-eka |
| F2b | Tuttnauer, HSG: https://tuttnauer.com/medical-autoclaves/medical-clinics-or/medium-autoclaves/hsg-d-line/3870hsg-d-line · …/5075hsg-d-line/technical-specifications |
| F2c | Tuttnauer, verticales de laboratorio: https://tuttnauer.com/laboratory-autoclaves/laboratory-research/vertical-autoclaves/elv-d-line |
| F3 | Tuttnauer, tabla técnica 44/55 Compact: https://tuttnauer.com/medical-autoclaves/hospital-cssd/large-autoclaves/44-and-55-compact-series/technical-chart · ficha PDF v2.5 (ver v2) |
| F4 | Tuttnauer, PlazMax: https://tuttnauer.com/medical-autoclaves/low-temperature-sterilizer |
| F5 | Tuttnauer, folletos PlazMax 2020 (ES, FR y DE): https://tuttnauer.com/sites/default/files/brochures/plazmax-low-temperature-plasma-sterilizer--tuttnauer--es--29-11-2020.pdf (las versiones `--fr--` y `--de--` llevan el mismo nombre) |
| F7 | Tuttnauer, folleto TIVA 2022: https://www.tuttnauer.com/sites/default/files/2023-11/TIVA-disinfector-washers--Tuttnauer-EN-2022.pdf · Tiva 2: https://tuttnauer.com/sites/default/files/brochures/tiva2-washer-disinfector-tuttnauer-09-02-21.pdf |
| F8 | Tuttnauer, Tiva 8: https://tuttnauer.com/sites/default/files/2022-07/tiva-8-washer-disinfector-tuttnauer-05-07-22.pdf |
| F10 | Sanqiang, plasma SQ-WD: https://www.sanqiangmedical.com/Plasma-Sterilizer.html |
| F11 | Sanqiang, vapor grande: https://www.sanqiangmedical.com/Large-autoclave-sterilizer.html |
| F11b | Sanqiang, tienda oficial verificada: https://sq-sterilization.en.made-in-china.com/ · perfil de empresa: https://sq-sterilization.en.made-in-china.com/company-Henan-Sanqiang-Medical-Equipment-Liability-Co-Ltd-.html · SQ-WD: https://fr.made-in-china.com/co_sq-sterilization/product_Strong-Penetration-Sq-Wd-Hydrogen-Peroxide-Low-Temperature-Plasma-Sterilizing-Device-for-Surgical-Instruments_uooughsngu.html |
| F11c | Sanqiang, tabla técnica PVS·JD: https://fr.made-in-china.com/co_sq-sterilization/product_Large-Capacity-Corrosion-Resistant-Sq-Pvs-Jd-Hospital-Pulsating-Vacuum-Sterilizer_uoouieiueu.html |
| F11d | Sanqiang, mesa SQ-Z: https://www.sanqiangmedical.com/Tabletop-autoclave.html · https://fr.made-in-china.com/co_sq-sterilization/product_18L-23L-45L-Lab-Clinic-Dental-Equipment-Portable-Vertical-Steam-Sterilizer-Autoclave-Machine-Class-B-Type-Pre-Vacuum-Pressure_yyouugesrg.html |
| F11e | Sanqiang, SQ-M100 y M200: https://www.sanqiangmedical.com/Horizontal-autoclave.html |
| F12 | Sanqiang, SQ-X360: https://www.sanqiangmedical.com/Automatic-cleaning-and-disinfection-device.html · https://sq-sterilization.en.made-in-china.com/product/TRAUYagKuwVx/China-Cssd-Reliable-360L-Washer-for-All-Kinds-of-Surgical-Room-Tools.html |
| F12b | Sanqiang, SQ-KX: https://sq-sterilization.en.made-in-china.com/product/QYdRhCsrlOWe/China-470L-Sq-Kx490-536L-Sq-Kx530-Fully-Automatic-Medical-Instrument-Cleaning-Disinfection-Washer.html · SQ-X560: https://fr.made-in-china.com/co_sq-sterilization/product_High-Efficiency-350L-Washer-Disinfector-for-Cssd-or_yyougogshg.html |
| F14 | Akarmak, empresa: https://www.akarmak.com/en/corporate/about-us |
| F15 | Akarmak, residuos: https://www.akarmak.com/en/products/medical-waste-sterilization · …/pre-autoclave-shredding · …/post-autoclave-shredding · PDFs https://www.akarmak.com/uploads/urunler_kategori/1687132054.pdf y https://www.akarmak.com/uploads/urunler/1689584745.pdf |
| F16 | Celitron, empresa: https://celitron.com/en/about-us |
| F19 | Celitron, ISS: https://celitron.com/en/medical-sharps-waste-disposal-iss |
| F20 | Celitron, ficha ISS AC-575: https://celitron.com/storage/download/iss-medical-en.pdf · https://celitron.com/storage/download/ISS-EN.pdf |
| F20b | Celitron, folleto 2019 alojado por un tercero: https://hepa.hu/uploads/2ab51fe01d4b1f430eb0b2d2e1b7be23.pdf |
| F21 | 2i Health Care: https://www.2i.ind.br/ · distribuidor oficial: https://magazinemedica.com.br/marcas/2i-health-care/ |
| F21b | 2i, ficha técnica de los biológicos de vapor, Rev. 02 2023: https://storage.googleapis.com/ballke-bucket/media/images/ProductFile/1f44cd1fcad2ac2ae2db84e9ea498f46.pdf |
| F23–F28 | Igual que en la v2 (DuPont Tyvek, ISO 11607, Resoluciones 3100/2019 y 2183/2004, AAMI ST79 y kit de mantenimiento preventivo Tuttnauer). |

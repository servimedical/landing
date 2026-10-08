# Servicios · qué exige la norma y qué entrega el sector

Investigación para reescribir `/servicios`. Consultada el 8 de octubre de 2026.

---

## 1 · Entregables estándar por servicio

Lo que Steris, Getinge, Tuttnauer, Belimed y Matachana entregan en papel, que
es el patrón que un jefe de central ya conoce y con el que va a comparar.

| Servicio | Lo que recibe la institución |
|---|---|
| Instalación | Acta de instalación, protocolo de IQ firmado, lista de verificación de acometidas, manual de operación en español |
| Calificación | Protocolos de IQ, OQ y PQ con sus datos crudos; certificados de calibración de los patrones usados, con trazabilidad |
| Mantenimiento preventivo | Orden de trabajo firmada, informe técnico por visita, actualización de la hoja de vida del equipo, cronograma del año |
| Mantenimiento correctivo | Informe de falla con causa, repuestos cambiados con su referencia, pruebas de aceptación posteriores |
| Entrenamiento | Lista de asistencia, constancia por persona, material entregado |
| Diseño de central | Planos de flujo y zonificación, memorias de cálculo de dotación, requerimientos de acometidas, presupuesto de equipamiento |

El patrón común: **nada vale sin el papel**. Una auditoría de habilitación no
mira el equipo, mira la carpeta.

---

## 2 · Qué norma exige cada cosa (Colombia)

### Resolución 3100 de 2019 — habilitación

El estándar de dotación obliga a toda IPS a tener:

- **Inventario** de equipo biomédico con nombre, marca, modelo, serie,
  registro sanitario y clasificación de riesgo.
- **Programa de mantenimiento preventivo** siguiendo las recomendaciones del
  fabricante.
- **Hoja de vida por equipo**, con el registro del mantenimiento preventivo y
  correctivo realizado.

Los hallazgos típicos de auditoría son: hojas de vida incompletas,
incumplimiento del plan preventivo según especificación del fabricante, falta
de documentación verificable (INVIMA, declaración de importación) y órdenes de
trabajo sin firma.

**Fuente:** Resolución 3100 de 2019, Ministerio de Salud y Protección Social.

### Decreto 4725 de 2005 — dispositivos médicos

- **El fabricante o importador debe ofrecer** verificación de calibración,
  mantenimiento, suministro de insumos y repuestos, y el entrenamiento
  necesario para la operación y el mantenimiento básico del equipo.
- Los **repuestos** para mantenimiento de equipo biomédico importado deben
  estar amparados por el permiso de comercialización del equipo que van a
  reparar, y la importación debe reportarse al INVIMA.

Esto es importante para el argumento comercial: **el servicio no es un extra,
es una obligación del importador**. Quien vende sin sostener incumple.

**Fuente:** Decreto 4725 de 2005, artículos sobre obligaciones posventa.

### ISO 17665 — esterilización por calor húmedo

Marco de validación: IQ (el equipo se instaló según su especificación), OQ
(opera dentro de límites predeterminados) y PQ (el proceso es efectivo sobre
el producto real).

> **⚠ Corrección a la nomenclatura del encargo.** El encargo cita «ISO
> 17665-1». En **2024 la ISO consolidó las tres partes en un documento
> único, ISO 17665:2024**. Citar «-1» en una ficha de 2026 delata que la
> referencia se copió de un documento viejo. En el sitio se cita
> **«ISO 17665»** sin número de parte.

La revalidación anual es buena práctica internacional, no una exigencia
explícita de la norma colombiana. **Se presenta como lo que es.**

### Otras que aplican

- **Resolución 2183 de 2004** — Manual de buenas prácticas de esterilización.
  ⚠ No se consiguió el texto vigente en esta investigación. **No se cita en el
  sitio hasta verificarlo.**
- **Resolución 4816 de 2008** — tecnovigilancia: obliga a reportar eventos e
  incidentes adversos con dispositivos médicos.
- **ISO 15883** — lavadoras-desinfectadoras, con el concepto de valor A0.
- **ISO 14937** y **ISO 22441** — esterilización a baja temperatura.
- **EN 285** — autoclaves grandes. ⚠ Solo se cita para equipos cuyo fabricante
  la declare.
- **Metrología** — la calibración de los patrones usados en una calificación
  debe tener trazabilidad a laboratorios acreditados por la **ONAC**.

### Diseño de centrales

Flujo unidireccional, zonas sucia / limpia / estéril, presiones
diferenciales, renovaciones de aire y acabados sanitarios.

> **⚠ No se identificó una norma colombiana específica** que fije
> renovaciones de aire y presiones diferenciales para una central de
> esterilización. La referencia habitual del sector es la guía internacional
> **AAMI ST79**, que **no es norma colombiana**. En el sitio, si se menciona,
> se dice explícitamente que es internacional.

---

## 3 · Vocabulario del sector

El que usa un jefe de central o un ingeniero biomédico en Colombia:

central de esterilización (no CEYE, que es mexicano) · IPS · habilitación ·
hoja de vida del equipo · tecnovigilancia · registro sanitario INVIMA ·
calificación IQ/OQ/PQ · ciclo de aceptación · prueba de Bowie-Dick · prueba de
fuga de vacío · liberación de carga · carga parametrizada · valor A0 ·
acometida · flujo unidireccional · zona sucia / limpia / estéril · set
quirúrgico · rotación de sets · equipo detenido.

---

## 4 · Lo que no se puede escribir

Sin dato o sin fuente, fuera:

- **Tiempos de respuesta.** No hay SLA confirmado. ⚠ Queda marcador en datos y
  la cifra no se renderiza.
- **Número de técnicos y ciudades.** ⚠ Sin confirmar.
- **Existencias de repuestos.** Decir «repuesto en inventario» exige saber de
  qué equipos. ⚠ Sin confirmar.
- **«Líderes», «soluciones integrales», «alta calidad».** Prohibidas por la
  guía de voz; el validador rompe el build si aparecen.
- **Certificación ISO propia de Servimedical.** ⚠ No consta ninguna.

/* ============================================================================
   NOMBRES ANTERIORES

   Un identificador de producto aparece en dos sitios fuera del código: en las
   URLs que ya están indexadas y en los nombres de archivo de las fotos que
   sube una persona. Las URLs las cubre `integraciones/redirecciones.mjs`; los
   archivos, este mapa.

   Sirve para que renombrar una línea no obligue a Felipe a renombrar también
   las fotos el mismo día. Las herramientas aceptan el nombre viejo, resuelven
   al nuevo y avisan de que conviene renombrar.

   No es permanente: cuando los archivos estén al día, una entrada se puede
   borrar y lo único que pasa es que ese nombre deja de ser aceptado.
   ========================================================================== */

/** Identificador viejo → identificador actual, en la forma `{marca}-{slug}`. */
export const ALIAS_PRODUCTO: Record<string, string> = {
  // Ronda del 8 de octubre: la línea nombra el equipo, no el agente físico.
  'tuttnauer-vapor': 'tuttnauer-autoclaves',
  'sanqiang-vapor': 'sanqiang-autoclaves',
  'tuttnauer-plasma': 'tuttnauer-baja-temperatura',
  'sanqiang-plasma': 'sanqiang-baja-temperatura',

  // La marca propia pasó a llamarse SVM.
  'servimedical-papel-y-tyvek': 'svm-papel-para-esterilizacion',
  'svm-papel-y-tyvek': 'svm-papel-para-esterilizacion',
  'servimedical-mobiliario-acero-inoxidable': 'svm-mobiliario-acero-inoxidable',
  'servimedical-repuestos': 'svm-repuestos',
};

/** Devuelve el identificador actual y si hubo que traducirlo. */
export const resolverProducto = (id: string) => {
  const actual = ALIAS_PRODUCTO[id];
  return { id: actual ?? id, erraVieja: Boolean(actual) };
};

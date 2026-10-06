/* ============================================================================
   MARCAS Y SUS LÍNEAS — fuente única del catálogo

   El catálogo se organiza por marca. Cada marca lleva las líneas que vende, y
   cada línea tiene su página en /marcas/<marca>/<linea>.

   Una línea pertenece a una sola marca. Si un producto lo venden dos marcas,
   son dos líneas con su propia página: duplicar la misma página bajo dos
   marcas no sirve ni al lector ni al buscador.

   {{ POR CONFIRMAR: el mapa completo de marca → líneas. Aquí está lo que se
   pudo confirmar; cada hueco lleva su marcador. }}
   ========================================================================== */

export type Marca = {
  slug: string;
  nombre: string;
  /** Qué resuelve dentro de la central. Una línea. */
  rol: string;
  /** Dos frases para el encabezado de su página. */
  intro: string;
  /** Slugs de `productos` que vende esta marca, en orden. */
  lineas: string[];
  /** Archivo del logotipo en /img/marcas/. Sin él se usa la marca tipográfica. */
  logo?: string;
  /** Dato que falta y que condiciona la página entera. */
  porConfirmar?: string;
  seo: { titulo: string; descripcion: string };
};

export const marcas: Marca[] = [
  {
    slug: 'tuttnauer',
    nombre: 'Tuttnauer',
    rol: 'Esterilización por vapor y por plasma de peróxido',
    intro:
      'Es la marca sobre la que se apoya el grueso de las centrales que montamos. Somos representantes en Colombia y sostenemos aquí el servicio técnico y el repuesto original.',
    lineas: ['autoclaves-de-vapor', 'plasma-de-peroxido'],
    seo: {
      titulo: 'Tuttnauer en Colombia — autoclaves y plasma de peróxido',
      descripcion:
        'Representamos Tuttnauer en Colombia: autoclaves de vapor y esterilización por plasma de peróxido, con servicio técnico propio y repuesto original desde Bogotá.',
    },
  },
  {
    slug: 'sanqiang',
    nombre: 'Sanqiang',
    rol: 'Lavado y desinfección térmica',
    intro:
      'Lavado y desinfección térmica con una estructura de costo distinta a la de la marca premium. Es la opción cuando la central necesita automatizar el lavado sin el presupuesto de la línea alta.',
    lineas: ['termodesinfectoras'],
    porConfirmar:
      '{{ POR CONFIRMAR: qué otras líneas de Sanqiang representa SVMG, y si incluye autoclaves de vapor }}',
    seo: {
      titulo: 'Sanqiang en Colombia — termodesinfectoras y lavado',
      descripcion:
        'Representamos Sanqiang en Colombia: lavado y desinfección térmica validada para endoscopios e instrumental de lúmenes, con servicio técnico propio.',
    },
  },
  {
    slug: 'servimedical',
    nombre: 'Servimedical',
    rol: 'Papel grado médico, mobiliario en acero y repuestos',
    intro:
      'Es nuestra propia línea: lo que la central consume todos los meses y el mobiliario que sostiene su flujo. Se abastece de forma programada contra el consumo real, no contra un pedido de urgencia.',
    lineas: [
      'papel-y-empaque',
      'almacenamiento-esteril',
      'mesas-y-mesones',
      'carros-de-transporte',
      'repuestos',
      'compresores',
      'tratamiento-de-agua',
    ],
    porConfirmar:
      '{{ POR CONFIRMAR: si compresores y tratamiento de agua son de marca propia o de un tercero —Hong Run salió del listado de marcas— }}',
    seo: {
      titulo: 'Servimedical — papel grado médico, mobiliario y repuestos',
      descripcion:
        'Línea propia de Servimedical: papel grado médico y empaque, mobiliario en acero AISI 304 y repuestos originales, con abastecimiento programado desde Bogotá.',
    },
  },
  {
    slug: '2i',
    nombre: '2i',
    rol: 'Indicadores químicos y biológicos',
    intro:
      'La evidencia del proceso. Sin sus indicadores una carga no se puede liberar ni demostrar ante el comité de infecciones.',
    lineas: ['indicadores-quimicos', 'indicadores-biologicos'],
    seo: {
      titulo: '2i en Colombia — indicadores químicos y biológicos',
      descripcion:
        'Representamos 2i en Colombia: indicadores químicos de proceso y de paquete, test de Bowie-Dick e indicadores biológicos para liberación de carga.',
    },
  },
  {
    slug: 'easymedical',
    nombre: 'Easymedical',
    rol: 'Sellado de empaque',
    intro:
      'El sellado es un proceso validable, no un gesto mecánico. Es un equipo pequeño con un peso desproporcionado en el resultado.',
    lineas: ['selladoras'],
    porConfirmar:
      '{{ POR CONFIRMAR: catálogo completo de Easymedical y si es la misma marca que antes figuraba como Easyseal }}',
    seo: {
      titulo: 'Easymedical en Colombia — selladoras de empaque',
      descripcion:
        'Representamos Easymedical en Colombia: selladoras térmicas con control de parámetros para rollo mixto y bolsas grado médico.',
    },
  },
  {
    slug: 'arkarmak',
    nombre: 'Arkarmak',
    rol: '{{ POR CONFIRMAR: qué cubre Arkarmak dentro de la central }}',
    intro:
      'Marca representada por Servimedical Group en Colombia. Su catálogo se publica en cuanto esté confirmado.',
    lineas: [],
    porConfirmar:
      '{{ POR CONFIRMAR: qué vende Arkarmak, qué líneas representa SVMG y cómo se escribe exactamente el nombre }}',
    seo: {
      titulo: 'Arkarmak en Colombia — Servimedical Group',
      descripcion:
        'Arkarmak, marca representada por Servimedical Group en Colombia, con servicio técnico propio y repuesto original desde Bogotá.',
    },
  },
  {
    slug: 'celitron',
    nombre: 'Celitron',
    rol: '{{ POR CONFIRMAR: qué cubre Celitron dentro de la institución }}',
    intro:
      'Marca representada por Servimedical Group en Colombia. Su catálogo se publica en cuanto esté confirmado.',
    lineas: [],
    porConfirmar:
      '{{ POR CONFIRMAR: qué líneas de Celitron representa SVMG —el sitio anterior la asociaba a tratamiento de residuos hospitalarios— }}',
    seo: {
      titulo: 'Celitron en Colombia — Servimedical Group',
      descripcion:
        'Celitron, marca representada por Servimedical Group en Colombia, con servicio técnico propio y repuesto original desde Bogotá.',
    },
  },
];

/** La marca que vende una línea. */
export const marcaDe = (slugLinea: string): Marca | undefined =>
  marcas.find((m) => m.lineas.includes(slugLinea));

/** URL canónica de una línea. */
export const urlLinea = (slugLinea: string): string => {
  const m = marcaDe(slugLinea);
  return m ? `/marcas/${m.slug}/${slugLinea}` : '/marcas';
};

export const urlMarca = (m: Marca) => `/marcas/${m.slug}`;

/** Rol presentable: un marcador nunca va a la vista del visitante. */
export const rolVisible = (m: Marca) =>
  m.rol.startsWith('{{') ? 'Marca representada en Colombia' : m.rol;

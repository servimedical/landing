/* Qué es cada marca, en una frase corta, y el logo sin texto que va junto a
   ella. Lo usan la franja «Marcas que representamos» y las tarjetas de
   «Nuestras marcas» (home y /marcas): el texto vive aquí para que las dos
   digan lo mismo, con la misma tipografía, en vez de venir dibujado en
   algunos logos y en otros no. Se muestra en mayúsculas desde el CSS. */
export const QUE_HACE: Record<string, string> = {
  sanqiang: 'Equipos para esterilización',
  tuttnauer: 'Equipos para esterilización',
  '2i': 'Indicadores químicos y biológicos',
  svm: 'Papel esterilización, Tyvek y vapor',
  akarmak: 'Tratamiento de residuos hospitalarios',
  easyseal: 'Selladoras para esterilización',
};

/** Logo sin el texto dibujado, en el lienzo común de 1500 × 800, para las
 *  marcas cuyo logo oficial lo trae (2i y SVM). Las demás usan el suyo. */
export const LOGO_SIN_TEXTO: Record<string, string> = {
  '2i': '/logos/marcas/2i.png',
  svm: '/logos/marcas/svm.svg',
};

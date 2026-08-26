/* ============================================================================
   {{ REQUIERE REVISIÓN JURÍDICA }}

   BORRADOR de la política de tratamiento de datos personales, redactado sobre
   la estructura que exigen la Ley 1581 de 2012 y el Decreto 1377 de 2013.

   NO PUBLICAR SIN VALIDACIÓN. Este texto lo tiene que revisar y aprobar quien
   lleve lo jurídico de Servimedical Group SAS antes de que el sitio salga a
   producción. Lo que hay aquí es un andamiaje correcto en su forma, no un
   documento con valor legal revisado.

   Mientras no esté aprobado, la página se publica igualmente porque un
   formulario sin política accesible expone más que un borrador marcado.
   ========================================================================== */

export const VIGENCIA = '{{ POR CONFIRMAR: fecha de entrada en vigencia }}';

/** Correo por el que se atienden consultas, reclamos y revocatorias. */
export const CANAL_TITULAR =
  '{{ POR CONFIRMAR: correo del responsable del tratamiento de datos y procedimiento interno de atención a solicitudes }}';

export type Seccion = { titulo: string; parrafos?: string[]; lista?: string[] };

export const politica: Seccion[] = [
  {
    titulo: 'Responsable del tratamiento',
    parrafos: [
      'Servimedical Group SAS, sociedad domiciliada en Bogotá D.C., Colombia, en la Transversal 27 N.º 53C-47, es responsable del tratamiento de los datos personales recogidos a través de este sitio web.',
      'Teléfono fijo +57 (601) 211 4014. WhatsApp +57 319 206 0943. Correo comercial@servimedicalgroup.com.',
    ],
  },
  {
    titulo: 'Datos que se recogen',
    parrafos: [
      'Este sitio recoge únicamente los datos que el titular escribe de forma voluntaria en alguno de sus tres formularios: solicitud de cotización, pedido de repuesto y solicitud de servicio técnico.',
    ],
    lista: [
      'Nombre y cargo de quien escribe',
      'Institución y ciudad',
      'Correo electrónico y teléfono de contacto',
      'La descripción de la necesidad, del equipo o de la falla que el titular decida incluir',
      'La página del sitio desde la que se envió la solicitud',
      'La fecha, la hora y la versión del texto de autorización aceptado',
    ],
  },
  {
    titulo: 'Finalidad del tratamiento',
    parrafos: [
      'Los datos se tratan con una sola finalidad: atender la solicitud comercial o técnica que originó el contacto y mantener la comunicación relacionada con ella.',
      'No se utilizan para envío de comunicaciones comerciales no solicitadas, no se ceden ni se venden a terceros, y no se emplean para elaborar perfiles.',
    ],
  },
  {
    titulo: 'Autorización',
    parrafos: [
      'Ningún formulario del sitio se envía sin que el titular marque de forma expresa la casilla de autorización. La casilla no viene marcada de antemano.',
      'Con cada envío se conserva la fecha, la hora y la versión exacta del texto que el titular aceptó, como prueba del consentimiento otorgado.',
    ],
  },
  {
    titulo: 'Derechos del titular',
    parrafos: [
      'De acuerdo con la Ley 1581 de 2012, el titular de los datos tiene derecho a:',
    ],
    lista: [
      'Conocer, de forma gratuita, los datos personales que sobre él reposen',
      'Actualizar y rectificar los datos que resulten parciales, inexactos, incompletos o que induzcan a error',
      'Solicitar la supresión de sus datos cuando no exista un deber legal o contractual que obligue a conservarlos',
      'Revocar la autorización otorgada, en cualquier momento y sin necesidad de justificar la decisión',
      'Ser informado del uso que se ha dado a sus datos personales',
      'Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley',
    ],
  },
  {
    titulo: 'Cómo ejercer estos derechos',
    parrafos: [
      `El titular puede ejercer cualquiera de estos derechos escribiendo a ${CANAL_TITULAR}, indicando su nombre, el dato de contacto que utilizó al escribir al sitio y la solicitud concreta.`,
      'Las consultas se atienden en los términos que fija la ley. Si la solicitud resulta incompleta, se pedirá al titular la información que falte antes de continuar.',
    ],
  },
  {
    titulo: 'Término de conservación',
    parrafos: [
      'Los datos se conservan durante el tiempo necesario para atender la solicitud que los originó y para dar continuidad a la relación comercial o técnica derivada de ella.',
      'Cuando la finalidad se agota y no existe un deber legal o contractual de conservación, los datos se suprimen. El titular puede pedir la supresión antes de ese momento por el canal indicado arriba.',
    ],
  },
  {
    titulo: 'Cookies y analítica',
    parrafos: [
      'Este sitio no instala cookies de seguimiento ni de publicidad, y no utiliza identificadores que permitan reconocer a una persona entre visitas.',
      'La medición de uso se hace de forma agregada y sin cookies: se registra qué páginas se consultan y qué elementos se usan, sin asociar esa información a una persona identificable. Por esa razón el sitio no muestra aviso de cookies: no hay nada que consentir.',
      'Si en el futuro se incorpora una herramienta que sí utilice cookies no esenciales, se añadirá el aviso correspondiente con opción de aceptar o rechazar antes de instalarlas.',
    ],
  },
  {
    titulo: 'Seguridad',
    parrafos: [
      'El sitio se sirve por conexión cifrada. Los datos de los formularios se transmiten al correo institucional de Servimedical Group SAS mediante un servicio de envío transaccional y no se almacenan en una base de datos del sitio web.',
    ],
  },
  {
    titulo: 'Cambios en esta política',
    parrafos: [
      'Cualquier cambio sustancial en esta política se publicará en esta misma página con una nueva fecha de vigencia. La versión del texto de autorización que acompaña a los formularios se actualiza junto con ella.',
    ],
  },
];

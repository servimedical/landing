/** Configuración de svgo para los logotipos de marca.
 *  Se conserva el viewBox —sin él el logo no escala dentro de la caja— y se
 *  ajusta al contenido para quitar el margen vacío del archivo original. */
export default {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    'removeDimensions',
    /* `removeXMLNS` NO: sirve para SVG incrustado en el HTML, pero un archivo
       servido como <img> sin xmlns no parsea y el navegador lo da por roto. */
    { name: 'removeAttrs', params: { attrs: '(data-name|class)' } },
  ],
};

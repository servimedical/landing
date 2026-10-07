/** Configuración de svgo para los logotipos de marca.
 *  Se conserva el viewBox —sin él el logo no escala dentro de la caja— y se
 *  ajusta al contenido para quitar el margen vacío del archivo original. */
export default {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    'removeDimensions',
    'removeXMLNS',
    { name: 'removeAttrs', params: { attrs: '(data-name|class)' } },
  ],
};

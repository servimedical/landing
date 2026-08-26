# Fotos de producto

Aquí van las fotos de las familias de producto. Se enlazan desde
`src/data/catalogo.ts`, en el campo `imagen` de cada familia:

```ts
{
  nombre: 'Autoclaves de gran capacidad',
  desc: '…',
  imagen: '/img/productos/autoclave-gran-capacidad.jpg',
  imagenAlt: 'Autoclave de doble puerta instalado en una central de esterilización',
}
```

Si una familia no tiene `imagen`, su ficha se muestra sólo con texto. No hay
que rellenarlas todas de una vez.

**Formato recomendado**

- 1200 × 900 px (4:3), JPG de calidad 80 o WebP
- Fondo neutro o el equipo instalado en sitio; evitar renders de catálogo
  del fabricante con marca de agua
- Nombre de archivo en minúsculas y con guiones, igual que el slug

**`imagenAlt` es obligatorio si hay imagen**: describe lo que se ve, no repitas
el nombre de la familia.

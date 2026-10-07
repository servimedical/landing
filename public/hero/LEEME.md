# Imagen del hero

Una sola imagen: el equipo que protagoniza la portada.

## El archivo

| | |
|---|---|
| **Nombre** | `autoclave-tuttnauer.webp` |
| **Alternativa** | `autoclave-tuttnauer.png`, si no tiene WebP |
| **Fondo** | **Transparente.** El equipo recortado, sin fondo blanco |
| **Alto mínimo** | 1.600 px. Por debajo se ve borroso en pantallas retina |
| **Peso máximo** | 300 kB |

## Cómo cambiarla

Reemplace el archivo por otro con el mismo nombre. No hay que tocar código.

```bash
npm run hero
```

Ese comando revisa que el archivo exista, mide ancho y alto, comprueba si
tiene fondo transparente, avisa si pesa de más, recorta los márgenes vacíos y
genera las dos versiones que sirve la página:

```
autoclave-tuttnauer-1600.webp   pantallas grandes
autoclave-tuttnauer-800.webp    móvil
```

Las generadas no se tocan a mano: se vuelven a crear cada vez que corre el
comando.

## Si no hay imagen

La portada se arma igual. El panel gris queda vacío con la etiqueta del
equipo, y el sitio compila sin errores: sólo sale un aviso en la consola.
Nada se rompe por no tener la foto.

## De dónde sacarla

Del kit de prensa de Tuttnauer, de su ficha técnica en PDF —muchas traen la
foto en alta— o pidiéndosela al contacto comercial del fabricante. Si la que
consigue tiene fondo blanco, hay que recortarlo antes: `npm run hero` lo avisa
pero no lo hace, porque recortar mal un equipo se nota más que no recortarlo.

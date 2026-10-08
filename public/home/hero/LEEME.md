# Carrusel del hero

Las fotos de equipo que rotan en la portada. Cada archivo se empareja solo con
su producto, y de ahí salen la etiqueta y el enlace: no se escriben a mano.

## Cómo se llaman los archivos

```
public/home/hero/
  01-tuttnauer-vapor.webp
  02-tuttnauer-plasma.webp
  03-tuttnauer-termodesinfectoras.webp
  04-sanqiang-vapor.webp
  05-akarmak-residuos-hospitalarios.webp
  06-2i-indicadores-biologicos.webp
```

El número de adelante manda el orden. Lo de atrás es `{marca}-{producto}`, con
el mismo nombre de la carpeta de ese producto en `public/productos/`. Si el
nombre no corresponde a ningún producto, la foto se muestra igual pero sin
etiqueta.

Entre **4 y 6** fotos. Con más, el visitante no alcanza a verlas.

## Cómo debe ser cada foto

| | |
|---|---|
| **Tamaño** | 1600 × 1280 px, proporción 5:4 |
| **Formato** | WebP con fondo transparente |
| **Peso** | Máximo 250 kB |
| **Encuadre** | Equipo recortado y centrado, apoyado en el borde inferior, ocupando un 85 % del alto |
| **Márgenes** | Al menos un 10 % libre a cada lado |
| **Esquina inferior izquierda** | Despejada: ahí va la etiqueta del producto |
| **Ángulo** | El mismo en todas —frontal o 3/4— para que el cambio no salte |

Si la foto trae fondo en vez de transparencia, que sea el mismo gris claro del
recuadro. Con transparencia, el equipo sobresale del recuadro, que es el
gesto del diseño.

Para revisar qué falta y cuánto pesan:

```bash
npm run hero
```

## Qué hace el carrusel

Cambia solo cada 6 segundos con un fundido, y **se detiene** mientras el
puntero o el teclado estén encima: nadie quiere que la imagen cambie justo
cuando va a hacer clic. Debajo hay puntos para saltar, y en escritorio
flechas a los lados. Quien tenga activado «reducir movimiento» en su sistema
ve la primera imagen fija.

En móvil se ve una sola imagen, debajo del texto, sin flechas.

## Si no hay fotos

La portada usa la imagen única de `public/hero/`, que es como está hoy. Y si
tampoco hay esa, el recuadro queda vacío con su etiqueta. No se rompe nada.

## Cómo publicarlo

```bash
npm run hero
```

```bash
git add public/home/hero && git commit -m "Agregar fotos del carrusel" && git push
```

## La carpeta `w`

`npm run hero` crea una subcarpeta `w` con copias más pequeñas de cada foto.
Son las que se le mandan a un teléfono, para que no descargue la imagen de
escritorio. No hay que tocarla ni poner fotos ahí: se borra y se vuelve a
generar cada vez que corres el comando.

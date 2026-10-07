# Logotipos de las marcas

Aquí van los seis logotipos. Mientras falte uno, esa marca se muestra con su
nombre en la tipografía de títulos, dentro de la misma caja. No se rompe nada
y no hay prisa: se pueden ir subiendo de a uno.

---

## 1. De dónde sacar cada logo

En este orden:

1. **Kit de prensa del fabricante.** Busque en su sitio `press kit`, `media
   kit`, `brand assets`, `downloads` o `prensa`. Suele estar en el pie de
   página. Ahí el logo viene en SVG y con las reglas de uso.
2. **El sitio oficial.** Si no hay kit, abra el sitio del fabricante, haga
   clic derecho sobre el logo y «Guardar imagen como…». Si le ofrece guardar
   un `.svg`, perfecto. Si solo le deja guardar `.png`, sirve, pero tiene que
   medir **al menos 560 px de ancho**.
3. **Pedírselo al fabricante.** Es lo más seguro y lo más rápido de todo.
   Escríbale a su contacto comercial:

   > Buen día. Estamos actualizando el sitio de Servimedical Group, donde los
   > representamos en Colombia. ¿Nos pueden enviar el logotipo en SVG con
   > fondo transparente, y las reglas de uso de marca si las tienen?

**Prefiera siempre SVG.** Un SVG se ve nítido en cualquier pantalla y pesa
poco. Un PNG se ve borroso si es pequeño.

**Lo que no se hace:** redibujar el logo, cambiarle el color, recortarlo o
sacarlo de una foto. O es el logo del fabricante, o no es.

---

## 2. Cómo nombrarlo y dónde ponerlo

Dentro de esta misma carpeta (`public/logos/marcas/`), con **este nombre
exacto**, en minúsculas y sin acentos ni espacios:

| Archivo             | Marca        |
|---------------------|--------------|
| `tuttnauer.svg`     | Tuttnauer    |
| `sanqiang.svg`      | Sanqiang     |
| `servimedical.svg`  | Servimedical |
| `2i.svg`            | 2i           |
| `akarmak.svg`       | Akarmak      |
| `celitron.svg`      | Celitron     |

Si lo que consiguió es un PNG, use el mismo nombre con `.png`:
`tuttnauer.png`. El sitio toma el que encuentre.

> El nombre importa: el sitio busca el archivo por ese nombre. Si lo llama
> `Tuttnauer-logo-final.svg` no lo va a encontrar.

---

## 3. Qué comando correr

Desde la carpeta del proyecto, en la Terminal:

```bash
npm run logos
```

Ese comando hace tres cosas:

- **Le dice qué falta.** Lista los logos que todavía no están.
- **Los optimiza.** A los SVG les quita el código sobrante y les ajusta el
  margen, para que el logo quede centrado en su caja. A los PNG les recorta
  el borde vacío y los deja al tamaño correcto.
- **Le avisa de problemas.** Por ejemplo, si un PNG es demasiado pequeño y se
  va a ver borroso.

Después revise cómo quedó:

```bash
npm run dev
```

y abra http://localhost:4321 — los logos salen en la home, en `/marcas` y en
el encabezado de cada marca.

---

## 4. Si un logo se ve más grande o más chico que los demás

Pasa, y es normal: un logo ancho y uno cuadrado no pesan igual aunque midan
lo mismo. No toque el archivo. Abra `src/datos/marcas.ts`, busque la marca y
agregue `logoEscala` justo debajo de la línea `logo:`.

```ts
logo: { src: '/logos/marcas/tuttnauer.svg', alt: 'Logo de Tuttnauer' },
logoEscala: 0.9,   // se ve 10 % más pequeño
```

- `1` es el tamaño normal. Si no pone nada, es `1`.
- **Menos de 1 lo achica**: `0.9` lo deja 10 % más pequeño.
- **Más de 1 lo agranda**: `1.15` lo deja 15 % más grande.

Vaya probando de a poco —`0.9`, `1.1`— y mire el resultado en el navegador.
Los cambios se ven solos, sin recargar.

---

## 5. Cómo publicarlo

Cuando esté conforme con cómo se ven:

```bash
git add public/logos/marcas src/datos/marcas.ts
```

```bash
git commit -m "Agregar logotipos de marca"
```

```bash
git push
```

Y listo. Vercel publica solo en un par de minutos.

---

## Resumen en cuatro pasos

1. Consiga el SVG (kit de prensa, sitio oficial o pídaselo al fabricante).
2. Guárdelo aquí con el nombre exacto de la tabla.
3. Corra `npm run logos` y revise con `npm run dev`.
4. `git add`, `git commit`, `git push`.

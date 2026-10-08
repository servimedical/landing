# La red eléctrica colombiana y las fichas técnicas

Por qué el sitio no puede copiar el dato eléctrico del folleto del fabricante,
y qué publica en su lugar.

---

## 1 · Lo que rige en Colombia

**Frecuencia: 60 Hz.** No 50. Es el primer dato que descarta media ficha
técnica europea o china.

La norma que fija tensión y frecuencia nominales en las redes de servicio
público es la **NTC 1340** (ICONTEC). El **RETIE** —Reglamento Técnico de
Instalaciones Eléctricas, del Ministerio de Minas y Energía— se apoya en ella
y en la IEC 60038 y la ANSI C84.1 para clasificar los niveles de tensión.

### Tensiones normalizadas de baja tensión

| Sistema | Tensión | Dónde se ve |
|---|---|---|
| Monofásico trifilar | 120 / 240 V | Residencial y consultorio |
| Trifásico tetrafilar en estrella | 120 / 208 V | El más común en comercio e institución |
| Trifásico tetrafilar en estrella | 127 / 220 V | Redes antiguas y parte de la costa |
| Trifásico tetrafilar en estrella | 254 / 440 V | Industrial y carga pesada |

**Fuentes:** NTC 1340 (ICONTEC); RETIE, título 9, clasificación de niveles de
tensión (Ministerio de Minas y Energía).

### Qué usa un hospital

Un autoclave grande, una termodesinfectora o un equipo de residuos son carga
trifásica. En una IPS colombiana lo normal es encontrarlos en **208 V entre
fases con neutro a 120 V**, y en instalaciones con carga pesada o más antiguas,
en **440 V**. La acometida se define en el diseño eléctrico de la institución,
no en el catálogo del fabricante.

---

## 2 · Por qué no se copia la cifra del folleto

Casi todo el equipo del portafolio se fabrica para Europa, Israel, Turquía o
China. Sus folletos declaran **380 V / 50 Hz**, **400 V** o **230 V**, que son
tensiones y frecuencia **que no existen en la red colombiana**.

Publicar «380 V · 50 Hz» en una ficha dirigida a un ingeniero biomédico
colombiano tiene tres consecuencias, todas malas:

1. **Le dice que el equipo no sirve.** Un biomédico que lee 50 Hz asume
   incompatibilidad y descarta el equipo antes de llamar.
2. **Es falso en la práctica.** El fabricante entrega la máquina configurada
   para la red de destino; lo que el folleto trae es la configuración de
   fábrica para su mercado.
3. **Compromete la cotización.** Si alguien dimensiona la acometida con un
   dato que no corresponde, el error aparece el día de la instalación.

## 3 · Qué se publica en su lugar

La regla que sigue el sitio:

| Situación | Qué se publica |
|---|---|
| El fabricante declara 60 Hz o una tensión colombiana | La cifra tal cual, porque es verificable |
| El fabricante declara solo 50 Hz, 380 V o 400 V | **No se publica la cifra.** Va «Alimentación trifásica, configurada para la red de la institución (60 Hz)» |
| En ambos casos | **Siempre la potencia en kW o kVA** |

La potencia es del equipo, no de la red. Un autoclave de 18 kW consume 18 kW
en Bogotá y en Róterdam; lo que cambia es la tensión a la que se conecta. Es
el dato que de verdad necesita quien dimensiona una acometida, y es el único
que se puede publicar sin reservas.

---

## 4 · Estado por equipo

| Equipo | Lo que declara fábrica | Decisión | Confirmar con fábrica |
|---|---|---|---|
| Tuttnauer autoclaves de mesa (T-Edge, 2540EKA…) | 230 V monofásico | Se retira la tensión; queda la potencia en W | ⚠ Versión 120 V / 60 Hz |
| Tuttnauer autoclaves grandes (5075GS…) | 208–415 V trifásico | **Se publica**: 208 V es tensión colombiana | ⚠ Confirmar 60 Hz |
| Tuttnauer PlazMax | 230 V monofásico, 13,5–18,7 A | Se retira la tensión; queda la corriente y la potencia | ⚠ Versión 120 V / 60 Hz |
| Tuttnauer TIVA | 230 V monofásico o 380/415 V trifásico | Se retira; queda 6,3–8,8 kW | ⚠ Versión 60 Hz |
| Sanqiang SQ-X / SQ-KX | 380 V trifásico | Se retira; queda 30–40 kVA | ⚠ Versión 60 Hz |
| EasySeal automáticas EF122-A y EF058 | 110/220 V, **50/60 Hz** | **Se publica tal cual** | — |
| EasySeal automáticas EF121-B, EF122-AB, EF120-A/B | 110/220 V, 50 Hz | Se retira la frecuencia | ⚠ Versión 60 Hz |
| 2i mini incubadora | 127/220 V bivolt, 50–58 Hz | Se publica la tensión, **no** la frecuencia | ⚠ Operación a 60 Hz |

**Para Felipe:** son siete confirmaciones escritas que hay que pedir, una por
fabricante. Hasta que lleguen, la ficha dice lo que es cierto y no lo que
conviene.

---

## 5 · Cómo se expresa un dato eléctrico en una ficha colombiana

- Tensión en voltios, con la configuración: «trifásico 208 V» o «monofásico
  120 V», no «380 V» a secas.
- Frecuencia solo si está declarada: «60 Hz».
- Potencia en **kW** para carga resistiva y **kVA** para la acometida.
- Corriente en amperios cuando el fabricante la publica: es lo que dimensiona
  la protección.
- Nunca «220 V» sin decir si es entre fases o entre fase y neutro. En Colombia
  esa cifra es ambigua, porque existen redes de 127/220 V y de 120/208 V.

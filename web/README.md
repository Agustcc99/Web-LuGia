# Web de LuGia

Landing hecha con React, Tailwind y animaciones con GSAP y Motion.

```bash
npm install     # una sola vez
npm run dev     # ver el sitio mientras se edita
npm run build   # genera la carpeta dist/ para publicar
```

## Dónde está cada cosa

```
src/
├─ contenido/          Todo lo que lee la gente. Casi todo cambio de texto es acá.
│  ├─ sitio.js           Textos, fotos, contacto y qué secciones se muestran
│  ├─ cursos.js          Cursos de la Od. Luciana
│  ├─ formularioTurno.js Textos de las pantallas del pedido de turno
│  └─ paginas/           Un archivo por tratamiento; indice.js los reúne
│
├─ index.css           Colores y curvas de movimiento (identidad visual).
├─ main.jsx            Arranque de la página principal.
├─ App.jsx             Arma la página principal: el orden de las secciones.
│
├─ secciones/          Cada bloque de la principal, en el orden en que aparece.
│  ├─ Portada.jsx        Portada
│  ├─ Servicios/         Tratamientos (tarjetas + su animación)
│  ├─ Profesional.jsx    La Od. Luciana
│  ├─ Cursos.jsx         Botón y ventana con sus cursos
│  ├─ Nosotros.jsx       El consultorio
│  ├─ Galeria.jsx        Fotos (apagada hasta cargar imágenes)
│  ├─ Pasos/             "Tu turno en 3 pasos"
│  ├─ PreAdmision/       Formulario de turno en 4 pasos → WhatsApp
│  ├─ Resenas.jsx        Reseñas de Google (apagada hasta tener reales)
│  ├─ Cierre.jsx         Cierre con botón de turno
│  ├─ Contacto/          Datos, mapa y formas de pago
│  ├─ PreguntasFrecuentes.jsx
│  └─ MeGusta.jsx        Corazón con pulso → reseña en Google
│
├─ paginas/            Páginas de tratamientos con dirección propia (/endodoncia).
│  ├─ PaginaTratamiento.jsx  Estructura común
│  ├─ bloques/               Sus partes: portada, qué es, cuándo, atención, experiencia, otros tratamientos y franja "Inicio / …"
│  │  └─ destacados/         Bloque propio de cada tratamiento, uno por forma (comparación…); indice.js los reúne
│  ├─ dibujos/               Dibujo y fondo de cada tratamiento; indice.js los reúne
│  ├─ metadatos.js           Título, descripción y datos estructurados
│  ├─ servidor.jsx           Arma el HTML al compilar
│  └─ entrada.jsx            Arranque en el navegador
│
├─ estructura/         Lo que rodea a las secciones.
│  ├─ Envoltura.jsx      Lo que envuelve a todas las páginas
│  ├─ Menu/              Menú de arriba
│  ├─ Pie.jsx            Pie de página
│  ├─ Lunares/           Círculos de colores del fondo
│  ├─ CursorFluido.jsx   Tinta del mouse, del color de la gama de la página (utilidades/coloresCursor.js); en celular, salpicón al tocar
│  ├─ BarraMovil.jsx     Barra de botones fija en el celular
│  ├─ BotonWhatsappFlotante.jsx  Botón flotante de WhatsApp (compu)
│  └─ ProgresoScroll.jsx Barra fina de avance al bajar
│
├─ piezas/             Piezas chicas que se reutilizan: Titulo, Aparecer, Inclinar, Icono, LogoAnimado, EspecialidadYMatricula, GooeyNav (menú líquido) y SplashCursor (tinta del mouse). Estas dos últimas son de React Bits: no tocar, se ajustan por props.
├─ hooks/              Lógica reutilizable de React: useTextoGsap, useScrollPasado, useIrASeccion.
└─ utilidades/         Funciones y valores compartidos (sin pantalla).
   ├─ gsap.js            Registro de GSAP y chequeos de "reducir movimiento" / mouse
   ├─ botones.js         Efectos de los botones
   ├─ movimiento.js      Duraciones y curvas de las animaciones de Motion
   ├─ estilos.js         Clases de Tailwind que se repiten (botones, campos, contenedor)
   ├─ enlaces.js         Links a las secciones (menú y pie)
   ├─ textos.js          Separar el final de un título
   ├─ whatsapp.js        Armado de los links de WhatsApp
   └─ medicion.js        Google Analytics y Píxel de Meta
```

## Sumar una página de tratamiento

`npm run build` genera un HTML propio por cada entrada de `contenido/paginas/indice.js`, con el texto ya escrito en el código fuente (`dist/endodoncia.html` se sirve en `/endodoncia`, sin barra final). Para sumar otra:

1. Crear `contenido/paginas/<servicio>.js` a partir de `endodoncia.js` y sumarlo en `contenido/paginas/indice.js`.
2. Agregar la dirección a `public/sitemap.xml`.
3. Si hace falta, sumar `enlace` y `enlaceAyuda` a su tarjeta en `contenido/sitio.js → servicios`. Si el tratamiento es parte de otra tarjeta, usar `enlacesEnTexto` (una lista de `{ texto, ruta }`), que convierte esas partes de la descripción en links, en el orden en que aparecen.
4. Crear `paginas/dibujos/<servicio>.jsx` con su dibujo y su fondo, y sumarlos en `paginas/dibujos/indice.js`.
5. Si la portada pide un tono nuevo (`portada.tono`), sumarlo a `tonos` en `paginas/bloques/PortadaTratamiento.jsx`, con contraste de 4.5:1 o más.
6. Si la página tiene bloque propio, pedirlo desde sus textos: `destacado: { tipo: 'comparacion', ... }`. `PaginaTratamiento.jsx` lo muestra después de "Cuándo", solo si la página lo tiene.

### Bloques propios

Cada forma es un archivo en `paginas/bloques/destacados/`, reunidos en `indice.js`. Una forma que ya existe se reutiliza con otros textos: no se vuelve a hacer. Para sumar una forma nueva: crear su archivo y agregar su nombre en `indice.js`. Los textos llegan por props.

`Comparacion.jsx` recibe `etiqueta`, `titulo`, `texto`, `opciones` y `nota`, y de manera opcional `separador` (la "o" entre las dos tarjetas) y `enlace` (`{ texto, ruta }`). Cada opción lleva `titulo`, `filas` (`[{ etiqueta, texto }]`) y, si tiene, `dibujo`, que es un nombre de `paginas/dibujos/indice.js`.

`Proceso.jsx` (`tipo: 'proceso'`) cuenta cómo se hace algo, paso a paso. Recibe `etiqueta`, `titulo`, `texto`, `pasos` (`[{ titulo, texto }]`) y `nota`. Los pasos van numerados: en compu, de a tres por fila con el del medio más abajo (zigzag); en celular, en una columna unida por una línea. Cada paso se enciende al llegar a él (`useAnimacionProceso.js`, que cambia `data-encendido`); con "reducir movimiento" quedan encendidos. Lo usa la página de placas; las demás pueden pedirlo con otros textos.

`Calendario.jsx` (`tipo: 'calendario'`) deja tocar el mes de la última visita y marca el de la próxima. Recibe `etiqueta`, `titulo`, `texto`, `meses`, `cadaCuantosMeses`, `icono` (la marca del mes que toca), `inicial`, `resultado` (con `{ultima}` y `{proxima}`), `sinFecha` (`{ boton, texto }`) y `nota`. No guarda ni envía nada. Lo usa limpieza.

`Reparto.jsx` (`tipo: 'reparto'`) muestra quién hace cada parte de un tratamiento. Recibe `etiqueta`, `titulo`, `texto`, `columnas` (dos, `[{ nombre, detalle }]`), `pasos` (`[{ columna, titulo, texto }]`, con `columna` 0 o 1 y `texto` opcional), `nota` y, si tiene, `enlace` (`{ texto, ruta }`). Los pasos van numerados en orden y cada uno cae en la columna de quien lo hace: la primera en el color de marca y la segunda en el acento de la gama. En celular van en una sola columna y cada paso dice de quién es. Lo usa implantes.

`Anotador.jsx` (`tipo: 'anotador'`) es una lista de cosas para tener pensadas, que se pueden tildar, con un aviso destacado al lado. Recibe `etiqueta`, `titulo`, `texto`, `elementos` (lista de textos), `aviso` (`{ titulo, texto }`) y `nota`. No guarda ni envía nada. Lo usa implantes, con el nombre `antes` en `orden`.

Una página puede tener más de un bloque propio: el segundo va con el nombre que quiera (limpieza usa `frecuencia`), con su `tipo`, y ese nombre se suma a `orden`. `PaginaTratamiento.jsx` trata como bloque propio todo lo que no sea una sección común.

### Para que cada página se vea distinta

Todo se pide desde los textos de la página, sin componentes propios:

- `gama`: colores propios, definidos en `index.css` como `.gama-<nombre>`. Cambian solo dentro de la página: el menú y el pie siguen en vino. Una gama nueva repite los mismos nombres de color, con contraste de 4.5:1 o más. Hoy existen `ciruela`, `durazno`, `malva`, `bruma` (azul grisáceo), `damasco` (durazno muy claro y algo rosado, de valores propios: la guía no la trae) y `noche` (versión clara de la noche de la guía: azul violáceo, con el rosa de la marca en `resalte`; valores propios). Las gamas claras (`durazno`, `malva`, `bruma`, `damasco`, `noche`) no cambian `brand`: títulos y botones siguen en vino.
- `portada.tono`: colores de la portada (`vino`, `rosa`, `bordo`, `superficie`, que usa el fondo más claro de la gama, `blanco`, fondo blanco con los detalles en la gama, y `degradado`, que baja del tinte de la gama al blanco). Un tono nuevo se suma a `tonos` en `PortadaTratamiento.jsx`.
- `portada.respuesta: { corta, texto }`, en lugar de `portada.texto`: el título es una pregunta y la respuesta va en un cuadro claro debajo. Pensada para los tonos claros. La foto lleva la forma que pida `formaFotos`. La usan limpieza e implantes.
- `portada.forma: 'centrada'`: texto y botones centrados, con el dibujo o la foto debajo. Sin `forma`, la portada va en dos columnas.
- `formaFotos`: forma del marco de las fotos de la página, en la portada, la experiencia y el cierre (`utilidades/formasFoto.js`): `arco` (la de la principal, si no se pide otra), `circulo` (con burbujas en la portada), `ventana` (esquinas redondeadas, con un bloque de color detrás en la portada), `hoja` (dos esquinas opuestas muy redondeadas), `capsula` (alargada, con los dos extremos redondos), `cuenco` (redonda abajo, como un arco invertido) `esquina` (una sola esquina muy redondeada) y `chaflan` (las cuatro esquinas cortadas en diagonal, con tres rayas de rosca al costado en la portada; es un recorte, así que lleva `sinBorde` y la foto va sin borde). Hoy: endodoncia `capsula`, odontopediatría `hoja`, prótesis `esquina`, placas `cuenco`, blanqueamiento `ventana`, limpieza `circulo` e implantes `chaflan`. Cada página nueva usa una que no esté tomada. Una forma nueva se suma en ese archivo.
- `orden`: qué secciones van y en qué orden (`que`, `cuando`, `destacado`, `atencion`, `experiencia`, `preguntas`). Sin `orden`, usa el común de `PaginaTratamiento.jsx`.
- `portada.dibujo`: dibujo grande en lugar de la foto. El dibujo recibe `sobreOscuro` si el tono lo pide.
- `atencion.forma: 'turnos'`: columnas por turno (`grupos`, `nota`) en lugar del recorrido vertical.
- `cuando.listas[].icono`: ícono de cada lista de "Cuándo". Sin él, tilde; `menos` sirve para lo que no se recomienda.
- Los dibujos de `blanqueamiento.jsx` (`DienteConBrillos`, y sus versiones chicas para las tarjetas de una comparación) y el fondo `destellosChicos` se piden por nombre, como los demás. Lo mismo con los de `limpieza.jsx`: `DienteConEncia` (el sarro se desvanece al llegar al dibujo), su versión chica `dienteConEnciaChico` y el fondo `ondasSuaves`. Y con los de `implantes.jsx`: `implanteJuntoADiente` (las vueltas de la rosca se trazan de a una al llegar al dibujo; `partes` son corona, implante y diente natural) y el fondo `ejeConMarcas`.
- Sin `que.dibujo`, cada párrafo de "Qué es" es una tarjeta. Un párrafo puede ser solo texto o `{ resaltado, texto }`, si arranca con unas palabras en negrita.

Los prompts para armar cada servicio están en `docs/PROMPTS-PAGINAS-SERVICIOS.md`.

Estas páginas se ven con `npm run build` y `npm run preview`, no con `npm run dev`.

## Reglas de la carpeta

- Una sección con un solo archivo va suelta (`Hero.jsx`). Si necesita más piezas (animación, subcomponentes), tiene su carpeta con el archivo principal con el mismo nombre (`Servicios/Servicios.jsx`).
- Las animaciones largas van en un hook al lado de la sección: `useAnimacion…js`.
- Los imports usan `@/` para apuntar a `src/` (ejemplo: `import { sitio } from '@/contenido/sitio.js'`).
- Los textos que ve la gente no se escriben en los componentes: van en `contenido/`.
- Comentarios en español, cortos, explicando el "para qué" y no el "cómo".
- Archivos, componentes, funciones y variables con nombres descriptivos en español. Quedan en inglés solo las palabras de React, GSAP o las herramientas, las copias de React Bits y las clases y colores del CSS.
- Antes de crear algo, reutilizar lo que ya está en `piezas/`, `estructura/`, `secciones/` y `utilidades/`.

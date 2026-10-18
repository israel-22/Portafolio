# Frecuencias de Radio - Documentación del Proyecto Fallout

Este documento detalla la justificación técnica e histórica detrás de las frecuencias asignadas a cada emisora en nuestro archivo `JSON`. Su propósito es mantener la coherencia interna del desarrollo, servir como referencia rápida y garantizar que cualquier decisión de diseño respete el lore oficial de la franquicia frente a la comunidad de fans.

---

## 📻 Referencias Oficiales (Canon Estricto)

Estas frecuencias provienen directamente del material oficial pre-guerra, material promocional o del diseño del mundo de Bethesda:

### 1. Galaxy News Radio (GNR)
* **ID:** `galaxy-news`
* **Frecuencia Asignada:** `103.8`
* **Justificación Canon:** Es el dial exacto de la emisora en el lore pre-guerra de *Fallout 3*. Los carteles publicitarios originales del juego de la cadena *Galaxy News Network* utilizan explícitamente el eslogan: *"Galaxy News Radio, 103.8 on your radio dial"*.

### 2. Diamond City Radio
* **ID:** `diamond-city`
* **Frecuencia Asignada:** `98.0`
* **Justificación Canon:** Frecuencia oficial dentro de la Mancomunidad en *Fallout 4*. El lore explica que el 23 de octubre de 2077 (el día de la Gran Guerra) se iba a disputar el partido de la Serie Mundial en Fenway Park (lugar donde se fundó Diamond City). Por este motivo, la gran mayoría de las radios analógicas de Boston quedaron fijadas permanentemente en este dial antes de que cayeran las bombas.

---

## 🛠️ Soluciones Creativas (Frecuencias Adaptadas)

En los juegos originales (*Fallout: New Vegas* y *Fallout 4*), las siguientes estaciones de la superficie no muestran un dial numérico en el Pip-Boy, ya que el dispositivo utiliza un sistema digital de escaneo automático que identifica los metadatos y muestra directamente el nombre de la señal. 

Para cubrir las necesidades técnicas de nuestro código sin inventar números al azar, se desarrollaron soluciones lógicas basadas en eventos históricos y geográficos del lore:

### 3. Radio New Vegas
* **ID:** `radio-new-vegas`
* **Frecuencia Asignada:** `38.0`
* **Justificación de Diseño:** La señal es emitida por el **Sr. New Vegas**, una Inteligencia Artificial avanzada creada y programada por el Sr. House. El centro neurálgico y bastión tecnológico de House es el casino **Lucky 38**. El dial `38.0` rinde tributo directo a la base de operaciones de la facción.

### 4. Mojave Music Radio
* **ID:** `mojave-music`
* **Frecuencia Asignada:** `95.1`
* **Justificación de Diseño:** En el lore, esta estación es un repetidor automatizado pre-guerra que emite música country en bucle a través del desierto sin locución humana. Se le asignó el dial `95.1` en referencia a la **Ruta 95** (U.S. Route 95), una de las carreteras y arterias comerciales más importantes que cruzan el mapa del Yermo de Mojave.

### 5. Radio Freedom
* **ID:** `radio-freedom`
* **Frecuencia Asignada:** `17.75`
* **Justificación de Diseño:** Es la señal oficial de la milicia de los Minutemen operada desde la fortificación colonial de El Castillo. Al ser una facción rústica basada en los valores de los colonos americanos pre-guerra, el dial `17.75` funciona como una referencia histórica exacta al año de fundación de los **Minutemen históricos (**1775**)** durante la Guerra de Independencia de los Estados Unidos.

### 6. Black Mountain Radio
* **ID:** `black-mountain`
* **Frecuencia Asignada:** `2.22`
* **Justificación de Diseño:** Estación pirata operada por la supermutante Tabitha desde un complejo de antenas estatal pre-guerra. El número `2.22` corresponde a la codificación cartográfica oficial de la guía física de *Fallout: New Vegas*, donde la cumbre de Black Mountain está registrada geográficamente bajo la sección y coordenada de localización **2.22** (Sector 2, Localización 22).

---
*Nota de desarrollo: Mantener este archivo actualizado si se añaden nuevas frecuencias militares u ocultas de búnkeres o expansiones (DLCs).*

# DOHI — Asistente Virtual de Salud

DOHI es una aplicación móvil de asistencia y gestión de salud desarrollada con React Native, Expo y TypeScript.

El proyecto busca centralizar diferentes servicios relacionados con la salud dentro de una misma aplicación, permitiendo al usuario consultar información, gestionar citas médicas, realizar seguimiento de medicamentos, organizar documentos médicos, controlar su peso e IMC, consultar guías de primeros auxilios, acceder a contenido de bienestar y localizar centros de salud.

Actualmente el proyecto se encuentra en etapa de desarrollo y utiliza datos de demostración para simular diferentes funcionalidades mientras se desarrolla la integración con el backend.

## Objetivo del proyecto

El objetivo de DOHI es ofrecer una plataforma móvil que facilite al usuario el acceso a diferentes herramientas relacionadas con su salud desde un único lugar.

La aplicación está diseñada para que el usuario pueda:

- Gestionar sus citas médicas.
- Consultar información de sus médicos.
- Realizar consultas virtuales.
- Llevar un seguimiento de sus medicamentos.
- Organizar documentos médicos.
- Escanear documentos.
- Registrar y consultar su peso.
- Calcular y consultar su IMC.
- Consultar información de primeros auxilios.
- Buscar centros de salud.
- Acceder a contenido de bienestar físico y emocional.
- Interactuar con el asistente virtual Dohi.

## Cómo funciona DOHI

El funcionamiento general de la aplicación sigue el siguiente flujo:

Usuario
  |
  v
Splash Screen
  |
  v
Onboarding
  |
  v
Aplicación principal
  |
  +-------------------+
  |                   |
  v                   v
Inicio             Navegación
                       |
          +------------+------------+
          |            |            |
          v            v            v
        Citas        Salud        Dohi
          |            |            |
          v            v            v
     Medicamentos   Documentos   Asistente
     Consultas      Peso / IMC
     Citas          Primeros auxilios
                    Centros de salud
                    Bienestar

Al iniciar la aplicación, el usuario pasa por la pantalla de carga y posteriormente por el proceso de onboarding.

Una vez completado el onboarding, el usuario accede a la aplicación principal.

La aplicación utiliza una navegación inferior para acceder a las principales áreas:

- Inicio
- Citas
- Salud
- Dohi
- Perfil

Desde estas secciones el usuario puede acceder al resto de funcionalidades.

## Arquitectura de la aplicación

DOHI utiliza una arquitectura modular organizada por responsabilidades.

La aplicación está dividida principalmente en:

app/
src/
assets/

La carpeta app contiene las rutas y pantallas de la aplicación.

La carpeta src contiene los componentes reutilizables, datos, tipos y sistema de diseño.

La carpeta assets contiene los recursos gráficos utilizados por la aplicación.

## Arquitectura basada en Expo Router

La navegación utiliza Expo Router, que permite definir las rutas mediante la estructura de carpetas y archivos.

La arquitectura de navegación está organizada de la siguiente manera:

app/
|
├── index.tsx
├── splash.tsx
├── onboarding/
|
└── (app)/
    |
    ├── (tabs)/
    |
    ├── appointment-assistant/
    ├── book-appointment/
    ├── documents/
    ├── first-aid/
    ├── health-centers/
    ├── medications/
    ├── scanner/
    ├── virtual-consultation/
    ├── weight/
    └── wellness/

Los grupos entre paréntesis, como (app) y (tabs), permiten organizar las rutas sin formar parte directamente de la URL.

## Flujo de navegación

### Entrada de la aplicación

El archivo:

app/index.tsx

funciona como punto inicial de la aplicación y dirige al usuario hacia la pantalla correspondiente.

La aplicación continúa hacia:

app/splash.tsx

donde se presenta la pantalla inicial de DOHI.

Posteriormente se muestra el onboarding:

app/onboarding/

Una vez completado el flujo inicial, el usuario entra al grupo principal:

app/(app)/

Dentro de este grupo se encuentran las funcionalidades principales.

## Navegación principal

La navegación principal está organizada dentro de:

app/(app)/(tabs)/

Las pestañas principales son:

- Home
- Citas
- Salud
- Dohi
- Perfil

Esto permite que el usuario pueda desplazarse rápidamente entre las áreas principales de la aplicación.

## Módulos principales

### Inicio

La pantalla principal funciona como un resumen de la información más importante para el usuario.

Desde el inicio se pueden mostrar:

- Próximas citas.
- Estado de medicamentos.
- Accesos rápidos.
- Información de bienestar.
- Acceso al asistente Dohi.
- Información relevante de salud.

### Citas médicas

Las funcionalidades relacionadas con citas están organizadas principalmente en:

app/(app)/book-appointment/
app/(app)/appointment-assistant/

El sistema permite trabajar con:

- Próximas citas.
- Reserva de citas.
- Información de médicos.
- Horarios.
- Seguimiento de citas.
- Asistencia a consultas.
- Consultas virtuales.

### Consulta virtual

El módulo:

app/(app)/virtual-consultation/

está destinado a las consultas médicas realizadas de manera virtual.

La idea es permitir que el usuario pueda acceder a una consulta sin necesidad de desplazarse físicamente hasta el centro médico.

Este módulo puede integrarse posteriormente con servicios de videollamada, comunicación y backend.

### Asistente virtual Dohi

El asistente Dohi es uno de los componentes principales de la aplicación.

Los componentes relacionados con el asistente se encuentran en:

src/components/dohi/

Su función es proporcionar una interfaz conversacional para que el usuario pueda interactuar con el sistema.

El asistente puede utilizarse para:

- Consultar información.
- Orientar al usuario dentro de la aplicación.
- Mostrar recomendaciones.
- Presentar tarjetas de bienestar.
- Facilitar el acceso a diferentes funcionalidades.

La arquitectura está preparada para conectarse posteriormente con un servicio de inteligencia artificial mediante un backend.

### Medicamentos

El módulo de medicamentos se encuentra en:

app/(app)/medications/

Permite representar información relacionada con la medicación del usuario.

Entre sus funcionalidades se encuentran:

- Lista de medicamentos.
- Estado de la medicación.
- Medicamentos pendientes.
- Medicamentos tomados.
- Línea de tiempo.
- Información de cada medicamento.

Actualmente parte de esta información se obtiene desde datos de demostración.

### Documentos médicos

El módulo de documentos se encuentra en:

app/(app)/documents/

El escáner se encuentra en:

app/(app)/scanner/

Este módulo está diseñado para permitir al usuario gestionar documentos relacionados con su salud.

Puede trabajar con:

- Resultados de laboratorio.
- Recetas.
- Documentos médicos.
- Imágenes escaneadas.

En una futura integración con backend, estos documentos deberán almacenarse utilizando mecanismos seguros.

### Control de peso e IMC

El módulo:

app/(app)/weight/

permite llevar un seguimiento del peso del usuario.

El sistema puede:

- Registrar peso.
- Calcular IMC.
- Mostrar evolución.
- Presentar gráficos.
- Consultar registros anteriores.

Los componentes relacionados con gráficos están organizados en:

src/components/charts/

### Primeros auxilios

El módulo:

app/(app)/first-aid/

contiene información de consulta rápida relacionada con primeros auxilios.

Su objetivo es facilitar el acceso a procedimientos básicos ante situaciones que puedan requerir atención inmediata.

### Centros de salud

El módulo:

app/(app)/health-centers/

está diseñado para permitir al usuario consultar centros y puntos de atención médica.

En futuras etapas puede integrarse con:

- GPS.
- Mapas.
- Geolocalización.
- APIs de mapas.
- Información actualizada de establecimientos.

### Bienestar

El módulo:

app/(app)/wellness/

está orientado al bienestar físico y emocional.

Puede contener:

- Recomendaciones.
- Contenido educativo.
- Actividades.
- Información de bienestar físico.
- Información de bienestar emocional.

## Organización interna del código

La carpeta src contiene los elementos reutilizables de la aplicación.

src/
|
├── components/
├── data/
├── theme/
└── types/

## Components

La carpeta:

src/components/

contiene componentes reutilizables.

Está organizada por responsabilidades:

src/components/
|
├── charts/
├── common/
├── dohi/
├── medical/
└── navigation/

### charts

Contiene componentes relacionados con gráficos y visualización de información.

### common

Contiene componentes generales reutilizables de la interfaz.

Ejemplos:

- Botones.
- Inputs.
- Cards.
- Estados.
- Elementos visuales.
- Componentes comunes.

### dohi

Contiene los componentes específicos del asistente virtual.

src/components/dohi/

### medical

Contiene componentes relacionados con funcionalidades médicas.

src/components/medical/

Aquí pueden encontrarse componentes relacionados con:

- Citas.
- Medicamentos.
- Documentos.
- Centros de salud.
- Información médica.

### navigation

Contiene componentes relacionados con la navegación personalizada de la aplicación.

src/components/navigation/

## Sistema de diseño

El sistema visual de DOHI está centralizado en:

src/theme/

La finalidad es mantener una interfaz consistente entre las diferentes pantallas.

El sistema contempla:

- Colores.
- Tipografía.
- Espaciados.
- Sombras.
- Radios.

## Identidad visual

El color principal de DOHI es:

#167FD1

La tipografía principal utilizada es:

Poppins

El diseño busca transmitir:

- Confianza.
- Seguridad.
- Tranquilidad.
- Accesibilidad.
- Modernidad.

## Tipos TypeScript

Los tipos utilizados por la aplicación se encuentran en:

src/types/

Esta separación permite definir estructuras de datos utilizadas por los diferentes módulos.

Entre los principales tipos se encuentran:

- Usuario.
- Doctor.
- Cita.
- Medicamento.
- Documento.
- Centro de salud.
- Registro de peso.

El uso de TypeScript permite detectar errores relacionados con tipos durante el desarrollo y facilita el mantenimiento del proyecto.

## Datos de demostración

Actualmente el proyecto utiliza datos mock ubicados en:

src/data/

Estos datos permiten desarrollar y probar la interfaz sin depender todavía de un backend.

Los datos de demostración incluyen:

- Usuarios.
- Médicos.
- Citas.
- Medicamentos.
- Documentos.
- Centros de salud.
- Registros de peso.
- Información de bienestar.

La arquitectura permite reemplazar posteriormente estos datos por información proveniente de una API o base de datos.

## Arquitectura futura

La arquitectura actual está preparada para evolucionar hacia una arquitectura cliente-servidor.

                    Aplicación DOHI
                           |
                           v
                  React Native + Expo
                           |
                           v
                        API REST
                           |
             +-------------+-------------+
             |                           |
             v                           v
          Backend                   Servicio IA
             |
             v
        Base de datos
             |
       +-----+-----+
       |           |
       v           v
    Usuarios    Información
                médica

El frontend será responsable de:

- Interfaz.
- Navegación.
- Validaciones básicas.
- Presentación de información.
- Interacción con el usuario.
- Consumo de la API.

El backend será responsable de:

- Autenticación.
- Autorización.
- Gestión de usuarios.
- Gestión de citas.
- Medicamentos.
- Documentos.
- Información médica.
- Persistencia de datos.
- Comunicación con servicios externos.
- Integración con el asistente virtual.

La base de datos será responsable de almacenar la información necesaria para el funcionamiento de la plataforma.

## Tecnologías utilizadas

### Frontend

- React Native
- Expo ~52
- Expo Router
- TypeScript

### Navegación

- Expo Router
- File-based routing

### Animaciones e interacción

- React Native Reanimated
- React Native Gesture Handler

### Gráficos y elementos vectoriales

- React Native SVG

### Iconografía

- lucide-react-native
- @expo/vector-icons

### Tipografía

- Poppins
- @expo-google-fonts/poppins

## Estructura general del proyecto

Dohi-Asistente-Virtual/
|
├── app/
│   ├── index.tsx
│   ├── splash.tsx
│   ├── onboarding/
│   │
│   └── (app)/
│       ├── (tabs)/
│       ├── appointment-assistant/
│       ├── book-appointment/
│       ├── documents/
│       ├── first-aid/
│       ├── health-centers/
│       ├── medications/
│       ├── scanner/
│       ├── virtual-consultation/
│       ├── weight/
│       └── wellness/
│
├── src/
│   ├── components/
│   │   ├── charts/
│   │   ├── common/
│   │   ├── dohi/
│   │   ├── medical/
│   │   └── navigation/
│   │
│   ├── data/
│   ├── theme/
│   └── types/
│
├── assets/
│   └── images/
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md

## Instalación

### Requisitos

Se necesita:

- Node.js LTS
- npm
- Git
- Expo
- Android Studio para desarrollo Android
- Dispositivo Android o emulador

También se puede utilizar Expo Go para realizar pruebas rápidas.

### Clonar el proyecto

git clone <URL_DEL_REPOSITORIO>

cd Dohi-Asistente-Virtual

### Instalar dependencias

npm install

### Ejecutar

Iniciar Expo:

npm start

Android:

npm run android

iOS:

npm run ios

Web:

npm run web

## Scripts disponibles

| Comando | Función |
|---|---|
| npm start | Inicia Expo |
| npm run android | Ejecuta la aplicación en Android |
| npm run ios | Ejecuta la aplicación en iOS |
| npm run web | Ejecuta la aplicación en Web |
| npm run lint | Analiza el código |
| npm test | Ejecuta las pruebas |

## Estado del proyecto

El proyecto se encuentra actualmente en desarrollo.

### Implementado

- [x] Splash Screen
- [x] Onboarding
- [x] Navegación principal
- [x] Pantalla de inicio
- [x] Asistente Dohi
- [x] Citas médicas
- [x] Reserva de citas
- [x] Medicamentos
- [x] Documentos médicos
- [x] Escáner
- [x] Control de peso e IMC
- [x] Gráficos
- [x] Primeros auxilios
- [x] Centros de salud
- [x] Bienestar
- [x] Consulta virtual
- [x] Sistema de componentes
- [x] Sistema de diseño

### En desarrollo

- [ ] Backend
- [ ] Base de datos
- [ ] Autenticación
- [ ] Persistencia de datos
- [ ] Integración con API
- [ ] Integración completa del asistente virtual
- [ ] Notificaciones
- [ ] Geolocalización
- [ ] Mapas
- [ ] Integración con servicios médicos reales
- [ ] Pruebas automatizadas

## Seguridad y privacidad

DOHI está orientado al manejo de información relacionada con salud, por lo que la versión final deberá implementar mecanismos adecuados de seguridad.

Entre ellos:

- Autenticación segura.
- Autorización de usuarios.
- Protección de información personal.
- Comunicación mediante HTTPS.
- Control de acceso.
- Protección de documentos médicos.
- Gestión segura de credenciales.
- Protección de información almacenada.

La versión actual utiliza datos de demostración y no debe utilizarse para almacenar información médica real.

## Desarrollo

Para desarrollar una nueva funcionalidad se recomienda crear una rama independiente:

git checkout -b feature/nombre-de-la-funcionalidad

Después de realizar los cambios:

git add .

git commit -m "Agregar nueva funcionalidad"

git push origin feature/nombre-de-la-funcionalidad

Los cambios pueden integrarse posteriormente a la rama principal mediante un Pull Request.

## Licencia

Este proyecto es de carácter privado y académico.

El proyecto utiliza:

"private": true

Por lo tanto, el código no está destinado actualmente para distribución pública o uso comercial sin autorización del equipo responsable.

## DOHI

DOHI — Asistente Virtual de Salud

Una plataforma móvil orientada a facilitar el acceso, organización y gestión de diferentes servicios relacionados con la salud.

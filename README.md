 DOHI — Asistente Virtual de Salud

DOHI es una aplicación móvil construida con React Native (Expo) que funciona como asistente virtual de salud. Permite a los usuarios gestionar citas médicas, consultas virtuales, medicamentos, documentos médicos, control de peso/IMC, bienestar emocional y físico, y acceso rápido a guías de primeros auxilios y centros de salud cercanos.

 Funcionalidades principales

- Dohi (asistente virtual): chat/asistente con mensajería y tarjetas de bienestar personalizadas.
- Citas médicas: agenda, visualización y asistencia a citas (incluye modo de consulta virtual/telemedicina).
- Medicamentos: seguimiento de medicación con línea de tiempo y estado (tomado, pendiente, etc.).
- Documentos médicos:** escáner y organización de resultados de laboratorio y recetas.
- Control de peso e IMC:** cálculo de índice de masa corporal e historial con gráficos.
- rimeros auxilios:** guía rápida de procedimientos de emergencia.
- Centros de salud:** localización de puntos de salud cercanos.
- Bienestar:secciones de bienestar emocional y físico.
- Onboarding:flujo de bienvenida guiado para nuevos usuarios.

 Stack técnico

- [Expo](https://expo.dev) `~52`
- [Expo Router](https://docs.expo.dev/router/introduction/) (navegación basada en archivos)
- React Native `0.76`
- TypeScript
- React Native Reanimated, Gesture Handler y SVG
- Iconos: `lucide-react-native` y `@expo/vector-icons`
- Fuentes: Poppins (`@expo-google-fonts/poppins`)

 Estructura del proyecto


Dohi-Asistente-Virtual/
├── app/                        # Rutas de la app (expo-router)
│   ├── index.tsx                # Redirige a /splash
│   ├── splash.tsx               # Pantalla de carga inicial
│   ├── onboarding/               # Flujo de onboarding
│   └── (app)/                   # Rutas autenticadas / principales
│       ├── (tabs)/               # Navegación por pestañas: Home, Citas, Salud, Dohi, Perfil
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
├── src/
│   ├── components/
│   │   ├── charts/               # Gráficos (p. ej. evolución de peso)
│   │   ├── common/                # Componentes UI genéricos (botones, inputs, cards, estados)
│   │   ├── dohi/                  # Componentes del asistente Dohi
│   │   ├── medical/                # Componentes médicos (citas, medicamentos, documentos, centros de salud)
│   │   └── navigation/             # Barra de navegación personalizada
│   ├── data/                     # Datos mock (citas, doctores, documentos, medicamentos, etc.)
│   ├── theme/                    # Colores, tipografía, espaciados, sombras y radios
│   └── types/                    # Tipos TypeScript del dominio
├── assets/images/                # Recursos gráficos
├── app.json                      # Configuración de Expo
├── package.json
└── tsconfig.json


 Cómo empezar

Requisitos previos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- npm (incluido con Node.js)
- App Expo Go en tu dispositivo móvil (opcional, para pruebas rápidas) o un emulador Android/iOS configurado

Instalación

bash
Clonar el repositorio
git clone <URL-del-repositorio>
cd Dohi-Asistente-Virtual

Instalar dependencias
npm install


Ejecución

bash
 Iniciar el servidor de desarrollo de Expo
npm start

O directamente en una plataforma específica
npm run android   # Android
npm run ios       # iOS
npm run web       # Web


### Otros scripts disponibles

bash
npm run lint      # Analiza el código con ESLint (expo lint)
npm test          # Ejecuta las pruebas con Jest en modo watch


Tema visual

El color principal de la app es `#167FD1` (azul DOHI), configurado tanto en la pantalla de splash como en los íconos adaptativos. La tipografía utilizada es Poppins en sus variantes Regular, Medium, SemiBold y Bold.

Notas

- Actualmente el proyecto utiliza datos mock(`src/data/`) para simular citas, doctores, medicamentos, documentos, centros de salud y usuario, por lo que no requiere backend para explorarse en modo desarrollo/demo.
- La navegación está basada en grupos de rutas de Expo Router: `(app)` agrupa las pantallas principales y `(tabs)` la navegación inferior (Home, Citas, Salud, Dohi, Perfil).

 Licencia

Este proyecto es privado (`"private": true` en `package.json`). Ajusta esta sección según la licencia que desees aplicar.

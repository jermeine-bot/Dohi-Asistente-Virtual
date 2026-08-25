# 🩺 DOHI — Asistente Virtual de Salud Digital Inteligente

<p align="center">
  <img src="./assets/images/logo.png" alt="DOHI Logo" width="140" height="140" />
</p>

<p align="center">
  <strong>Tu salud en buenas manos, donde sea que estés.</strong><br>
  <em>Plataforma integral de telemedicina, seguimiento médico, control biométrico y asistencia virtual con inteligencia artificial.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-~52.0.25-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.76.6-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-167FD1?style=for-the-badge" alt="Platforms" />
  <img src="https://img.shields.io/badge/Status-En_Desarrollo_Activo-10B981?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-Privado%20%26%20Académico-8B5CF6?style=for-the-badge" alt="License" />
</p>

---

##  Tabla de Contenidos

1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Objetivos y Propuesta de Valor](#-objetivos-y-propuesta-de-valor)
3. [Características y Módulos Principales](#-características-y-módulos-principales)
4. [Flujo de Navegación y Experiencia de Usuario](#-flujo-de-navegación-y-experiencia-de-usuario)
5. [Estructura del Proyecto y Arquitectura](#-estructura-del-proyecto-y-arquitectura)
6. [Sistema de Diseño e Identidad Visual](#-sistema-de-diseño-e-identidad-visual)
7. [Componentes Clave Reutilizables](#-componentes-clave-reutilizables)
8. [Guía de Instalación y Ejecución](#-guía-de-instalación-y-ejecución)
9. [Scripts Disponibles](#-scripts-disponibles)
10. [Seguridad y Privacidad de Datos Médicos](#-seguridad-y-privacidad-de-datos-médicos)
11. [Hoja de Ruta (Roadmap)](#-hoja-de-ruta-roadmap)
12. [Equipo y Licencia](#-equipo-y-licencia)

---

## Visión General del Proyecto

**DOHI** es una aplicación móvil de salud digital desarrollada con **React Native**, **Expo SDK 52**, **Expo Router** y **TypeScript**. El proyecto nace para solucionar la fragmentación en la atención médica cotidiana, reuniendo en una sola interfaz moderna e intuitiva:

- Orientación médica y conversacional con la mascota inteligente **Dohi**.
- Gestión, recordatorios y agendamiento de citas presenciales y videoconsultas en vivo.
- Control de adherencia y cronograma inteligente de medicamentos.
- Bóveda digital de exámenes, recetas y escáner de documentos médicos.
- Control antropométrico de peso e Índice de Masa Corporal (IMC) con gráficos evolutivos.
- Directorio georreferenciado de hospitales y centros de salud en Nicaragua.
- Protocolos de primeros auxilios y marcación directa a líneas de emergencia.
- Módulo de bienestar físico y salud emocional.

---

##  Objetivos y Propuesta de Valor

| Pilar | Descripción |
| :--- | :--- |
|  **Asistencia Amigable** | Acompañamiento clínico cercano mediante el personaje inteligente **Dohi**, humanizando la tecnología médica. |
|  **Cero Filas y Esperas** | Reserva inmediata de consultas médicas en 5 sencillos pasos y acceso a salas de telemedicina seguras. |
|  **Adherencia Terapéutica** | Seguimiento puntual de tomas y dosis con indicadores de progreso porcentual diario y semanal. |
|  **Expediente Centralizado** | Digitalización mediante cámara y almacenamiento categorizado de análisis clínicos e informes. |
|  **Respuesta Inmediata** | Guías de primeros auxilios paso a paso con advertencias médicas y enlace directo a los números de emergencia (118 / 128). |

---

##  Características y Módulos Principales

### 1.  Inicio (Dashboard Central)
- Saludo personalizado con estado del usuario y notificaciones.
- Tarjeta interactiva **Dohi Wellness** para iniciar conversaciones de orientación.
- Tarjeta de vista previa del próximo medicamento pendiente con hora y dosis.
- Accesos directos a Telemedicina, Citas, Documentos y Centros de Salud.

### 2.  Asistente Inteligente Dohi (Chat Clínico)
- Interfaz conversacional en tiempo real con indicador de actividad ("Dohi está respondiendo...").
- Motor de respuestas rápidas sobre fiebre, medicación, estrés, primeros auxilios y citas.
- Botones de sugerencias rápidas (*chips*) para continuar la interacción de forma fluida.
- Encabezado con estado "En línea" y verificación médica oficial.

### 3.  Gestión y Reserva de Citas Médicas
- Listado clasificado en pestañas: **Próximas**, **Completadas** y **Canceladas**.
- Flujo interactivo de reserva en 5 pasos:
  1. Selección de especialidad médica (Medicina General, Pediatría, Cardiología, etc.).
  2. Selección de especialista con foto, calificación, años de experiencia y clínica.
  3. Selección de fecha de atención.
  4. Selección de horario y modalidad (**Presencial** o **Videoconsulta Virtual**).
  5. Resumen detallado con confirmación inmediata y código de reserva.
- **Asistente de Cita**: Consejos y checklist de preparación previa a la consulta médica.

### 4. Telemedicina y Videoconsulta en Vivo (Dohi Meet)
- Sala de videoconferencia interactiva con simulación de transmisión en directo.
- Ventana flotante *Picture-in-Picture* (PiP) de la cámara del paciente.
- Controles multimedia completos: silenciar micrófono, apagar cámara, altavoz y chat médico integrado.

### 5.  Cronograma y Adherencia a Medicamentos
- Selector horizontal de días del mes en curso con indicador de fecha actual.
- Tarjeta de progreso diario con porcentaje de adherencia y anillo circular animado.
- Línea de tiempo cronológica organizada por momentos del día (Mañana, Tarde, Noche).
- Interacción para marcar medicamentos como **Tomado** o **Pendiente**.

### 6.  Documentos Médicos y Escáner de Exámenes
- Buscador en tiempo real por título, médico o institución de salud.
- Filtros por categoría: *Exámenes, Recetas, Resultados, Historial, Radiografías*.
- **Escáner con visor de cámara**: Detección de bordes, simulación de láser de escaneo, procesamiento óptico y almacenamiento directo en el expediente.

### 7.  Control Antropométrico: Peso e IMC
- Gráfico dinámico de evolución de peso y comparativa frente al peso meta.
- Calculadora interactiva de Índice de Masa Corporal (IMC) con categorización automática según estándares de la OMS: *Bajo Peso, Normal, Sobrepeso, Obesidad*.
- Historial de registros guardados con fecha y métricas.

### 8.  Guía de Primeros Auxilios y Emergencias
- Barra superior de llamada rápida a números de emergencia nacional en Nicaragua (**118 Policía/Emergencias** y **128 Cruz Roja**).
- Protocolos interactivos para: *Quemaduras, Heridas y Hemorragias, Fiebre Alta, Paro Cardíaco (RCP), Atragantamiento, Fracturas*.
- Pasos numerados, notas críticas de advertencia y listas claras de **Qué Hacer** y **Qué Evitar**.

### 9.  Puntos de Salud en Nicaragua
- Directorio de hospitales y centros de salud en **Managua, León y Estelí**.
- Filtros por departamento y buscador inteligente por nombre o dirección.
- Modo de visualización dual: **Lista detallada** o **Mapa interactivo**.
- Horarios de atención, servicios disponibles y teléfonos de emergencia directa.

### 10.  Bienestar Emocional y Registro Físico
- **Bienestar Emocional**: Selector de estado anímico con emojis, factores determinantes (*Trabajo, Sueño, Familia, etc.*), notas reflexivas y consejos de respiración consciente.
- **Bienestar Físico**: Registro de síntomas frecuentes con escala de intensidad numérica del 1 al 5 y recomendaciones preventivas.

### 11.  Perfil y Seguridad del Paciente
- Resumen clínico básico: tipo de sangre, fecha de nacimiento y número de alergias registradas.
- Tarjeta de contacto de emergencia con botón de llamada directa.
- Configuración de preferencias: notificaciones, autenticación biométrica (FaceID/Huella) y modo sin conexión (*Offline*).
- Pie de marca con el isotipo oficial de **DOHI Salud Digital**.

---

##  Flujo de Navegación y Experiencia de Usuario

```
                               ┌──────────────┐
                               │  app/index   │
                               └──────┬───────┘
                                      │
                               ┌──────▼───────┐
                               │ Splash Screen│
                               └──────┬───────┘
                                      │
                               ┌──────▼───────┐
                               │  Onboarding  │ (1. Bienvenida -> 2. Consultas -> 3. Citas)
                               └──────┬───────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               │                                             │
      ┌────────▼────────┐                           ┌────────▼────────┐
      │  Tabs Layout    │                           │  Módulos App    │
      │  (app)/(tabs)   │                           │  (app)/...      │
      └────────┬────────┘                           └────────┬────────┘
               │                                             │
    ┌──────────┼──────────┬──────────┬──────────┐            ├── appointment-assistant/
    │          │          │          │          │            ├── book-appointment/
┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐        ├── documents/
│ Home  │  │ Citas │  │ Salud │  │ Dohi  │  │Perfil │        ├── first-aid/
└───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘  └───┬───┘        ├── health-centers/
    │          │          │          │          │            ├── medications/
    │          │          │          │          │            ├── scanner/
    └──────────┴──────────┴──────────┴──────────┘            ├── virtual-consultation/
                                                             ├── weight/
                                                             └── wellness/
```

---

##  Estructura del Proyecto y Arquitectura

```
dohi-app/
├── app/                                # Enrutamiento basado en archivos (Expo Router)
│   ├── _layout.tsx                     # Layout global con fuentes Poppins y Stack
│   ├── index.tsx                       # Redirección de entrada principal
│   ├── splash.tsx                      # Pantalla de presentación con logo y mascota PNG
│   ├── onboarding/                     # Flujo de bienvenida y primeros pasos
│   │   ├── _layout.tsx
│   │   ├── index.tsx                   # Paso 1: Bienvenida oficial
│   │   ├── consultations.tsx           # Paso 2: Telemedicina
│   │   └── appointments.tsx            # Paso 3: Agendamiento
│   └── (app)/                          # Grupo protegido de la aplicación
│       ├── _layout.tsx
│       ├── (tabs)/                     # Navegación por pestañas inferiores
│       │   ├── _layout.tsx
│       │   ├── index.tsx               # Tab 1: Dashboard Home
│       │   ├── appointments.tsx        # Tab 2: Mis Citas
│       │   ├── health.tsx              # Tab 3: Centro de Salud Hub
│       │   ├── dohi.tsx                # Tab 4: Chat Asistente Dohi
│       │   └── profile.tsx             # Tab 5: Perfil y Ajustes
│       ├── appointment-assistant/      # Asistente de citas y consejos
│       ├── book-appointment/          # Flujo de 5 pasos para reservar cita
│       ├── documents/                 # Bóveda de documentos médicos
│       ├── first-aid/                 # Guía clínica de primeros auxilios
│       ├── health-centers/            # Centros de salud y hospitales
│       ├── medications/               # Adherencia y cronograma de dosis
│       ├── scanner/                   # Escáner de recetas y exámenes
│       ├── virtual-consultation/      # Sala de videoconsulta médica
│       ├── weight/                    # Calculadora y gráficos de IMC/Peso
│       └── wellness/                  # Módulos de bienestar físico y emocional
│
├── src/                                # Código fuente modular y reutilizable
│   ├── components/                     # Componentes organizados por dominio
│   │   ├── charts/                    # Gráficos evolutivos (WeightChart)
│   │   ├── common/                    # Componentes UI (AppLogo, AppHeader, AppButton, AppText, etc.)
│   │   ├── dohi/                      # Componentes de Dohi (DohiCharacter, DohiWellnessCard, MessageBubble)
│   │   ├── medical/                   # Componentes médicos (AppointmentCard, MedicationCard, HealthCenterCard, etc.)
│   │   └── navigation/                # Barra de navegación personalizada (CustomTabBar)
│   ├── data/                          # Mocks clínicos y datos de demostración
│   │   ├── mockAppointments.ts
│   │   ├── mockDoctors.ts
│   │   ├── mockDocuments.ts
│   │   ├── mockFeatures.ts
│   │   ├── mockFirstAid.ts
│   │   ├── mockHealthCenters.ts
│   │   ├── mockMedications.ts
│   │   ├── mockMessages.ts
│   │   ├── mockUser.ts
│   │   └── mockWeight.ts
│   ├── theme/                         # Sistema de diseño centralizado
│   │   ├── colors.ts                  # Paleta de colores oficial
│   │   ├── radius.ts                  # Radios de bordes estándar
│   │   ├── shadows.ts                 # Elevaciones y sombras suaves
│   │   ├── spacing.ts                 # Escala de márgenes y paddings
│   │   └── typography.ts              # Escalas de texto y pesos
│   └── types/                         # Interfaces y tipos TypeScript
│
├── assets/                             # Recursos estáticos de alta definición
│   └── images/
│       ├── logo.png                   # Logotipo oficial de la aplicación (1046x1046 px)
│       ├── dohi-avatar.png            # Mascota oficial Dohi para avatares y chat (1511x1600 px)
│       ├── dohi-home.png              # Mascota oficial Dohi para bienvenida (1046x1046 px)
│       ├── icon.png                   # Ícono de aplicación
│       ├── splash-icon.png            # Ícono de splash
│       ├── adaptive-icon.png          # Ícono adaptable Android
│       └── favicon.png                # Favicon web
│
├── app.json                            # Configuración de Expo y metadatos
├── babel.config.js                    # Configuración de Babel y Reanimated
├── package.json                       # Dependencias y scripts del proyecto
└── tsconfig.json                      # Configuración estricta de TypeScript
```

---

##  Sistema de Diseño e Identidad Visual

### Paleta de Colores

| Color | Hex | Uso Principal |
| :--- | :--- | :--- |
| **Primary (Azul Clínico)** | `#167FD1` | Botones de acción, enlaces, elementos activos y marca |
| **Navy (Azul Marino)** | `#0F172A` | Títulos principales, textos de alta jerarquía y fondos oscuros |
| **Light Blue** | `#E6F0FA` | Fondos de tarjetas Dohi, badges suaves y halos decorativos |
| **Success (Verde Salud)** | `#10B981` | Estados confirmados, adherencia completada y videoconsultas |
| **Warning (Ámbar)** | `#F59E0B` | Recordatorios, medicamentos pendientes y niveles medios |
| **Error (Rojo Emergencia)** | `#DC2626` | Botones de emergencia 118/128, alergias y llamadas |
| **Background** | `#F8FAFC` | Fondo general de las pantallas de la aplicación |

### Tipografía
- **Familia principal:** `Poppins` (`Poppins_400Regular`, `Poppins_500Medium`, `Poppins_600SemiBold`, `Poppins_700Bold`).
- **Jerarquía:** Escalas modulares desde `xs` (11px) hasta `4xl` (36px).

---

##  Componentes Clave Reutilizables

### `AppLogo`
Componente para renderizar el isotipo oficial de DOHI en PNG con soporte para control de dimensiones y ajuste proporcional `contain`:
```tsx
import { AppLogo } from '@/src/components/common';

<AppLogo size={48} />
<AppLogo width={120} height={40} />
```

### `DohiCharacter`
Componente del personaje inteligente Dohi en PNG que soporta variantes para distintas pantallas:
```tsx
import { DohiCharacter } from '@/src/components/dohi';

// Para chat, burbujas y avatares:
<DohiCharacter variant="avatar" size="md" />

// Para bienvenida, onboarding y splash:
<DohiCharacter variant="hero" size={190} />
```

### `AppHeader`
Encabezado estándar con soporte opcional para retroceso (`onBack`), logotipo oficial (`showLogo`) y elementos de acción derecha (`rightElement`):
```tsx
import { AppHeader } from '@/src/components/common';

<AppHeader
  title="Mis Medicamentos"
  showLogo={true}
  onBack={() => router.back()}
  rightElement={<IconButton icon="plus" onPress={handleAdd} />}
/>
```

---

##  Guía de Instalación y Ejecución

### Requisitos Previos
- **Node.js:** Versión 18.x o superior (LTS recomendada).
- **npm** (v9+) o **yarn** / **pnpm**.
- **Expo Go** instalado en tu dispositivo físico Android o iOS (opcional para pruebas en vivo).
- **Android Studio** (si utilizas emulador de Android) o **Xcode** (para simulador de iOS en macOS).

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Dohi-Asistente-Virtual.git
cd Dohi-Asistente-Virtual
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npx expo start
```

Desde la terminal interactiva puedes presionar:
- `a` para abrir en un dispositivo o emulador de **Android**.
- `i` para abrir en el simulador de **iOS** (macOS).
- `w` para abrir en el navegador **Web**.
- Escanear el código QR con la app **Expo Go** para probar en tu teléfono.

---

##  Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor Metro Bundler de Expo |
| `npm run android` | Lanza la aplicación directamente en emulador/dispositivo Android |
| `npm run ios` | Lanza la aplicación directamente en simulador de iOS |
| `npm run web` | Compila y sirve la aplicación en versión Web local |
| `npm run lint` | Ejecuta el linter estático de Expo para detección de errores |
| `npx tsc --noEmit` | Valida la consistencia de tipos de TypeScript en todo el proyecto |

---

##  Seguridad y Privacidad de Datos Médicos

La aplicación está diseñada siguiendo buenas prácticas para el manejo de información médica sensible:
- **Separación de capas:** Los datos clínicos se gestionan de manera tipada y desacoplada de la interfaz.
- **Preparación para cifrado:** Diseñado para soportar autenticación biométrica local (FaceID/Fingerprint) y almacenamiento seguro en Keychain/Keystore.
- **Datos de prueba (Mock Data):** Los registros actuales son demostrativos y no contienen información médica real de pacientes.

---

##  Hoja de Ruta (Roadmap)

- [x] Arquitectura de pantallas y navegación por pestañas con Expo Router.
- [x] Integración de identidad visual oficial y mascotas PNG de Dohi en todas las pantallas.
- [x] Módulos completos: Citas, Telemedicina, Medicamentos, Documentos, Escáner, IMC, Centros de Salud, Primeros Auxilios y Bienestar.
- [x] Tipado estricto y componentes UI reutilizables (100% TypeScript validado).
- [ ] **Fase 2:** Conexión con Backend REST / GraphQL y Base de Datos PostgreSQL.
- [ ] **Fase 3:** Integración del Asistente Dohi con LLM y RAG médico especializado.
- [ ] **Fase 4:** Notificaciones push locales para recordatorios de medicamentos y citas.
- [ ] **Fase 5:** Mapas en vivo con geolocalización GPS para centros de salud en Nicaragua.

---

##  Equipo y Licencia

Este proyecto es de carácter privado y académico para la modernización de la salud digital.

- **Aplicación:** DOHI — Asistente Virtual de Salud Digital
- **Versión:** 1.0.0
- **Año:** 2026

*Desarrollado con dedicación para tu salud y bienestar.*

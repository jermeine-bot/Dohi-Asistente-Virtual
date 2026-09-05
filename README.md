#  DOHI — Asistente Virtual de Salud Digital Inteligente

<p align="center">
  <img src="./assets/images/logo.png" alt="DOHI Logo" width="140" height="140" />
</p>

<p align="center">
  <strong>Tu salud en buenas manos, donde sea que estés.</strong><br>
  <em>Plataforma integral de telemedicina, seguimiento médico, control biométrico, vigilancia epidemiológica y asistencia virtual con inteligencia artificial para Nicaragua.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-~52.0.25-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.76.6-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Backend%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-167FD1?style=for-the-badge" alt="Platforms" />
  <img src="https://img.shields.io/badge/Status-100%25%20Ready%20%26%20Funcional-10B981?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-Privado%20%26%20Académico-8B5CF6?style=for-the-badge" alt="License" />
</p>

---

## 📋 Tabla de Contenidos

1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Objetivos y Propuesta de Valor](#-objetivos-y-propuesta-de-valor)
3. [Características y Módulos Principales (13 Módulos "Ready")](#-características-y-módulos-principales-13-módulos-ready)
4. [Flujo de Navegación y Experiencia de Usuario](#-flujo-de-navegación-y-experiencia-de-usuario)
5. [Estructura del Proyecto y Arquitectura](#-estructura-del-proyecto-y-arquitectura)
6. [Integración de Backend & Autenticación (Supabase)](#-integración-de-backend--autenticación-supabase)
7. [Sistema de Diseño e Identidad Visual](#-sistema-de-diseño-e-identidad-visual)
8. [Catálogo de Componentes Reutilizables](#-catálogo-de-componentes-reutilizables)
9. [Guía de Instalación y Configuración Paso a Paso](#-guía-de-instalación-y-configuración-paso-a-paso)
10. [Scripts Disponibles](#-scripts-disponibles)
11. [Seguridad y Privacidad de Datos Médicos](#-seguridad-y-privacidad-de-datos-médicos)
12. [Hoja de Ruta (Roadmap Evolutivo)](#-hoja-de-ruta-roadmap-evolutivo)
13. [Equipo y Licencia](#-equipo-y-licencia)

---

## 🌟 Visión General del Proyecto

**DOHI** es una plataforma móvil multiplataforma de salud digital desarrollada con **React Native**, **Expo SDK 52**, **Expo Router** y **TypeScript**, diseñada para centralizar y modernizar la atención médica cotidiana. 

La aplicación integra la experiencia médica digital respondiendo directamente a las necesidades del sistema de salud y contexto territorial de **Nicaragua**:

- 🤖 **Orientación clínica inteligente:** Acompañamiento interactivo mediante la mascota médica **Dohi**.
- 🩺 **Agendamiento y Telemedicina:** Citas presenciales y consultas virtuales en vivo (*Dohi Meet*) con simulación de videollamada y control multimedia.
- 💊 **Adherencia a Medicamentos:** Control de tomas diarias con visualización de progreso porcentual y timeline interactivo.
- 📁 **Expediente Digital y Escáner:** Almacenamiento categorizado de exámenes, recetas y escáner óptico asistido por cámara.
- ⚖️ **Control Antropométrico:** Gráficos evolutivos de peso y calculador de IMC según estándares de la Organización Mundial de la Salud (OMS).
- 🚨 **Vigilancia Epidemiológica Territorial:** Alertas clasificadas por nivel de riesgo (🔴🟠🟡🔵) con mapa de prevención y checklists de síntomas.
- 📢 **Jornadas y Ferias de Salud:** Mapeo de jornadas de vacunación, fumigación y atención médica filtradas por **Departamento $\rightarrow$ Municipio $\rightarrow$ Barrio/Comarca**.
- 🚑 **Guía de Emergencia Directa:** Enlace telefónico inmediato a las líneas nacionales de emergencia (**118** Policía/Emergencias y **128** Cruz Roja) con manuales interactivos de primeros auxilios.

---

## 🎯 Objetivos y Propuesta de Valor

| Pilar | Descripción |
| :--- | :--- |
| 🤖 **Asistencia Humanizada** | Acompañamiento médico cercano mediante el personaje **Dohi**, haciendo accesible la orientación en salud. |
| ⚡ **Cero Filas y Esperas** | Reserva directa de consultas médicas en 5 sencillos pasos y acceso a salas de videoconsulta seguras. |
| 💊 **Adherencia Terapéutica** | Seguimiento puntual de medicamentos con anillos de progreso porcentual diario y alertas visuales. |
| 📂 **Expediente Centralizado** | Digitalización mediante cámara y organización categorizada de análisis, recetas y radiografías. |
| 🚨 **Vigilancia Epidemiológica** | Alertas territoriales en tiempo real con recomendaciones oficiales del MINSA y la OPS. |
| 📍 **Jornadas Comunitarias** | Filtrado preciso de ferias de salud por Departamento, Municipio y Barrio en todo el territorio nacional. |
| 🆘 **Respuesta ante Emergencias** | Protocolos clínicos guiados paso a paso con botón de llamada directa a líneas de auxilio (118 / 128). |

---

## 📱 Características y Módulos Principales (13 Módulos "Ready")

### 1. 🏠 Inicio (Dashboard Central)
- **Ubicación:** [`app/(app)/(tabs)/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/(tabs)/index.tsx)
- Saludo dinámico al paciente con estado de salud.
- Tarjeta destacada **Dohi Wellness** para iniciar chats de orientación.
- Banner de **Alerta Epidemiológica Roja** activo en el departamento del usuario.
- Tarjeta de vista previa del **próximo medicamento pendiente** con dosis y hora.
- Parrilla de accesos rápidos a Telemedicina, Mis Citas, Mis Documentos, Jornadas de Salud y Centros de Atención.

### 2. 🤖 Asistente Virtual Dohi (Chat Clínico)
- **Ubicación:** [`app/(app)/(tabs)/dohi.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/(tabs)/dohi.tsx)
- Interfaz de chat en tiempo real con avatar reactivo de Dohi.
- Indicador de estado animado (*"Dohi está escribiendo..."*).
- Respuestas automáticas preparadas para dudas frecuentes (fiebre, vacunación, citas, estrés, primeros auxilios).
- Botones de sugerencias rápidas (*chips*) para dinamizar la conversación.

### 3. 📅 Gestión y Reserva de Citas Médicas
- **Ubicaciones:** [`app/(app)/(tabs)/appointments.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/(tabs)/appointments.tsx) y [`app/(app)/book-appointment/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/book-appointment/index.tsx)
- Gestión de citas clasificadas por pestañas: **Próximas**, **Completadas** y **Canceladas**.
- **Flujo de reserva interactivo en 5 pasos:**
  1. Selección de especialidad médica (Medicina General, Pediatría, Cardiología, Ginecología, etc.).
  2. Selección de especialista con foto, calificación, años de experiencia y hospital.
  3. Selección de fecha de atención.
  4. Selección de horario y modalidad (**Presencial** o **Videoconsulta Virtual**).
  5. Resumen detallado con confirmación y generación de código de cita.

### 4. 🩺 Asistente de Preparación de Cita
- **Ubicación:** [`app/(app)/appointment-assistant/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/appointment-assistant/index.tsx)
- Consejos personalizados pre-consulta médica.
- Checklist de preparación (exámenes previos, lista de síntomas, documentos de identidad y seguro).

### 5. 📹 Telemedicina (Dohi Meet)
- **Ubicación:** [`app/(app)/virtual-consultation/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/virtual-consultation/index.tsx)
- Sala interactiva de videollamada con transmisión en vivo simulada del especialista.
- Ventana flotante *Picture-in-Picture* (PiP) para la vista previa de la cámara del usuario.
- Panel de control multimedia: encender/apagar cámara, silenciar micrófono, cambiar altavoz y chat clínico integrado.

### 6. Cronograma y Adherencia a Medicamentos
- **Ubicación:** [`app/(app)/medications/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/medications/index.tsx)
- Selector horizontal de días del mes en curso.
- Anillo visual de progreso circular [`ProgressCircle.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/src/components/common/ProgressCircle.tsx) que muestra el porcentaje de tomas completadas.
- Timeline cronológico clasificado por momentos del día: **Mañana**, **Tarde** y **Noche**.
- Acción en un toque para marcar medicamentos como **Tomado** o **Pendiente**.
- Modal completo para registrar nuevos tratamientos [`AddMedicationModal.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/src/components/medical/AddMedicationModal.tsx).

### 7. Documentos Médicos y Escáner con Cámara
- **Ubicaciones:** [`app/(app)/documents/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/documents/index.tsx) y [`app/(app)/scanner/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/scanner/index.tsx)
- Bóveda de archivos con buscador por título o doctor.
- Filtros por categoría: *Exámenes, Recetas, Resultados, Historial, Radiografías*.
- **Escáner inteligente:** Visor de cámara simulado con marco de detección de bordes, animación láser de escaneo y almacenamiento automático.

### 8. Control Antropométrico: Peso e IMC
- **Ubicación:** [`app/(app)/weight/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/weight/index.tsx)
- Gráfico curvo interactivo [`WeightChart.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/src/components/charts/WeightChart.tsx) con la evolución del peso frente a la meta fijada.
- Calculadora de Índice de Masa Corporal (IMC) con barra indicadora según parámetros de la OMS (*Bajo peso, Normal, Sobrepeso, Obesidad*).
- Historial de pesajes con diferencial de cambio en kilogramos.

### 9. Guía de Primeros Auxilios y Emergencias
- **Ubicación:** [`app/(app)/first-aid/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/first-aid/index.tsx)
- Barra superior de llamada inmediata a números de emergencia nacional en Nicaragua: **118** (Policía/Emergencias) y **128** (Cruz Roja).
- Protocolos ilustrados para: *Quemaduras, Heridas y Hemorragias, Fiebre Alta, Paro Cardíaco (RCP), Atragantamiento y Fracturas*.
- Pasos de acción numerados, lista de **Qué hacer** y advertencias de **Qué evitar**.

### 10. Directores de Salud en Nicaragua
- **Ubicación:** [`app/(app)/health-centers/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/health-centers/index.tsx)
- Directorio de hospitales y centros médicos (Hospital Vivian Pellas, Vélez Paiz, Lenín Fonseca, etc.).
- Filtro por Departamento (Managua, León, Estelí, etc.) y selector de vista **Lista** o **Mapa interactivo**.
- Horarios de atención, especialidades disponibles y botón de llamada telefónica.

### 11.  Bienestar Emocional y Registro Físico
- **Ubicación:** [`app/(app)/wellness/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/wellness/index.tsx)
- **Salud Emocional:** [`emotional.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/wellness/emotional.tsx) - Selector de estado de ánimo con emojis, factores causales (*Trabajo, Sueño, Familia*), notas y ejercicio guiado de respiración consciente.
- **Salud Física:** [`physical.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/wellness/physical.tsx) - Evaluación de síntomas con escala de intensidad (1 al 5) y consejos preventivos.

### 12. Jornadas y Eventos Territoriales de Salud
- **Ubicaciones:** [`app/(app)/health-campaigns/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/health-campaigns/index.tsx) y [`[id].tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/health-campaigns/[id].tsx)
- Búsqueda territorial: **Departamento $\rightarrow$ Municipio $\rightarrow$ Barrio/Comarca**.
- Categorías: *Vacunación, Abatización/Dengue, Salud Materna, Odontología, Oftalmología*.
- Vista en lista o mapa territorial, recordatorio en calendario y opción para **Compartir vía WhatsApp**.

### 13. Alertas Epidemiológicas por Zona
- **Ubicaciones:** [`app/(app)/epidemiological-alerts/index.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/epidemiological-alerts/index.tsx) y [`[id].tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/app/(app)/epidemiological-alerts/[id].tsx)
- Clasificación de alertas oficiales según severidad de color:
  - 🔴 **Alta Prioridad**: Brotes activos (ej. Dengue DENV-3 en Managua).
  - 🟠 **Atención**: Incremento de Infecciones Respiratorias Agudas (IRA).
  - 🟡 **Preventiva**: Campañas de desratización y control vectorial.
  - 🔵 **Informativa**: Boletines oficiales del Ministerio de Salud (MINSA).
- Vista en detalle con **Checklist de prevención**, **Síntomas característicos**, fuente oficial (MINSA/OPS) y switch para **Notificaciones locales de zona**.

---

## 🔄 Flujo de Navegación y Experiencia de Usuario

```
                                ┌──────────────┐
                                │  app/index   │
                                └──────┬───────┘
                                       │
                                ┌──────▼───────┐
                                │ Splash Screen│ (Animación y Mascota Dohi)
                                └──────┬───────┘
                                       │
                                ┌──────▼───────┐
                                │  Onboarding  │ (1. Bienvenida -> 2. Telemedicina -> 3. Citas)
                                └──────┬───────┘
                                       │
                 ┌─────────────────────┴─────────────────────┐
                 │                                           │
        ┌────────▼────────┐                         ┌────────▼────────┐
        │  Autenticación  │                         │  Tabs Layout    │
        │   (app)/(auth)  │                         │  (app)/(tabs)   │
        └────────┬────────┘                         └────────┬────────┘
                 │                                           │
    ┌────────────┼────────────┐            ┌─────────┬───────┴─┬─────────┬─────────┐
    │            │            │            │         │         │         │         │
┌───▼───┐    ┌───▼───┐    ┌───▼───┐    ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐
│ Login │    │Register│   │ForgotP│    │ Home  │ │ Citas │ │ Salud │ │ Dohi  │ │Perfil │
└───────┘    └───────┘    └───────┘    └───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘
                                           │         │         │         │         │
                                           └─────────┴────┬────┴─────────┴─────────┘
                                                          │
                                           ┌──────────────┴──────────────┐
                                           │   Módulos y Herramientas    │
                                           ├─────────────────────────────┤
                                           │ ├── appointment-assistant/  │
                                           │ ├── book-appointment/       │
                                           │ ├── documents/              │
                                           │ ├── epidemiological-alerts/ │
                                           │ ├── first-aid/              │
                                           │ ├── health-campaigns/       │
                                           │ ├── health-centers/         │
                                           │ ├── medications/            │
                                           │ ├── scanner/                │
                                           │ ├── virtual-consultation/   │
                                           │ ├── weight/                 │
                                           │ └── wellness/               │
                                           └─────────────────────────────┘
```

---

## 🏗️ Estructura del Proyecto y Arquitectura

```
dohi-app/
├── app/                                # Enrutamiento basado en archivos (Expo Router v4)
│   ├── _layout.tsx                     # Layout global con carga de Poppins y AuthProvider
│   ├── index.tsx                       # Entrada principal de la app
│   ├── splash.tsx                      # Pantalla de carga animada con mascota Dohi
│   ├── onboarding/                     # Flujo interactivo de introducción
│   │   ├── _layout.tsx
│   │   ├── index.tsx                   # Paso 1: Bienvenida
│   │   ├── consultations.tsx           # Paso 2: Telemedicina
│   │   └── appointments.tsx            # Paso 3: Agendamiento inteligente
│   ├── (auth)/                         # Grupo de autenticación
│   │   ├── _layout.tsx
│   │   ├── login.tsx                   # Inicio de sesión Supabase
│   │   ├── register.tsx                # Registro de nuevos pacientes
│   │   └── forgot-password.tsx         # Recuperación de clave
│   └── (app)/                          # Grupo protegido de la aplicación
│       ├── _layout.tsx
│       ├── (tabs)/                     # Navegación por pestañas flotantes inferiores
│       │   ├── _layout.tsx             # Configuración del CustomTabBar
│       │   ├── index.tsx               # Tab 1: Dashboard Home
│       │   ├── appointments.tsx        # Tab 2: Mis Citas
│       │   ├── health.tsx              # Tab 3: Centro de Salud Hub
│       │   ├── dohi.tsx                # Tab 4: Chat Asistente Dohi
│       │   └── profile.tsx             # Tab 5: Perfil del Paciente
│       ├── appointment-assistant/      # Preparación pre-consulta
│       ├── book-appointment/          # Wizard de 5 pasos para reservar cita
│       ├── documents/                 # Bóveda digital de expedientes
│       ├── epidemiological-alerts/     # Alertas de salud pública (🔴🟠🟡🔵)
│       ├── first-aid/                 # Manual de emergencias y llamadas 118/128
│       ├── health-campaigns/          # Jornadas de salud por departamento/municipio/barrio
│       ├── health-centers/            # Directores de hospitales y centros médicos
│       ├── medications/               # Adherencia y dosis diarias
│       ├── scanner/                   # Escáner asistido de documentos
│       ├── virtual-consultation/      # Sala de videoconsulta (Dohi Meet)
│       ├── weight/                    # Seguimiento de peso e IMC
│       └── wellness/                  # Módulos de salud física y emocional
│
├── src/                                # Código fuente de la aplicación
│   ├── components/                     # Componentes ordenados por dominio
│   │   ├── charts/                     # Gráficos evolutivos (WeightChart)
│   │   ├── common/                     # UI genérica (AppButton, AppCard, AppHeader, AppInput, AppText, etc.)
│   │   ├── dohi/                       # Componentes de Dohi (DohiCharacter, DohiWellnessCard, MessageBubble)
│   │   ├── medical/                    # Cards médicas (AppointmentCard, MedicationCard, HealthCenterCard, etc.)
│   │   └── navigation/                 # Navegación flotante personalizada (CustomTabBar)
│   ├── context/                        # Contextos de React
│   │   └── AuthContext.tsx             # Gestión de sesión de usuario y autenticación
│   ├── data/                           # Datasets Mock adaptados a Nicaragua (13 archivos)
│   ├── theme/                          # Tokens del sistema de diseño
│   │   ├── colors.ts                   # Paleta oficial (Primary, Navy, Success, Warning, Error)
│   │   ├── radius.ts                   # Bordes redondeados estándar
│   │   ├── shadows.ts                  # Sombras y elevaciones
│   │   ├── spacing.ts                  # Escala de márgenes y rellenos
│   │   └── typography.ts               # Jerarquía de texto y pesos Poppins
│   └── types/                          # Interfaces de TypeScript (13 modelos estritos)
│
├── server/                             # Servicios y clientes de backend
│   └── src/
│       ├── config/
│       │   └── supabase.ts             # Inicialización del cliente Supabase con AsyncStorage
│       └── services/
│           └── authService.ts          # Métodos de Login, SignOut, getSession y AuthState Listener
│
├── assets/                             # Recursos gráficos oficiales
│   └── images/
│       ├── logo.png                    # Isotipo oficial de DOHI (1046x1046 px)
│       ├── dohi-avatar.png             # Mascota Dohi versión avatar (1511x1600 px)
│       ├── dohi-home.png               # Mascota Dohi versión héroe (1046x1046 px)
│       ├── icon.png                    # Ícono principal
│       ├── splash-icon.png             # Ícono de pantalla de carga
│       └── adaptive-icon.png           # Ícono adaptable Android
│
├── .env.example                        # Plantilla de variables de entorno para Supabase
├── app.json                            # Metadatos y configuración de Expo SDK 52
├── babel.config.js                     # Configuración de Babel y Reanimated
├── package.json                        # Dependencias y scripts
└── tsconfig.json                       # Configuración estricta de TypeScript
```

---

## ⚡ Integración de Backend & Autenticación (Supabase)

El proyecto cuenta con una integración limpia y desacoplada con **Supabase**:

- **Cliente Supabase:** [`server/src/config/supabase.ts`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/server/src/config/supabase.ts)
  ```typescript
  import 'react-native-url-polyfill/auto';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { createClient } from '@supabase/supabase-js';

  export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  );
  ```

- **Servicio de Autenticación:** [`server/src/services/authService.ts`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/server/src/services/authService.ts) encapsula el inicio de sesión con correo y contraseña (`signInWithPassword`), cierre de sesión (`signOut`), comprobación de sesión activa (`getSession`) y suscripción a cambios (`onAuthStateChange`).

- **Proveedor de Contexto:** [`src/context/AuthContext.tsx`](file:///home/jermeine/Vídeos/dohi%20app/Dohi-Asistente-Virtual/src/context/AuthContext.tsx) expone la sesión y el perfil del usuario mediante el hook `useAuth()`.

---

## 🎨 Sistema de Diseño e Identidad Visual

### Paleta de Colores Oficial

| Token | Color Hex | Uso Principal |
| :--- | :--- | :--- |
| `primary` | `#167FD1` | Botones de acción, enlaces, marca principal y elementos activos |
| `navy` | `#0F172A` | Títulos de alta jerarquía, encabezados y textos oscuros |
| `lightBlue` | `#E6F0FA` | Fondos de tarjetas de Dohi, badges informativos y halos decorativos |
| `success` | `#10B981` | Medicamentos tomados, estados confirmados y videoconsulta activa |
| `warning` | `#F59E0B` | Medicamentos pendientes, avisos de atención y recordatorios |
| `error` | `#DC2626` | Alertas epidemiológicas rojas, llamadas de emergencia (118/128) y descarte |
| `background` | `#F8FAFC` | Fondo general de las pantallas |
| `surface` | `#FFFFFF` | Fondo de tarjetas elevadas y modals |

### Tipografía
- **Fuente Principal:** `Poppins` (`Poppins_400Regular`, `Poppins_500Medium`, `Poppins_600SemiBold`, `Poppins_700Bold`).
- **Escala:** `xs` (11px), `sm` (13px), `md` (15px), `lg` (18px), `xl` (20px), `2xl` (24px), `3xl` (30px), `4xl` (36px).

---

## 🧩 Catálogo de Componentes Reutilizables

### `AppLogo`
Renders del isotipo oficial de DOHI en formato PNG con control de proporciones:
```tsx
import { AppLogo } from '@/src/components/common';

<AppLogo size={48} />
```

### `DohiCharacter`
Componente del personaje inteligente Dohi en PNG con soporte para variantes:
```tsx
import { DohiCharacter } from '@/src/components/dohi';

// Variante Avatar para chats y tarjetas pequeñas:
<DohiCharacter variant="avatar" size="md" />

// Variante Héroe para Splash y Onboarding:
<DohiCharacter variant="hero" size={190} />
```

### `AppHeader`
Encabezado estándar para pantallas secundarias con botón de retroceso opcional y acciones a la derecha:
```tsx
import { AppHeader, IconButton } from '@/src/components/common';

<AppHeader
  title="Mis Medicamentos"
  showLogo={false}
  onBack={() => router.back()}
  rightElement={<IconButton icon="plus" onPress={openAddModal} />}
/>
```

---

## 🚀 Guía de Instalación y Configuración Paso a Paso

### Requisitos Previos
- **Node.js:** Versión 18.x o superior (LTS recomendada).
- **npm** (v9+) o **yarn** / **pnpm**.
- **Expo Go App** instalada en tu teléfono Android o iOS (opcional para pruebas en dispositivo físico).
- **Android Studio** (si usas emulador de Android) o **Xcode** (para simulador iOS en macOS).

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/Dohi-Asistente-Virtual.git
cd Dohi-Asistente-Virtual
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Configurar Variables de Entorno
Copia el archivo de plantilla `.env.example` y crea tu archivo `.env`:
```bash
cp .env.example .env
```
Abre `.env` y agrega las credenciales de tu proyecto de **Supabase**:
```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Paso 4: Iniciar el Servidor de Desarrollo
```bash
npx expo start
```

En la terminal interactiva:
- Presiona `a` para abrir en emulador de **Android**.
- Presiona `i` para abrir en simulador de **iOS**.
- Presiona `w` para abrir la versión **Web** en el navegador.
- O escanea el código QR desde la aplicación **Expo Go** en tu smartphone.

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor Metro Bundler de Expo |
| `npm run android` | Ejecuta la app directamente en emulador o dispositivo Android conectado |
| `npm run ios` | Ejecuta la app directamente en el simulador de iOS (macOS) |
| `npm run web` | Compila y sirve la aplicación para navegador Web local |
| `npm run lint` | Ejecuta el linter estático de Expo para verificar el código |
| `npx tsc --noEmit` | Valida la coherencia de tipos de TypeScript en todo el proyecto |

---

## 🔒 Seguridad y Privacidad de Datos Médicos

La arquitectura del proyecto aplica las recomendaciones para la gestión de datos sensibles de salud:
- **Separación estricta de capas:** Los modelos de datos (`src/types/`) están aislados de la capa de presentación.
- **Preparación para cifrado:** Diseñado para integrar autenticación biométrica local (*FaceID / Huella dactilar*) y almacenamiento seguro en Keychain/Keystore mediante Expo SecureStore.
- **Datos de Demostración:** Los datos actuales son ilustrativos y no contienen información confidencial ni datos reales de pacientes.

---

## 🗺️ Hoja de Ruta (Roadmap Evolutivo)

- [x] **Fase 1:** Arquitectura de navegación con Expo Router (Tabs, Stack, Modales y Onboarding).
- [x] **Fase 1:** Integración de la identidad visual oficial y mascotas PNG de Dohi en todas las pantallas.
- [x] **Fase 1:** Módulos funcionales completados (Citas, Telemedicina, Medicamentos, Documentos, Escáner, IMC, Centros de Salud, Primeros Auxilios, Bienestar, **Jornadas de Salud** y **Alertas Epidemiológicas**).
- [x] **Fase 1:** Tipado 100% estricto en TypeScript y catálogo de componentes UI reutilizables.
- [x] **Fase 1:** Integración inicial del cliente Supabase (`server/src/config/supabase.ts`) y `AuthContext`.
- [ ] **Fase 2:** Sincronización completa en tiempo real de tablas de PostgreSQL en Supabase (Citas, Medicamentos, Alertas y Documentos).
- [ ] **Fase 3:** Integración del motor conversacional del Asistente Dohi con LLM y RAG médico especializado.
- [ ] **Fase 4:** Programación de Notificaciones Push Locales para alertas de medicamentos y citas programadas.
- [ ] **Fase 5:** Mapas interactivos con geolocalización GPS en vivo para centros de salud y jornadas en Nicaragua.

---

## 🤝 Equipo y Licencia

Este proyecto ha sido desarrollado como una solución integral de telemedicina e inteligencia artificial aplicada a la salud pública y privada.

- **Aplicación:** DOHI — Asistente Virtual de Salud Digital Inteligente
- **Versión:** 1.0.0
- **Año:** 2026

*Desarrollado con dedicación para llevar salud accesible, humana y tecnológica a todas las familias.*

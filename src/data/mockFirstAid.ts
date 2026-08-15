import { FirstAidTopic } from '../types/FirstAid';

export const mockFirstAidTopics: FirstAidTopic[] = [
  {
    id: 'fa-1',
    title: 'Quemaduras Leves y Moderadas',
    category: 'Lesiones',
    iconName: 'flame',
    shortDesc: 'Procedimiento inmediato para enfriar la zona y prevenir infecciones.',
    severity: 'Moderado',
    emergencyContact: '118 (Emergencias Nacionales) / 128 (Cruz Roja)',
    steps: [
      {
        stepNumber: 1,
        title: 'Enfriar con agua corriente fresca',
        description: 'Coloca la zona quemada bajo agua corriente fresca (no helada ni con hielo) durante 10 a 15 minutos.',
        importantNote: 'Nunca uses hielo directo ni mantequilla o cremas caseras.',
      },
      {
        stepNumber: 2,
        title: 'Retirar prendas u objetos ajustados',
        description: 'Retira con suavidad anillos, pulseras o ropa antes de que la zona comience a inflamarse.',
      },
      {
        stepNumber: 3,
        title: 'Cubrir con gasa limpia o paño estéril',
        description: 'Cubre sin apretar la herida para protegerla de bacterias y polvo ambiental.',
      },
    ],
    dos: [
      'Lavar suavemente con agua fresca limpia',
      'Mantener hidratada la persona',
      'Acudir al centro de salud si se forman ampollas extensas',
    ],
    donts: [
      'No reventar las ampollas',
      'No aplicar pasta dental, aceites ni café',
      'No retirar ropa pegada a la piel quemada',
    ],
  },
  {
    id: 'fa-2',
    title: 'Cortes y Hemorragias',
    category: 'Lesiones',
    iconName: 'droplet',
    shortDesc: 'Control de sangrado mediante presión directa y elevación.',
    severity: 'Moderado',
    emergencyContact: '118 (Emergencias) / +505 2311-6380 (Hospital León)',
    steps: [
      {
        stepNumber: 1,
        title: 'Presión directa firme',
        description: 'Aplica presión continua sobre la herida con una gasa estéril o un paño limpio durante al menos 5 minutos.',
      },
      {
        stepNumber: 2,
        title: 'Elevar la extremidad afectada',
        description: 'Si la herida es en un brazo o pierna, elévala por encima del nivel del corazón si no hay fractura.',
      },
      {
        stepNumber: 3,
        title: 'Vendar adecuadamente',
        description: 'Si el sangrado se detiene, fija el apósito con una venda elástica sin cortar la circulación.',
      },
    ],
    dos: [
      'Lavarse las manos antes y después de atender la herida',
      'Mantener la presión continua sin levantar la gasa a cada instante',
    ],
    donts: [
      'No aplicar torniquetes improvisados a menos de ser personal entrenado',
      'No retirar gasas empapadas: coloca una nueva encima',
    ],
  },
  {
    id: 'fa-3',
    title: 'Fiebre Alta en Adultos y Niños',
    category: 'Condiciones Comunes',
    iconName: 'thermometer',
    shortDesc: 'Manejo de temperatura elevada, hidratación y signos de alarma.',
    severity: 'Leve',
    emergencyContact: 'Centro de Salud León (+505 2311-2040)',
    steps: [
      {
        stepNumber: 1,
        title: 'Monitorear la temperatura con termómetro',
        description: 'Mide la temperatura axilar u oral cada 2 horas para registrar la curva térmica.',
      },
      {
        stepNumber: 2,
        title: 'Hidratación constante',
        description: 'Ofrece agua, sueros de rehidratación oral o caldos a pequeños sorbos frecuentes.',
      },
      {
        stepNumber: 3,
        title: 'Medios físicos',
        description: 'Aplica compresas tibias en la frente, cuello y axilas. Usa ropa holgada y fresca.',
      },
    ],
    dos: [
      'Mantener la habitación ventilada',
      'Consultar al médico antes de suministrar medicamentos',
    ],
    donts: [
      'No usar baños de agua fría o con alcohol',
      'No abrigar en exceso a la persona con fiebre',
    ],
  },
  {
    id: 'fa-4',
    title: 'RCP (Reanimación Cardiopulmonar)',
    category: 'Soporte Vital',
    iconName: 'heart',
    shortDesc: 'Compresiones torácicas inmediatas ante paro cardiorrespiratorio.',
    severity: 'Crítico',
    emergencyContact: '118 / 911 / 128 Cruz Roja (Llamar INMEDIATAMENTE)',
    steps: [
      {
        stepNumber: 1,
        title: 'Verificar respuesta y respiración',
        description: 'Toca los hombros y habla fuerte: "¿Se encuentra bien?". Observa si el pecho se eleva (no más de 10 segundos).',
      },
      {
        stepNumber: 2,
        title: 'Pedir ayuda y llamar a emergencias',
        description: 'Indica a alguien cercano que llame al 118 y solicite una ambulancia con urgencia.',
      },
      {
        stepNumber: 3,
        title: 'Iniciar compresiones torácicas',
        description: 'Coloca el talón de una mano en el centro del pecho y la otra encima entrelazada. Realiza 100-120 compresiones por minuto a 5 cm de profundidad.',
      },
    ],
    dos: [
      'Comprimir fuerte y rápido en el centro del pecho',
      'Permitir que el tórax se expanda completamente entre compresiones',
    ],
    donts: [
      'No detener las compresiones hasta que llegue ayuda médica o la persona reaccione',
    ],
  },
  {
    id: 'fa-5',
    title: 'Atragantamiento (Maniobra de Heimlich)',
    category: 'Emergencias',
    iconName: 'alert-circle',
    shortDesc: 'Desobstrucción de la vía aérea en adultos y niños conscientes.',
    severity: 'Crítico',
    emergencyContact: '118 / 128 Cruz Roja',
    steps: [
      {
        stepNumber: 1,
        title: 'Identificar el signo universal de asfixia',
        description: 'La persona se lleva las manos al cuello, no puede hablar ni toser eficazmente.',
      },
      {
        stepNumber: 2,
        title: 'Posicionarse detrás de la persona',
        description: 'Abraza a la persona por la cintura. Coloca un puño cerrado justo por encima de su ombligo.',
      },
      {
        stepNumber: 3,
        title: 'Compresiones hacia adentro y arriba',
        description: 'Sujeta el puño con la otra mano y presiona con fuerza hacia adentro y hacia arriba en movimiento en "J" hasta expulsar el objeto.',
      },
    ],
    dos: [
      'Animar a toser fuertemente si la persona aún puede emitir sonidos',
      'Llamar a emergencias si la obstrucción es total',
    ],
    donts: [
      'No dar palmadas a ciegas en la espalda si la persona está erguida',
      'No intentar meter los dedos a ciegas en la boca',
    ],
  },
];

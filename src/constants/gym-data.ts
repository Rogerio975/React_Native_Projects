export const gymColors = {
  background: '#F5F7F4',
  card: '#FFFFFF',
  ink: '#14221D',
  muted: '#74817A',
  line: '#E6EBE7',
  green: '#176B4D',
  greenSoft: '#E2F3E9',
  lime: '#C9F36A',
  orange: '#F4A261',
  orangeSoft: '#FFF0E2',
  red: '#C85B51',
  redSoft: '#FCE9E7',
  navy: '#172923',
} as const;

export const workoutExercises = [
  { name: 'Agachamento livre', detail: '4 séries · 10 repetições', group: 'Pernas' },
  { name: 'Leg press 45°', detail: '3 séries · 12 repetições', group: 'Pernas' },
  { name: 'Cadeira extensora', detail: '3 séries · 12 repetições', group: 'Pernas' },
  { name: 'Mesa flexora', detail: '3 séries · 12 repetições', group: 'Posterior' },
];

export const classes = [
  { id: 'funcional-0730', name: 'Funcional', coach: 'Mariana Costa', time: '07:30', spots: 3, color: gymColors.greenSoft },
  { id: 'spinning-0900', name: 'Spinning', coach: 'Rafael Mendes', time: '09:00', spots: 5, color: '#E8EEFF' },
  { id: 'yoga-1800', name: 'Yoga', coach: 'Camila Rocha', time: '18:00', spots: 2, color: '#F3E9FF' },
  { id: 'hiit-1900', name: 'HIIT', coach: 'Lucas Ferreira', time: '19:00', spots: 4, color: gymColors.orangeSoft },
];

export const students = [
  { id: '1', name: 'Ana Clara Souza', membership: 'Plano anual', status: 'Ativo', initials: 'AC' },
  { id: '2', name: 'Bruno Martins', membership: 'Plano mensal', status: 'Pendente', initials: 'BM' },
  { id: '3', name: 'Carolina Oliveira', membership: 'Plano trimestral', status: 'Ativo', initials: 'CO' },
  { id: '4', name: 'Diego Santos', membership: 'Plano anual', status: 'Ativo', initials: 'DS' },
  { id: '5', name: 'Fernanda Lima', membership: 'Plano mensal', status: 'Pendente', initials: 'FL' },
];

export type Student = (typeof students)[number];

export const membershipPlans = [
  { id: 'mensal', name: 'Mensal', price: 'R$ 119,90', period: '/mês', detail: 'Acesso à musculação', accent: false },
  { id: 'trimestral', name: 'Trimestral', price: 'R$ 99,90', period: '/mês', detail: 'Aulas coletivas incluídas', accent: true },
  { id: 'anual', name: 'Anual', price: 'R$ 79,90', period: '/mês', detail: 'Acompanhamento personalizado', accent: false },
];

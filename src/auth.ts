export type PawCareRole =
  | 'BBMP / Municipal Admin'
  | 'NGO Worker'
  | 'Veterinarian'
  | 'Field Volunteer'
  | 'Verified Community Feeder';

export type DemoUser = {
  id: string;
  password: string;
  name: string;
  initials: string;
  role: PawCareRole;
  organisation: string;
};

export const demoUsers: DemoUser[] = [
  { id: 'admin@pawcare.demo', password: 'Admin@123', name: 'Ananya Rao', initials: 'AR', role: 'BBMP / Municipal Admin', organisation: 'BBMP Animal Husbandry' },
  { id: 'ngo@pawcare.demo', password: 'Ngo@123', name: 'Ravi Kumar', initials: 'RK', role: 'NGO Worker', organisation: 'Care Collective' },
  { id: 'vet@pawcare.demo', password: 'Vet@123', name: 'Dr. Asha Menon', initials: 'AM', role: 'Veterinarian', organisation: 'Community Vet Network' },
  { id: 'volunteer@pawcare.demo', password: 'Volunteer@123', name: 'Priya Shah', initials: 'PS', role: 'Field Volunteer', organisation: 'Bengaluru Paws' },
  { id: 'feeder@pawcare.demo', password: 'Feeder@123', name: 'Meera Nair', initials: 'MN', role: 'Verified Community Feeder', organisation: 'Neighbourhood Feeders' },
];

const roleRoutes: Record<PawCareRole, string[]> = {
  'BBMP / Municipal Admin': ['/dashboard', '/map', '/dogs', '/register', '/drives', '/followups', '/reports', '/organisations', '/scan', '/alerts'],
  'NGO Worker': ['/dashboard', '/map', '/dogs', '/register', '/drives', '/followups', '/reports', '/organisations', '/scan', '/alerts'],
  Veterinarian: ['/dashboard', '/map', '/dogs', '/drives', '/followups', '/reports', '/scan', '/alerts'],
  'Field Volunteer': ['/dashboard', '/map', '/dogs', '/register', '/followups', '/scan', '/alerts'],
  'Verified Community Feeder': ['/dashboard', '/map', '/dogs', '/followups', '/scan', '/alerts'],
};

export function canAccessRoute(role: PawCareRole, route: string) {
  const normalized = route === '/coverage' ? '/reports' : route.startsWith('/dogs/') ? '/dogs' : route;
  return roleRoutes[role].includes(normalized);
}

export function visibleRoutes(role: PawCareRole) {
  return roleRoutes[role];
}

export function canManageFollowUps(role: PawCareRole) {
  return role === 'BBMP / Municipal Admin' || role === 'NGO Worker' || role === 'Veterinarian' || role === 'Field Volunteer';
}

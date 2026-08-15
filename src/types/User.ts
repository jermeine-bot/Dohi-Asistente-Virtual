export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bloodType: string;
  birthDate: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  unreadNotifications: number;
}

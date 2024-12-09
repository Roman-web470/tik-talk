export interface ProfileInterface {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  description: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
}

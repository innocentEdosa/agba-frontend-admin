export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone_number: string | null;
  whatsapp_number: string | null;
  account_status: string;
  role: string;
  verified_status: string;
  updated_at: string;
  created_at: string;
};

export type UserContextType = {
  profile?: UserType | null;
  setProfile?: (profile: UserType) => void;
  loadingProfile: boolean;
  profileError: Error | null;
};

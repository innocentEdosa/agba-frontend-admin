import { UserType } from "./user";

export type ReviewType = {
  id: string;
  user_id: string;
  asset_id: string;
  rating: number;
  content: string;
  user: UserType;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
};

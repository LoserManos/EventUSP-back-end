export interface SocialUser {
  id: string;
  name: string;
  username?: string;
  bio?: string;
  picture_profile?: string;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  picture_profile?: string;
}
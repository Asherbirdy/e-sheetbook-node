export interface UserPayload {
  user: {
    name: string
    userId: string;
    role: string;
    districtId: string;
    emailVerified: boolean;
  };
  refreshToken?: string;
}

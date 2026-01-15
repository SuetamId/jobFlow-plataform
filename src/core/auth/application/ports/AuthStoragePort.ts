export interface AuthStoragePort {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}

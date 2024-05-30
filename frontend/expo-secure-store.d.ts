declare module 'expo-secure-store' {
    export function getItemAsync(key: string, options?: { keychainService?: string, keychainAccessible?: number }): Promise<string | null>;
    export function setItemAsync(key: string, value: string, options?: { keychainService?: string, keychainAccessible?: number }): Promise<void>;
    export function deleteItemAsync(key: string, options?: { keychainService?: string }): Promise<void>;
  }
  
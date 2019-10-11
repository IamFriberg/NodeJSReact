import { createContext, useContext } from 'react';

//Create context, as well as a hook for using this context.
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}




// Definimos el tipo para el estado Auth
export interface AuthAttrs {
  email: string;
  password: string;
  role?: string;
}


// Definimos el tipo para el estado Auth
export interface AuthSessionAttrs {
  token: string;
  user: AuthAttrs; 
}

// Definimos el tipo para el estado Auth
export interface AuthStateAttrs {
  auth: AuthSessionAttrs | {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}
import { ServerError } from "../../hooks/useFormErrors";

// Definimos el tipo para el estado de los posts
export interface CompanyAttrs {
  id?: string;
  name: string;
  nit: number;
  phone: string;
  address: string;
}

export interface CompanyAttrsPayload {
  payload: CompanyAttrs[] | CompanyAttrs
}

// Definimos el tipo para el estado de los posts
export interface CompanyStateAttrs {
  data: [] | {} | CompanyAttrs[] | CompanyAttrs;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: undefined |  ServerError;
  id?: string | undefined | null
}

// Definimos el tipo para el estado de los posts
export interface CompanyGlobalStateAttrs {
  list: CompanyStateAttrs;
  create: CompanyStateAttrs;
  update: CompanyStateAttrs;
  delete: CompanyStateAttrs;
  read: CompanyStateAttrs;
}


// Definimos el tipo para el estado de los posts
export interface itemCompanyStateAttrs {
  itemsCompany: itemCompanyAttrs[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  companyId?: '' | undefined | null,
}

// Definimos el tipo para el estado de los posts
export interface itemCompanyAttrs {
  id?: string;
  name: string;
  description: string;
  price: string;
  idCompany?: string;
  [others: string]: any;
}
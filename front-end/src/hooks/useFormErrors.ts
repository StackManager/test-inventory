import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export interface ServerError {
  fields?: { 
      errors: 
        {
          field: string, 
          message: string
        }[];
      }; 
  message: string;
}

export const useFormServerErrors = (serverError: ServerError | undefined, status: string, fields: any) => {

  useEffect(() => {
    if (status == "failed" && serverError)
      handleServerErrors();
  }, [serverError, status]);

  const [serverErrors, setServerErrors] = useState({...fields});

  const setFieldsErrors = () => {

    if ((Array.isArray(serverError?.fields?.errors))) {
      const fields = serverError?.fields?.errors || [];
      /*
        const newFormErrors = {...fields};
        fields.forEach(({ field, message }) => {
          newFormErrors[field].push(message);
        });
        setServerErrors(newFormErrors);
      */
    }else{
      setServerErrors({...fields});
    }

  }

  const handleServerErrors = () => {
    setFieldsErrors();
  };

  return {serverErrors};
};

export default useFormServerErrors;
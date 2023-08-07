import { Field } from 'formik';
import { ServerError } from '../../hooks/useFormErrors';

interface MyProps {
  label: string;
  name: string;
  touched: boolean | undefined;
  errors: any;
  type: string;
  errorServer: ServerError | undefined;
  errorServerTouch: any;
}

export const FormField = ({
  label, 
  name, 
  touched, 
  errors, 
  type, 
  errorServer,
  errorServerTouch
}: MyProps) =>{

  const errorServerAll: string[] = [];

  if ((Array.isArray(errorServer?.fields?.errors))){
      errorServer?.fields?.errors.forEach(function(error) {  
      if (error?.field == name)
          errorServerAll.push(error.message)
       });
  }

  const renderServer = errorServerAll.map((item, i) =>  <div key={i} className="invalid-feedback"> {item} </div>);

  const setChange = (e: any) =>{
    if (errorServerAll.length > 0)
        errorServerTouch(name);
  }

  return (
          <div className="form-group mt-1">
                            
            <label htmlFor="email">{label}</label>
                            
            <Field
                  onKeyPress={setChange}
                  name={name} 
                  className={((touched && errors) || errorServerAll.length > 0) ? 'form-control is-invalid' : 'form-control'} 
                  type={type} />

            { touched && errors ? (<div className="invalid-feedback">{errors}</div>) : null }

            {renderServer}
          </div>
        )
}
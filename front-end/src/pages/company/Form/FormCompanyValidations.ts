import * as Yup from 'yup';
import { digitsOnly, phoneRegExp } from '../../../utils/functions/regex';

export const useCompanyValidationSchema = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, 'Min. 6 characters')
      .max(50, 'Max. 50 characters')
      .required('Required'),

    address: Yup.string()
      .min(5, 'Min. 5 characters')
      .max(100, 'Max. 100 characters')
      .required("Required"),

    nit: Yup
      .string()
      .min(9, 'Min. 9 characters')
      .max(9, 'Max. 9 characters')
      .required("Required")
      .test('Digits only', 'The field should have digits only', digitsOnly),

    phone: Yup.string()
      .required("Required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Min. 10 characters')
      .max(10, 'Max. 10 characters')
      .test('Digits only', 'The field should have digits only', digitsOnly)
  });

  return validationSchema;
};
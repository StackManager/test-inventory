import React, { forwardRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { FormField } from '../../../components/forms/formField';
import { CompanyGlobalStateAttrs } from '../../../reducers/company/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { companyCreate, companyList } from "../../../reducers/company/Services";
import { AppThunkDispatch } from '../../../store/store';
import { setDeleteError, setResetErrors } from '../../../reducers/company/Reducer';
import { useCompanyValidationSchema } from './FormCompanyValidations';


interface MyFormValues {
    name: string;
    address: string;
    nit: string;
    phone: string;
}

export const FormCompany = forwardRef((props: any, ref: any) => {

    const dispatch = useDispatch<AppThunkDispatch>();
    const {nit, name, address, phone} = props;
    
    const initialValues: MyFormValues = { 
        name: name, 
        address: address, 
        nit: nit,
        phone:phone,
    };
    
    const {status, error } = useSelector((state: { company: CompanyGlobalStateAttrs }) => state.company.create);

    const handleSubmit = async (values: any, actions: any) => {
        const {name, address, nit, phone } = values;
        await dispatch(companyCreate({name, address, nit, phone}));
        actions.setSubmitting(false);
    }

    const handleFieldTouch = async (key: string) => {
        await dispatch(setDeleteError(key));
    }
    
    const validationSchema = useCompanyValidationSchema();

    useEffect(() => {
        dispatch(setResetErrors());
    }, []);

    useEffect(() => {
        if (status == 'succeeded')
            dispatch(companyList());
    }, [status]);


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Form >
                    <fieldset disabled={status == 'loading'}>

                        <FormField 
                            label={'Name'}
                            name={'name'}
                            type="text"
                            touched={formik.touched.name}
                            errors={formik.errors.name} 
                            errorServer={error} 
                            errorServerTouch={handleFieldTouch}></FormField>


                        <FormField 
                            label={'Address'}
                            name={'address'}
                            type="text"
                            touched={formik.touched.address}
                            errors={formik.errors.address} 
                            errorServer={error} 
                            errorServerTouch={handleFieldTouch}></FormField>

                        <FormField 
                            label={'NIT'}
                            name={'nit'}
                            type="text"
                            touched={formik.touched.nit}
                            errors={formik.errors.nit} 
                            errorServer={error} 
                            errorServerTouch={handleFieldTouch}></FormField>

                        <FormField 
                            label={'Phone'}
                            name={'phone'}
                            type="phone"
                            touched={formik.touched.phone}
                            errors={formik.errors.phone} 
                            errorServer={error} 
                            errorServerTouch={handleFieldTouch}></FormField>

                        <button type='submit' className="no-visible" ref={ref}>empty</button>

                    </fieldset>        
                </Form>
            )}
        </Formik>
    );
})

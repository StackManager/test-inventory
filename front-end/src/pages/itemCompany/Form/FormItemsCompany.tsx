import React, { forwardRef } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';


interface MyFormValues {
    name: string;
    description: string;
    price: string;
}

export const FormItemsCompany = forwardRef((props: any, ref: any) => {
    const {status, onSubmitHandler, name, description, price} = props;

    const initialValues: MyFormValues = { 
        name: name, 
        description: description, 
        price: price
    };

    const handleSubmit = (values: any, actions: any) => {        
        onSubmitHandler(values);
        actions.setSubmitting(false);
    }
    
    let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
    
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(6, 'Min. 6 characters')
            .max(50, 'Max. 50 characters')
            .required('Email is required'),

        description: Yup.string()
            .min(5, 'Min. 5 characters')
            .max(100, 'Max. 100 characters')
            .required("Required"),

        price: Yup
            .number()
            .positive()
            .test(
            "is-decimal",
            "The amount should be a decimal with maximum two digits after comma",
            (val: any) => {
                if (val != undefined) {
                return patternTwoDigisAfterComma.test(val);
                }
                return true;
            }
            )
            .min(1, "Minimum cost $1")
            .max(10000, "Maximun cost $10000")
            .required("Is required")

    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Form >
                    <fieldset disabled={status == 'loading'}>
                        <div className="form-group mt-1">
                            
                            <label htmlFor="email">
                                Name
                            </label>
                            
                            <Field 
                                name="name" 
                                className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} 
                                type="text" />
                            
                            {formik.touched.name && formik.errors.name ? 
                            (<div className="invalid-feedback">{formik.errors.name}</div> ) : null}
                        </div>


                        <div className="form-group mt-1">
                            
                            <label htmlFor="description">
                                Description
                            </label>
                            
                            <Field 
                                name="description" 
                                className={(formik.touched.description && formik.errors.description) ? 'form-control is-invalid' : 'form-control'} 
                                type="text" />
                            
                            {formik.touched.description && formik.errors.description ? 
                            (<div className="invalid-feedback">{formik.errors.description}</div> ) : null}
                        </div>

                        <div className="form-group mt-1">
                            
                            <label htmlFor="price">
                                Price
                            </label>
                            
                            <Field 
                                name="price" 
                                className={(formik.touched.price && formik.errors.price) ? 'form-control is-invalid' : 'form-control'} 
                                type="text" />
                            
                            {formik.touched.price && formik.errors.price ? 
                            (<div className="invalid-feedback">{formik.errors.price}</div> ) : null}
                        </div>

                        <button type='submit' className="no-visible" ref={ref}>as</button>
                    </fieldset>        
                </Form>
            )}
        </Formik>
    );
})
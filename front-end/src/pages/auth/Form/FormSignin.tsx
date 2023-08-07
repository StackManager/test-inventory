import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../../store/store';
import { signin } from '../../../reducers/auth/authServices';
import { AuthStateAttrs } from '../../../utils/interfaces/auth/authInterfaces';
import { FaSpinner } from 'react-icons/fa';
import { capitalName } from '../../../utils/functions/strings';
import { useNavigate } from 'react-router-dom';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

interface MyFormValues {
    email: string;
    password: string;
}

export const FormSignin = () => {

    const status = useSelector((state: { auth: AuthStateAttrs }) => state.auth.status);
    const error = useSelector((state: { auth: AuthStateAttrs }) => state.auth.error);
    const dispatch = useDispatch<AppThunkDispatch>();
    const navigate = useNavigate();

    useEffect(()=>{
        if (status == "succeeded")
            navigate('/dashboard');
    },[status])

    const initialValues: MyFormValues = { 
        email: '', 
        password: '', 
    };

    return (
        <Formik
            initialValues={initialValues}

            onSubmit={({ email, password }, { setSubmitting }) => {
                dispatch(signin({email, password}));
                setSubmitting(false);

            }}
            
            validationSchema={Yup.object({
                email: Yup.string()
                    .min(3, 'Min. 3 characters')
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup
                    .string()
                    .matches(passwordRules, { message: "Please create a stronger password" })
                    .required("Required"),
            })}
        >
            {(formik) => (
                <Form>
                    <fieldset disabled={status == 'loading'}>
                        <div className="form-group mt-2">
                            
                            <label htmlFor="email">
                                Email Address
                            </label>
                            
                            <Field 
                                name="email" 
                                className={(formik.touched.email && formik.errors.email) ? 'form-control is-invalid' : 'form-control'} 
                                type="email" />
                            
                            {formik.touched.email && formik.errors.email ? 
                            (<div className="invalid-feedback">{formik.errors.email}</div> ) : null}
                        </div>

                        <div className="form-group mt-2">
                            
                            <label htmlFor="password">
                                Password
                            </label>
                            
                            <Field 
                                name="password" 
                                className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'} 
                                type="password" />
                            
                            {formik.touched.password && formik.errors.password ? 
                            (<div className="invalid-feedback">{formik.errors.password}</div> ) : null}
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="signingButton"></label>
                            <div className="col-md-4 center-block">
                                <div className="col">
                                    <button type='submit' id="signingButton" name="singlebutton" className="btn btn-primary center-block">
                                        Login
                                        {status == 'loading' ? <FaSpinner className="animate-spin" /> : ''}
                                    </button>
                                    {status == 'failed' ? (<div className="alert alert-danger my-3" role="alert">{capitalName(error)}</div> ) : null}
                                </div>  
                            </div>
                        </div>

                    </fieldset>        
                </Form>
            )}
        </Formik>
    );
};

export default FormSignin;
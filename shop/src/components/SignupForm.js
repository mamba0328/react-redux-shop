import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { auth } from '../firebase/firebaseApp';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NumberFormik } from './NumberFormic';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/actions/authUser';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const checkout = (values) => {
    //     createUserWithEmailAndPassword(auth, values.email, values.password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             dispatch(authenticate(user));
    //             navigate('/', { replace: true });
    //         })
    //         .catch(err => alert(err))
    // }


    const yupValidate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        tel: Yup.string()
            .matches(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]\d{2}?$/, 'Invalid number format')
            .required('Required'),
        email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required'),
        reppassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                reppassword: '',
                tel: '',
            }}

            // onSubmit={checkout}
            validationSchema={yupValidate}
        >
            <Form className="form form_signup">
                <div className='form__field'>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" className='input' />
                    <ErrorMessage name="firstName" component="div" className="error" />
                </div>
                <div className='form__field'>
                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" className='input' />
                    <ErrorMessage name="lastName" component="div" className="error" />
                </div>
                <div className='form__field'>
                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" className='input' />
                    <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className='form__field'>
                    <label htmlFor="reppassword">Repeat password</label>
                    <Field id="reppassword" name="reppassword" className='input' />
                    <ErrorMessage name="reppassword" component="div" className="error" />
                </div>
                <div className='form__field'>
                    <label htmlFor="email">Email adress</label>
                    <Field id="email" name="email" className='input' />
                    <ErrorMessage name="email" component="div" className="error" />
                </div>
                <NumberFormik id="tel" name="tel" type={'tel'} label={'Contact number'} nameClass='form__field' />
                <div className='form__field form__field_submit'>

                    <button type="submit">Sign Up</button>
                </div>
            </Form>
        </Formik>
    )
}

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/actions/authUser';
import { Link } from 'react-router-dom';

import { auth } from '../firebase/firebaseApp';
import provider from '../firebase/googleAuth';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const SigninForm = () => {
    const dispatch = useDispatch();
    const checkout = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(authenticate(user));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(authenticate(user));
            }).catch((error) => {
                alert(error)
            });
    }

    const yupValidate = Yup.object({
        email: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required'),
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}

            onSubmit={checkout}
            validationSchema={yupValidate}
        >
            <Form className="form form_signin">
                <div className='form__field'>
                    <label htmlFor="email">Email adress</label>
                    <Field id="email" name="email" className='input' />
                    <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className='form__field'>
                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" className='input' />
                    <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className='form__field form__field_submit'>
                    <Link to='/signup' className='form__link'>Don't have an account?</Link>
                    <button type='button' onClick={handleClick} className='google-auth'></button>
                    <button type="submit" className='submit'>Sign In</button>
                </div>

            </Form>
        </Formik>
    )
}

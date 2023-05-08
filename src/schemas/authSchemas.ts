import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required().matches(/@elpoli.edu.co/, 'Only @elpoli.edu.co emails are allowed'),
    password: yup.string().required(),
});

export const signupSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required().matches(/@elpoli.edu.co/, 'Only @elpoli.edu.co emails are allowed'),
    password: yup.string().required(),
    repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
});
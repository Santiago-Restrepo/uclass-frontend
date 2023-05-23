import * as yup from 'yup';

export const editTeacherSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    email: yup.string().email('Debes ingresar un correo válido').required(),
});
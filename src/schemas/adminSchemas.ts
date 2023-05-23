import * as yup from 'yup';

export const editTeacherSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    email: yup.string().email('Debes ingresar un correo válido').required(),
    photo: yup.string().url('Debes ingresar una URL válida')
});

export const createEditSubjectSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    teacher: yup.string().required(),
});
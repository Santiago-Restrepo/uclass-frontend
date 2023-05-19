import * as yup from 'yup';

export const createResourceSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    resourceUrl: yup.string().url('Debes ingresar una url válida para el recurso').required(),
});
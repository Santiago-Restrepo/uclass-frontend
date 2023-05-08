import * as yup from 'yup';

export const createCommentSchema = yup.object().shape({
    content: yup.string().required('El comentario no puede estar vacío'),
});
import * as yup from 'yup';

export const createReviewCommentSchema = yup.object().shape({
    content: yup.string().required('El comentario no puede estar vacío'),
});

export const createResourceCommentSchema = yup.object().shape({
    content: yup.string().required('El comentario no puede estar vacío'),
    rating: yup.number().min(1).max(5).required('Debes puntuar el recurso')
});
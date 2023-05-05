import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
    subject: yup.string().required(),
    content: yup.string().required(),
    rating: yup.object().shape({
        clarity: yup.number().required(),
        demanding: yup.number().required(),
        fairness: yup.number().required()
    })
});
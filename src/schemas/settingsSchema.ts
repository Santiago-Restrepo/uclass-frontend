import * as yup from 'yup';

export const reportIssueSchema = yup.object().shape({
    content: yup.string().required('Debes ingresar el contenido del reporte'),
});
import * as Yup from 'yup';

export const addEventValidator = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!'),
  email: Yup.string()
    .required('Valid email required')
    .email('Valid email required'),
  date: Yup.string()
    .required('Date is required!'),
  time: Yup.string()
    .required('Time is required!'),
});
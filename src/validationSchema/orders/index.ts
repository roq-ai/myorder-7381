import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  customer_name: yup.string().required(),
  product_category: yup.string().required(),
  size: yup.number().integer().required(),
  length: yup.number().integer().required(),
  weight: yup.number().integer().required(),
  purity: yup.number().integer().required(),
  screw_type: yup.string().required(),
  rhodium_details: yup.string().required(),
  delivery_date: yup.date().required(),
  company_id: yup.string().nullable().required(),
});

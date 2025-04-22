import * as Yup from 'yup';

export const validationSchema = Yup.object({
  shippingFee: Yup.number().positive('Shipping fee must be positive').required('Shipping fee is required'),
  autoRecalc: Yup.boolean(),
  items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Required').max(100, 'Max 100 characters'),
        cost: Yup.number().positive('Cost must be > 0').required('Cost is required'),
        qty: Yup.number().integer('Qty must be integer').min(1, 'Qty must be ≥ 1').notRequired(),
      })
    )
    .min(1, 'At least one item is required'),
});

import React, {useEffect, useState} from 'react';
import { FormikProvider, useFormik, FieldArray } from 'formik';
import { allocateShipping, AllocatedItem } from '@/components/blocks/ShippingCalculatorCost/utils';
import { validationSchema } from '@/components/blocks/ShippingCalculatorCost/utils/validationSchema';

const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

const ShippingCalculator: React.FC = () => {
  const [results, setResults] = useState<AllocatedItem[]>([]);

  const formik = useFormik({
    initialValues: { shippingFee: 1, autoRecalc: true, items: [{ name: '', cost: '', qty: 1 }] },
    validationSchema,
    onSubmit: values => setResults(allocateShipping(values.items, +values.shippingFee)),
    onReset: () => setResults([]),
  });

  useEffect(() => {
    if (!formik.values.autoRecalc) return;
    const handler = setTimeout(() => {
      if (formik.isValid) setResults(allocateShipping(formik.values.items, +formik.values.shippingFee));
    }, 1000);
    return () => clearTimeout(handler);
  }, [formik.values, formik.isValid]);

  // Local vars for error/touched arrays to narrow types
  const errorsItems = formik.errors.items;
  const touchedItems = formik.touched.items;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="card bg-base-200 shadow max-w-2xl mx-auto p-6 space-y-6"
      >
        <FieldArray name="items">
          {({ push, remove }) => (
            <div className="space-y-4">
              {formik.values.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    name={`items[${index}].name`}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered flex-1"
                    value={item.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {touchedItems?.[index]?.name &&
                    Array.isArray(errorsItems) &&
                    typeof errorsItems[index] === 'object' &&
                    errorsItems[index]?.name && (
                      <p className="text-error text-sm">{errorsItems[index]?.name}</p>
                    )}

                  <input
                    name={`items[${index}].cost`}
                    type="number"
                    inputMode="decimal"
                    placeholder="Cost"
                    className="input input-bordered w-32 text-right"
                    value={item.cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {touchedItems?.[index]?.cost &&
                    Array.isArray(errorsItems) &&
                    typeof errorsItems[index] === 'object' &&
                    errorsItems[index]?.cost && (
                      <p className="text-error text-sm">{errorsItems[index]?.cost}</p>
                    )}

                  <input
                    name={`items[${index}].qty`}
                    type="number"
                    placeholder="Qty"
                    className="input input-bordered w-20"
                    value={item.qty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {touchedItems?.[index]?.qty &&
                    Array.isArray(errorsItems) &&
                    typeof errorsItems[index] === 'object' &&
                    errorsItems[index] !== null &&
                    errorsItems[index]?.qty && (
                      <p className="text-error text-sm">{errorsItems[index]?.qty}</p>
                    )}

                  <button type="button" onClick={() => remove(index)} className="btn btn-square btn-error btn-sm">
                    🗑
                  </button>

                  {results[index] &&
                    Number.isFinite(results[index].share) && Number.isFinite(results[index].totalWithShipping) && (
                      <span className="ml-auto">
                        {formatter.format(results[index].share)} • {formatter.format(results[index].totalWithShipping)}
                      </span>
                    )}
                </div>
              ))}
              <button type="button" onClick={() => push({ name: '', cost: '', qty: 1 })} className="btn btn-outline">
                + Add item
              </button>
            </div>
          )}
        </FieldArray>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Shipping Fee (PHP)</legend>
          <div className="flex items-center gap-2">
            <input
              name="shippingFee"
              type="number"
              inputMode="decimal"
              className="input input-bordered w-40"
              value={formik.values.shippingFee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.shippingFee && formik.errors.shippingFee && (
            <p className="label text-error text-sm">{formik.errors.shippingFee}</p>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Auto-recalculate</legend>
          <label className="flex items-center max-w-fit">
            <input
              type="checkbox"
              name="autoRecalc"
              className="toggle"
              checked={formik.values.autoRecalc}
              onChange={formik.handleChange}
            />
          </label>
        </fieldset>

        <div className="flex items-center">
          <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>
            Calculate
          </button>
          <button type="reset" className="btn btn-outline ml-2">
            Clear
          </button>
        </div>

        {results.length > 0 && (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-right">Cost (PHP)</th>
                <th className="text-right">Share (PHP)</th>
                <th className="text-right">Total (PHP)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => (
                <tr key={idx}>
                  <td>{res.name}</td>
                  <td className="text-right">{Number.isFinite(res.cost * res.qty) ? formatter.format(res.cost * res.qty) : ''}</td>
                  <td className="text-right">{Number.isFinite(res.share) ? formatter.format(res.share) : ''}</td>
                  <td className="text-right">{Number.isFinite(res.totalWithShipping) ? formatter.format(res.totalWithShipping) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </form>
    </FormikProvider>
  );
};

export default ShippingCalculator;
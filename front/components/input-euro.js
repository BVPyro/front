import { useFormContext } from 'react-hook-form'

export default function InputEuro(props) {
  const { register, formState } = useFormContext()
  const { isDirty, isValid, errors } = formState
  const error = eval(`errors.${props.name}`)
  const title_from_name = props.name.split('_')[0]
  return (
    <div>
      <label
        htmlFor="price"
        className="block font-source font-bold text-gray-300"
      >
        {props.title ? props.title : title_from_name}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          step="any"
          name={props.name}
          id={props.name}
          className={
            error && isDirty && !isValid
              ? 'formfield-invalid show-spinners'
              : isValid
              ? 'formfield-valid show-spinners'
              : 'formfield show-spinners'
          }
          placeholder={props.placeholder ? props.placeholder : 'min. 150'}
          aria-describedby="price-currency"
          {...register(props.name, props.validation)}
        />
        <div className="font-source absolute inset-y-0 pl-1 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-900" id="price-currency">
            €
          </span>
        </div>
      </div>
      {error && (
        <div className="pt-1 text-red-500 font-source">{error.message}</div>
      )}
    </div>
  )
}

import { useField } from 'formik';
import { PatternFormat } from 'react-number-format';

const NumberFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { name, nameClass } = props;
    return (
        <div className={nameClass} >
            <label htmlFor={name}>{label}</label>
            <PatternFormat {...field} {...props} className="input" format='(###)-###-##-##' allowEmptyFormatting mask="#" />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default NumberFormik
import { useField } from 'formik';
import { PatternFormat } from 'react-number-format';

export const NumberFormik = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
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

import PropTypes from 'prop-types';

const Button = (props) => {
    const { backgroundColor, onClick, text } = props;

    return (
        <button onClick={onClick} style={{ backgroundColor: backgroundColor }} className='button'>
            {text}
        </button>
    );
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    text: PropTypes.string,
}

Button.defaultProps = {
    backgroundColor: '#262626',
    text: 'Click',
    onClick: () => null,
}

export default Button;
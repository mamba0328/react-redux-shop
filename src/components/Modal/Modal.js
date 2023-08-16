import PropTypes from 'prop-types';

const Modal = (props) => {
    const { header, closeButton, text, actions, onClick, backgroundColor } = props;

    return (
        <div className='modal'>
            <div className='modal__bg' onClick={onClick} />
            <div className={'modal__window ' + backgroundColor} >
                <header className='modal__header'>
                    <h3>{header}</h3>
                    {closeButton ? <div className='xButton white' onClick={onClick} data-testid='closeBtn' /> : false}
                </header>
                <p className='modal__content'>{text}</p>
                {actions}
            </div>
        </div >
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    closeButton: PropTypes.bool,
    text: PropTypes.string,
    actions: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
}

Modal.defaultProps = {
    header: 'Modal',
    closeButton: true,
    text: 'Modal text',
    backgroundColor: "#262626",
    actions: [<p>No actions</p>]
}

export default Modal;
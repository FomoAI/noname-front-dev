import styles from '../../styles/confirm-modal.module.scss'
import Modal from '../../../assets/components/modal/Modal';
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn';
import Input from '../../UI/Input';


const ConfirmModal = ({confirm,state,modalHandler,inputsHandler,value}) => {
    return (
        <Modal isVisible={state} handler={modalHandler}>
        <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.confirm}>
                <span>Confirm password:</span>
                <Input 
                autocomplete={false}
                type={'password'}
                placeholder={'*********'}
                label={'Your password'}
                handler={inputsHandler}
                value={value}
                name={'confirm'}
                />
            </div>
            <div className={styles.btn}>
                <SquareBtn 
                handler={confirm}
                width='325'
                text={'Confirm'}/>
            </div>
        </form>
    </Modal>
    );
}

export default ConfirmModal;

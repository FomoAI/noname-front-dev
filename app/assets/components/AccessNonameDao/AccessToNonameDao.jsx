import styles from './noname-dao.module.scss'
import Modal from '../modal/Modal'
import {useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../store/slices/modalsSlice'
import FifthStep from '../SuccessWalletConnect/steps/FifthStep'

export default function AccessToNonameDao() {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.modals.nonameDao.state)

  const modalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      dispatch(toggleModal('nonameDao'))
    }
  }


  return (
    <Modal handler={modalHandler} isVisible={isVisible} title='Access to No name DAO' width='440'>
        <FifthStep/>
    </Modal>
  )
}

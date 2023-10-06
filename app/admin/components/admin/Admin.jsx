import styles from '../../styles/admin.module.scss'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

export default function Admin({selectAction,admin}) {

  return (
    <div className={styles.body}>
      <div className={styles.username}>
            <span className={styles.key}>Username:</span>
            <span className={styles.value}>{admin.username}</span>
      </div>
      <div className={styles.btns}>
        <SquareBtn 
        handler={(event) => selectAction(event,admin.username)} 
        btnId={'remove'} 
        text={<AiOutlineDelete id='remove'/>}/>
      </div>
    </div>
  )
}

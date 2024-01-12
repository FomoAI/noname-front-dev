import loader from '../../../utils/loader'
import styles from './borrow-item.module.scss'

const getCurrentStatus = (status) => {
    const data = {
        'borrow':'Borrow',
        'active':'Active',
        'closed':'Closed',
    }

    return data[status]
}

const BorrowItem = ({item,isAuth,openBorrowModal}) => {
  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.headColumn}>
                <img src={loader(item.img)} alt={item.title}/>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {item.title}
                        {
                            item.changeValue 
                            ?
                            <div className={
                                item.isGrow 
                                ?
                                styles.changeValue + " " + styles.green 
                                :
                                styles.changeValue + " " + styles.red
                            }>
                                {item.changeValue}
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.address}>
                        {item.smart}
                    </div>
                </div>
            </div>
            <div className={styles.headDetails}>
                <div className={styles.status}>
                    {item.status}
                </div>
                <div className={styles.type}>
                    {item.type}
                </div>
            </div>
        </div>
        <div className={styles.infoItems}>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                        Floor price:
                    </div>
                    <div className={styles.value}>
                        {item.floorPrice}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Valuation:
                    </div>
                    <div className={styles.value}>
                        {item.valuation}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Total borrowed:
                    </div>
                    <div className={styles.value}>
                        {item.totalBorrowed}
                    </div>
                </div>
            </div>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Utilization:
                    </div>
                    <div className={styles.value}>
                        {item.utilization}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Borrow APY:
                    </div>
                    <div className={styles.value}>
                        {item.APY}
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.key}>
                    Loans issued::
                    </div>
                    <div className={styles.value}>
                        {item.loansIssued}
                    </div>
                </div>
            </div>
        </div>
        <button
        onClick={openBorrowModal}
        className={
            item.activeStatus === 'closed'
            ?
            styles.btn + ' ' + styles.closed 
            :
            styles.btn
        }
        >
            {
                isAuth
                ?
                getCurrentStatus(item.activeStatus)
                :
                'Connect wallet'
            }
        </button>
    </div>
  )
}

export default BorrowItem

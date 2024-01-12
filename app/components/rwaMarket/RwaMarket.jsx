import RwaBody from '../rwaBody/RwaBody';
import ClosedPageLabel from '../../assets/components/closedPageLabel/ClosedPageLabel';
import styles from '../styles/rwa.module.scss'

const RwaMarket = ({isOpen}) => {
  return (
    isOpen
    ?
    <div className={styles.body + " " + styles.container}>
      <div className={styles.head}>
        <h1 className={styles.headTitle}>
          Assets and liabilities
        </h1>
        <div className={styles.headDescription}>
          RWA marketplace is an important part of Noname. Here you will be able to buy a part of a real-world asset which has a high value. We ensure that every asset represented on our platform will be checked and evaluated by our financial and legal advisors so as to mitigate risks of fraud and of losses. Here you will find different types of assets such as real estate, rights of claim, vehicles etc.  Diversification of investments is a must-have point in any investing strategy.
        </div>
      </div>
      <RwaBody/>
    </div>
    :
    <ClosedPageLabel
    text={'Assets and liabilities'}
    label={'Soon'}
    />
  )
}

export default RwaMarket;

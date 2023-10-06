import Lottie from 'lottie-react'
import animLottie from '../../lotties-animations/NN Методология.json'
import styles from './features.module.scss'

const dataInitial = [
    {
      title:`Засвоєння навички`,
      description:`Результат навчання — засвоєння і тренування навички на реальному ринку вже під час проходження програми`,
    },
    {
      title:`Результат`,
      description:`Мета будь-якої програми — підтверджений результат у фінансах і кейсах кожного випускника або повернення вартості навчання`,
    },
    {
      title:`Методологія`,
      description:`Унікальна методологія навчання зі сходинками зросту, розділом hard і soft навичок і щоденним заміром ваших результатів`,
    },
    {
      title:`Окупність`,
      description:`Практичний формат, у якому ви окупите вартість навчання вже під час проходження або 30 днів після`,
    },
    {
      title:`Засвоєння навички 2`,
      description:`Результат навчання — засвоєння і тренування навички на реальному ринку вже під час проходження програми`,
    },
    {
      title:`Результат 2`,
      description:`Мета будь-якої програми — підтверджений результат у фінансах і кейсах кожного випускника або повернення вартості навчання`,
    },
    {
      title:`Методологія 2`,
      description:`Унікальна методологія навчання зі сходинками зросту, розділом hard і soft навичок і щоденним заміром ваших результатів`,
    },
    {
      title:`Окупність 2`,
      description:`Практичний формат, у якому ви окупите вартість навчання вже під час проходження або 30 днів після`,
    },
]

export default function Features({data}) {
  const firstColumn = data.slice(0,Math.ceil(data.length / 2))

  const secondColumn = data.slice(Math.ceil(data.length / 2),data.length)

  return (
    <div className={styles.body}>
      <div className={styles.animWrapper}>
        <Lottie animationData={animLottie}/>
      </div>
      <div className={styles.column}>
        {
          firstColumn.map((item,index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.title}>
                    {item.title}
                </div>
                <div className={styles.description}>
                    {item.description}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.column}>
        {
          secondColumn.map((item,index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.title}>
                    {item.title}
                </div>
                <div className={styles.description}>
                    {item.description}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

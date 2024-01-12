import {ResponsiveContainer, LineChart,Line,Tooltip,XAxis,YAxis,Legend} from 'recharts'
import changeDateType from '../../../utils/changeDateType'
import styles from './custom-chart.module.scss'

  
export default function CustomChart({data}) {
  console.log(data)
  return (
    <div className={styles.body}>
       <div className={styles.priceInfo}>
        <div className={styles.infoItem}>
          <div className={styles.infoElipse + ' ' + styles.green}>

          </div>
          <div className={styles.infoItemName}>
            - Sales
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoElipse + ' ' + styles.red}>

          </div>
          <div className={styles.infoDetails}>
            10%
          </div>
          <div className={styles.infoItemName}>
            - Activity
          </div>
        </div>
      </div>
              <ResponsiveContainer 
        className={'custom-chart-container-second'}
        width={520} height={325}>
        <LineChart width={580} height={325} data={data}>
            <Line dataKey={'bid'} stroke={'#FF507D'} strokeWidth={2}/>
        </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer 
        className={'custom-chart-container'}
        width={580} height={325}>
        <LineChart width={580} height={325} data={data}>

            <XAxis 
            tickCount={7}
            className='custom-chart-xasis'
            dataKey={'date'}/>
            <YAxis
            tickCount={8}
            className='custom-chart-yasis'
            />
            <Tooltip 
            labelFormatter={(label) => {
                return changeDateType(label,5)
            }}
            formatter={(value) => {
                return `${value}$`
            }}
            wrapperClassName={"custom-chart-tooltip"}
            cursor={'pointer'} 
            separator={''}
            />
            <Line dataKey={''} stroke={'#05C9A1'} strokeWidth={2}/>
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}



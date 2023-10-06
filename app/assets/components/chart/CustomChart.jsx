import {ResponsiveContainer, LineChart,Line,Tooltip,XAxis,YAxis} from 'recharts'
import changeDateType from '../../../utils/changeDateType'
import styles from './custom-chart.module.scss'

const data = [
    {date:'18.04','':20},
    {date:'19.04','':15},
    {date:'20.04','':15},
    {date:'21.04','':30},
    {date:'22.04','':16},
    {date:'23.04','':25},
    {date:'23.04','':25},
    {date:'23.04','':45},
    {date:'23.04','':55},
]
  
export default function CustomChart() {

  return (
    <div className={styles.body}>
        <ResponsiveContainer 
        className={'custom-chart-container'}
        width={580} height={325}>
        <LineChart width={580} height={325} data={data}>
            <Line type={'monotone'} dataKey={''} stroke={'#FF507D'} strokeWidth={2}/>
            <XAxis 
            className='custom-chart-xasis'
            dataKey={'date'}/>
            <YAxis
            tickCount={8}
            className='custom-chart-yasis'
            />
            <Tooltip 
            labelFormatter={(label) => {
                return changeDateType(label,4)
            }}
            formatter={(value) => {
                return `${value} ETH`
            }}
            wrapperClassName={"custom-chart-tooltip"}
            cursor={'pointer'} 
            separator={''}
            />
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}



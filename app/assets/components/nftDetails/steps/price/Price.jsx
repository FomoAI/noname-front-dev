import { useState,useEffect } from 'react'
import { getPriceForWeek } from '../../../../../smart/initialSmartNftMarket'
import getNftStatistic from '../../../../../services/getNftStatistic'
import CustomChart from '../../../chart/CustomChart'
import styles from './price.module.scss'

export default function Price({nft}) {
  const [chartData,setChartData] = useState([])

  useEffect(() => {
    getNftStatistic(nft.smart,nft.nftSmartId).then(({data}) => {
      setChartData(data)
    })
  },[])

  return (
    <div>
      <CustomChart data={chartData}/>
    </div>
  )
}

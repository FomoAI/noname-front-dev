import { useState, useEffect } from 'react'
import getPercent from '../../services/refServices/getPercent'
import updatePercent from '../../services/refServices/updatePercent'
import Input from '../../UI/Input'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import LoaderCustom from '../../../assets/components/loader/Loader'
import styles from '../../styles/ref-data.module.scss'

export default function RefData() {
    const [data,setData] = useState({percent:0})
    const [loading,setLoading] = useState(false)

    const confrimUpdate = async () => {
        setLoading(true)

        const {success} = await updatePercent(data._id,data)

        setLoading(false)
    }

    useEffect(() => {
        getPercent().then(({success,data}) => {
            if(success){
                setData(data[0])
            }
        })
    },[])

    if(loading){
        return <LoaderCustom/>
    }

  return (
    <div className={styles.body}>
        <div className={styles.input}>
            <Input
            type='number'
            name={'percent'}
            value={data.percent}
            handler={(name,value) => setData((prev) => {
                return {...prev,[name]:value}
            })}
            label={'Percent:'}
            />
        </div>
        <div className={styles.btn}>
            <SquareBtn
            handler={confrimUpdate}
            width='200'
            text={'Save'}
            />
        </div>
    </div>
  )
}

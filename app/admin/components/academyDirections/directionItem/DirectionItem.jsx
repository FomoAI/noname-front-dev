import { useEffect, useState, useContext } from 'react'
import { DirectionsContext } from '../AcademyDirections'
import useModal from '../../../../hooks/useModal'
import MoreInfoModal from '../moreInfoModal/MoreInfoModal'
import Input from '../../../UI/Input'
import loader from '../../../../utils/loader'
import FileInput from '../../../UI/FileInput'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import TextAreaCustom from '../../../UI/TextAreaCustom'
import styles from '../../../styles/academy-directions.module.scss'

export default function DirectionItem({item,removeDirection,updateData,index}) {
    const [data,setData] = useState(item)
    const {state,modalHandler} = useModal()

    const directionsData = useContext(DirectionsContext)

    const inputsHandler = (name,value) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    [name]:value
                }
            )
        })
    }

    const fileInputHandler = (e,name,oldImg) => {
        const oldImage = typeof oldImg === 'string' ? oldImg : null

        const file = e.target.files[0]

        setData((prev) => {
            const item = {
                ...prev,
                img:file
            }

            if(oldImage){
                item.oldImg = oldImage
            }

            return item
        })
    }

    useEffect(() => {
        if(directionsData?.items[index]){
            setData(directionsData?.items[index])
        }
    },[directionsData])

    useEffect(() => {
        updateData(data,index)    
    },[data])

  return (
    <>
    <div className={styles.item}>
        <button 
        onClick={() => removeDirection(index)}
        className={styles.removeBtn}>
            Remove
        </button>
        <div className={styles.img}>
            {
                data?.img
                ? 
                <img src={
                    typeof data.img === 'string'
                    ?
                    loader(data.img)
                    :
                    URL.createObjectURL(data.img)
                } alt={data.name}/>
                :
                <></>
            }
            <FileInput
            oldValue={data.img}
            handler={fileInputHandler}
            label={'Image (82x82)'}
            />
        </div>
        <div className={styles.info}>
            <div className={styles.name}>
                <Input
                handler={inputsHandler} 
                name={'name'}
                label={'Name:'}
                value={data.name}
                />
            </div>
            <div className={styles.start}>
                <Input
                handler={inputsHandler}
                name={'start'}
                label={'Start:'}
                value={data.start}
                />
            </div>
            <div className={styles.format}>
                <Input
                handler={inputsHandler}
                name={'format'}
                label={'Format:'}
                value={data.format}
                />
            </div>
            <div className={styles.duration}>
                <Input
                handler={inputsHandler}
                name={'duration'}
                label={'Duration:'}
                value={data.duration    }
                />
            </div>
            <div className={styles.description}>
                <TextAreaCustom
                handler={inputsHandler}
                name={'description'}
                label={'Description:'}
                value={data.description}
                />
            </div>

        </div>
        <div className={styles.btn}>
            <SquareBtn
            handler={modalHandler}
            width='280'
            text={'Edit more'}
            />
        </div>
    </div>
        <MoreInfoModal
        data={data}
        setData={setData}
        visible={state}
        modalHandler={modalHandler}
        />
    </>
  )
}

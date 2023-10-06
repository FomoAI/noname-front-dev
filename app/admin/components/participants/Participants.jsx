import { useState ,useCallback , useEffect} from 'react'
import Input from '../../UI/Input'
import FileInput from '../../UI/FileInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from '../../styles/participants.module.scss'
import icons from '../../../assets/icons/socialmedia/socialmedia'
import Image from 'next/image'

export default function Participants({changedParticipantsHandler,oldFilesHandler,participantsItems,participantName,handler}) {
  const [items,setItems] = useState([])
  
  const inputsHandler = useCallback((name,value = '',target) => {
    setItems(items.map((item,index) => {
      if(index === target){
        return {...item, [name] : value}
      }
      return item
    }))
  },[items])

  const filesHandler = useCallback((event,target,oldFile) => {
    oldFile && oldFilesHandler(oldFile)
    setItems(items.map((item,index) => {
      if(index === target){
        return (
          {...item,img:event.target.files[0]}
        )
      }
      return item
    }))
  },[items])

  const addItem = useCallback(() => {
    setItems([...items,{img:null,name:'',text:'',link:''}])
  },[items])

  const removeItem = useCallback((target) => {
    const filtered = items.filter((item,index) => index !== target)
    setItems(filtered)
    if(!filtered.length){
      changedParticipantsHandler(participantName)
    }
  },[items])

  useEffect(() => {
    handler(participantName,items)
  },[items])

  useEffect(() => {
    if(participantsItems?.length){
      setItems(participantsItems)
      participantsItems = []
    }
  },[participantsItems])

  return (
    <div className={styles.body}>
      <div className={styles.items}>
        {items.map((item,index) => {
          return(
            <div key={index} className={styles.item}>
              <FileInput
              index={index}
              accept={'image/png, image/jpeg'} 
              name={`${participantName}_img`} 
              value={item.img}
              handler={filesHandler} 
              label={'Img (64x64)'}
              oldValue={item?.img}
              />
              <Input 
              label={'Name'}
              value={item.name} 
              placeholder={'Dr. Laurent El Ghaul'} 
              name={'name'}
              index={index}
              handler={inputsHandler}/>
              <Input 
              label={'Subtitle'}
              value={item.subtitle} 
              placeholder={'Business manager'} 
              name={'subtitle'}
              index={index}
              handler={inputsHandler}/>
              <div className={styles.textArea}>
                <span>
                  Text
                </span>
                <textarea
                onChange={(e) => inputsHandler('text',e.target.value,index)}
                value={item.text}
                />
              </div>
              <div className={styles.socialmedia}>
                <div className={styles.socialmediaItem}>
                  <Image src={icons.twitter} alt='twitter'/>
                  <input
                  onChange={(e) => inputsHandler('twitter',e.target.value,index)}
                  placeholder='https://example.com' 
                  value={item.twitter}
                  />
                </div>
                <div className={styles.socialmediaItem}>
                  <Image src={icons.linkedin} alt='linkedin'/>
                  <input
                  onChange={(e) => inputsHandler('linkedin',e.target.value,index)}
                  placeholder='https://example.com' 
                  value={item.linkedin}
                  />
                </div>
                <div className={styles.socialmediaItem}>
                  <Image src={icons.facebook} alt='facebook'/>
                  <input
                  onChange={(e) => inputsHandler('facebook',e.target.value,index)}
                  placeholder='https://example.com' 
                  value={item.facebook}
                  />
                </div>
              </div>
              <button onClick={() => removeItem(index)} className={styles.remove}>Remove</button>
            </div>
          )
        })}
      </div>
      <div className={styles.addBtn}>
        <SquareBtn handler={addItem} text={'+'} width={'300'}/>
      </div>
    </div>
  )
}

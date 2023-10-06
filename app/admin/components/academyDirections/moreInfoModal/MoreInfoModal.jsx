import { useState, useCallback} from 'react'
import Image from 'next/image'
import Modal from '../../../../assets/components/modal/Modal'
import Input from '../../../UI/Input'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import AddBtn from '../../../UI/AddBtn'
import TextAreaCustom from '../../../UI/TextAreaCustom'
import closeSvg from '../../../../assets/icons/close.svg'
import styles from '../../../styles/more-info.module.scss'

export default function MoreInfoModal({visible,modalHandler,data,setData}) {
    const removeBlock = useCallback((blockIndex,blockTitle) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:data.moreBlocks.filter((item,index) => {
                        return blockIndex !== index && item.title !== blockTitle
                    })
                }
            )
        })
    },[data])

    const removeBlockItem = useCallback((blockIndex,blockItemIndex) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:data.moreBlocks.map((block,bIndex) => {
                        if(bIndex === blockIndex){
                            return (
                                {
                                    ...block,
                                    items:block.items.filter((item,itemIndex) => {
                                        return itemIndex !== blockItemIndex
                                    })
                                }
                            )
                        }

                        return block
                    })
                }
            )
        })
    },[data])

    const addBlock = useCallback(() => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:[...prev.moreBlocks,{title:'',items:['']}]
                }
            )
        })
    },[data])

    const addBlockItem = useCallback((blockIndex) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:prev.moreBlocks.map((block,index) => {
                        if(blockIndex === index){
                            return {...block,items:[...block.items,'']}
                        }

                        return block
                    })
                }
            )
        })
    },[data])

    const updateBlockTitle = useCallback((blockIndex,newTitle) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:prev.moreBlocks.map((item,index) => {
                        if(index === blockIndex){
                            return {...item,title:newTitle}
                        }

                        return item
                    })
                }
            )
        })
    },[data])

    const updateBlockItem = useCallback((blockIndex,blockItemIndex,value) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    moreBlocks:prev.moreBlocks.map((block,bIndex) => {
                        if(bIndex === blockIndex){
                            return (
                                {
                                    ...block,
                                    items:block.items.map((item,itemIndex) => {
                                        if(itemIndex === blockItemIndex){
                                            return value
                                        }

                                        return item
                                    })
                                }
                            )
                        }

                        return block
                    })
                }
            )
        })
    },[data])

    const inputsHandler = (name,value) => {
        setData((prev) => {
            return (
                {...prev,[name]:value}
            )
        })
    }

  return (
    <Modal
    bodyClass='direction-modal-admin'
    width='1100'
    isVisible={visible}
    handler={modalHandler}
    title={data.moreTitle}
    >
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.title}>
                    <Input
                    name={'moreTitle'}
                    label={'Title:'}
                    value={data.moreTitle}
                    handler={(name,value) => inputsHandler(name,value)}
                    />
                </div>
                <div className={styles.description}>
                    <TextAreaCustom
                    name={'moreDescription'}
                    label={'Description:'}
                    value={data.moreDescription}
                    handler={(name,value) => inputsHandler(name,value)}
                    />
                </div>
            </div>
            <div className={styles.blocks}>
                {
                    data.moreBlocks.map((item,blockIndex) => {
                        const middle = Math.floor(item.items.length) / 2

                        const firstColumn = item.items.slice(0,middle)

                        const secondColumn = item.items.slice(middle,Math.floor(item.items.length))

                        return (
                            <div key={blockIndex} className={styles.block}>
                                <button 
                                onClick={() => removeBlock(blockIndex,item.title)}
                                className={styles.removeBtn}>
                                    Remove
                                </button>
                                <Input
                                handler={(name,value) => updateBlockTitle(blockIndex,value)}
                                label={'Block title:'}
                                name={'title'}
                                value={item.title}
                                />
                                <div className={styles.blockItems}>
                                    <div className={styles.blockColumn}>
                                        {
                                        firstColumn.map((blockItem,blockItemIndex) => {
                                            return (
                                                <div key={blockItemIndex} className={styles.blockItemWrapper}>
                                                    <button 
                                                    onClick={() => removeBlockItem(blockIndex,blockItemIndex)}
                                                    className={styles.removeBlockItem}
                                                    >
                                                        <Image src={closeSvg} alt="remove"/>
                                                    </button>
                                                    <Input
                                                    handler={(name,value) => updateBlockItem(blockIndex,blockItemIndex,value)}
                                                    label={`${blockItemIndex + 1}.`}
                                                    value={blockItem}
                                                    />
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className={styles.blockColumn}>
                                        {
                                        secondColumn.map((blockItem,blockItemIndex) => {
                                            return (
                                                <div key={blockItemIndex} className={styles.blockItemWrapper}>
                                                    <button 
                                                    onClick={() => removeBlockItem(blockIndex,firstColumn.length + blockItemIndex)}
                                                    className={styles.removeBlockItem}
                                                    >
                                                        <Image src={closeSvg} alt="remove"/>
                                                    </button>
                                                    <Input
                                                    handler={(name,value) => updateBlockItem(blockIndex,firstColumn.length + blockItemIndex,value)}
                                                    label={`${firstColumn.length + blockItemIndex + 1}.`}
                                                    value={blockItem}
                                                    />
                                                </div>
                                            )
                                        })
                                        }
                                        <div className={styles.addItemToBlock}>
                                        <AddBtn
                                        handler={() => addBlockItem(blockIndex)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={styles.addBtn}>
                    <AddBtn
                    handler={addBlock}
                    />
                </div>
            </div>
            <div className={styles.text}>
                <TextAreaCustom
                value={data.moreBottomText}
                label={'Text:'}
                name={'moreBottomText'}
                handler={(name,value) => inputsHandler(name,value)}
                />
            </div>
            <div className={styles.status}>
                <Input
                value={data.moreStatus}
                label={'Status:'}
                name={'moreStatus'}
                handler={(name,value) => inputsHandler(name,value)}
                />
            </div>
            <SquareBtn
            btnId='toggle-modal'
            width='300'
            text={'Save'}
            />
        </div>
    </Modal>
  )
}

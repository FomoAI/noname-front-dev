import { useState, useContext, useEffect,createContext } from "react";
import { LangContext } from "../../pages/Academy";

import Input from "../../UI/Input";
import TextAreaCustom from "../../UI/TextAreaCustom";
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import Loader from '../../../assets/components/loader/Loader'

import InfoBlockEdit from "../../components/infoBlockEdit/InfoBlockEdit";
import FeaturesEdit from "../../components/featuresEdit/FeaturesEdit";
import CreateAccordion from '../../components/createFaq/CreateAccordion'
import updateMain from "../../services/academyServices/main/updateMain";
import getMain from "../../services/academyServices/main/getMain";
import getDataByLang from "../../../utils/getDataByLang";

import styles from '../../styles/academy.module.scss'

export const DataContext = createContext()

const AcademyMain = () => {
    const [data,setData] = useState({
        intro:'',
        soldOut:'',
        aboutUs:null,
        infoBlock:null,
        features:[],
        faq:[],
        discordLink:''
    })
    const lang = useContext(LangContext)

    const dataHandler = (name,value) => {
        setData((prev) => {
            return (
                {...prev,[name]:value}
            )
        })
    }

    const confirmUpdate = async () => {
        try{
            const mainData = {}

            for (const key in data) {
                if(key === 'discordLink'){
                    mainData[key] = data[key]
                }else{
                    mainData[key + lang] = data[key]
                }
            }

            const {success} = await updateMain('6503044f3e0c2bb17c0257fc',mainData)

            window.location.reload()
            
        }catch(error){
            console.log(error)
        }
    } 

    useEffect(() => {
        getMain().then(({success,academy}) => {
            if(success){
                const data = getDataByLang(academy,lang)

                setData({...data,discordLink:academy.discordLink})
            }
        })
    },[lang])

    if(!data.aboutUs){
        return <Loader/>
    }

  return (
    <DataContext.Provider value={data}>
        <div className={styles.body}>
        <div className={styles.mainWrapper}>

            <div className={styles.mainHead}>
                <h2 className={styles.title}>
                    {
                        lang === 'ENG'
                        ?
                        'Main info'
                        :
                        'Основна інформація'
                    }
                </h2>
                <div className={styles.confrimBtn}>
                    <SquareBtn
                    handler={confirmUpdate}
                    width="540"
                    text={
                        lang === 'ENG'
                        ?
                        'Confirm changes'
                        :
                        'Підтвердити зміни'
                    }
                    />
                </div>
            </div>

            <div className={styles.intro + ' ' + styles.block}>
            <div className={styles.itemTitle}>
                Intro text:
            </div>
            
            <TextAreaCustom
            value={data.intro}
            name={'intro'}
            handler={(name,value) => setData((prev) => {
                return (
                    {...prev,[name]:value}
                )
            })}
            />

            <div className={styles.soldOutInput}>
            <Input
            value={data.soldOut}
            name={'soldOut'}
            label={'Directions status:'}
            placeholder={'SOLD OUT/BUY'}
            handler={(name,value) => setData((prev) => {
                return (
                    {...prev,[name]:value}
                )
            })}
            />
            </div>
            </div>

            <div className={styles.aboutUs + ' ' + styles.block}>
            <div className={styles.itemTitle}>
                About us:
            </div>
            <InfoBlockEdit
            name="aboutUs"
            dataHandler={dataHandler}
            dataInitial={data.aboutUs}
            />
            </div>

            <div className={styles.infoBlock + ' ' + styles.block}>
            <div className={styles.itemTitle}>
                Why Noname Academy:
            </div>
            <InfoBlockEdit
            name="infoBlock"
            dataHandler={dataHandler}
            dataInitial={data.infoBlock}
            />
            </div>

            <div className={styles.infoBlock + ' ' + styles.block}>
            <div className={styles.itemTitle}>
                Features:
            </div>
            <FeaturesEdit
            name='features'
            dataHandler={dataHandler}
            dataInitial={data.features}
            />
            </div>

            <div className={styles.infoBlock + ' ' + styles.block}>
            <div className={styles.itemTitle}>
                FAQ:
            </div>
                <CreateAccordion
                name={'faq'}
                handler={dataHandler}
                items={data.faq}
                />
            </div>

            <div className={styles.discordLink}>
                <Input
                label={'Discord:'}
                placeholder="https://discord.com"
                value={data.discordLink}
                name={'discordLink'}
                handler={(name,value) => setData((prev) => {
                    return (
                        {
                            ...prev,
                            discordLink:value
                        }
                    )
                })}
                />
            </div>

        </div>
        </div>
    </DataContext.Provider>
  )
}

export default AcademyMain;

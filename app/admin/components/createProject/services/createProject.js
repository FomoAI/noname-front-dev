import createProject from "../../../services/createProject"
import { getPoolId } from "../../../../smart/initialSmartMain"
import { createPool } from "../../../../smart/initialSmartMain"
import fileFormParse from "../../../../utils/fileFormParse"
import addDateAndTime from "../../../../utils/addDateAndTime"
import parseDate from '../../../../utils/parseDate'

export const create = async (
        setLoading,
        modalHandler,
        data,
        participants,
        socialmedia,
        type,
        logo,
        descriptionFile
    ) => {
      
    const startTime = addDateAndTime(parseDate(data.dates.from),data.timeStart) / 1000
    const greenTime = addDateAndTime(parseDate(data.greenTime),data.greenTimeStart) / 1000
    const yellowTime = addDateAndTime(parseDate(data.yellowTime),data.yellowTimeStart) / 1000
    const greenZone = Number(data.greenZone)
    const yellowZone = Number(data.yellowZone)
    const nftStakeNeed = Number(data.nftStakeNeed)
    const maxInvest = parseFloat(data.goal.replace(/[$,]/g, ''))
    const name = data.title
    const minInvestUser = Number(data.minInvest)
    const maxInvestUser = Number(data.maxInvest)
    const comission = Number(data.comission)
    const mediaComission = Number(data.mediaComission)
    const media = data.media

    if(
      isNaN(startTime) 
      || 
      isNaN(greenTime) 
      || 
      isNaN(yellowTime) 
      ){
      alert('All dates required')
      return
    }

    const {poolId} = await getPoolId()

    console.log(`
        Start time: ${startTime},
        Green time: ${greenTime},
        Yellow time: ${yellowTime},
        Green zone: ${greenZone},
        Yellow zone: ${yellowZone},
        Nft stake need: ${nftStakeNeed},
        Max invest: ${maxInvest},
        Name: ${name},
        Min invest user: ${minInvestUser},
        Max invest user: ${maxInvestUser},
        Comission: ${comission},
        Media comission: ${mediaComission},
        Media: ${media},
    `)

    const {createSuccess,err} = await createPool(
        poolId,
        startTime,
        greenTime,
        yellowTime,
        greenZone,
        yellowZone,
        nftStakeNeed,
        maxInvest,
        name,
        minInvestUser,
        maxInvestUser,
        comission,
        mediaComission,
        media
    )

    if(!createSuccess){
        alert('Create pool error: ' + err)

        return 
    }

    const proejctData = new FormData()

    fileFormParse(participants.investors,'investor',proejctData)
    fileFormParse(participants.team,'team',proejctData)
    fileFormParse(participants.partners,'partner',proejctData)
    proejctData.append('data',JSON.stringify(
    {
      ...data,socialmedia:socialmedia.filter((item) => item.isSelect),
      team:participants.team,
      investors:participants.investors,
      partners:participants.partners,
      poolId,
      poolActive:true
    }))
    proejctData.append('logo',logo)
    proejctData.append('descriptionFile',descriptionFile)
    setLoading(true)
    const {success} = await createProject(proejctData,type)
    setLoading(false)
    if(success){
      modalHandler(null,true)
        
    }else{
      alert('Uploading error')
    }
}
import addDateAndTime from './addDateAndTime'
import parseDate from '../utils/parseDate'
import {getPoolInfo} from '../smart/initialSmartMain'

export default async (steps,project) => {
    let isPurchase = false
    let isClaim = false

    const firstStepEnd = addDateAndTime(parseDate(project.dates.to),project.timeEnd)
    const today = new Date().getTime()

    
    const {response,success} = await getPoolInfo(project.poolId)

    isPurchase = today > firstStepEnd
    isClaim = response?.claimstage

    if(!success){
        return steps.map((step) => {
            if(step.title === 'Purchase'){
                return {...step,isActive:isPurchase}
            }
    
            return step
        })
    }

    return steps.map((step) => {
        if(step.title === 'Purchase'){
            return {...step,isActive:isPurchase}
        }

        if(step.title === 'Distribution'){
            return {...step,isActive:isClaim}
        }
        
        return step
    })
}
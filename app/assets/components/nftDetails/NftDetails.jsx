import { useMemo, useState } from 'react'
import Info from './steps/info/Info'
import Price from './steps/price/Price'
import Bids from './steps/bids/Bids'
import Activity from './steps/activity/Activity'
import styles from './nft-details.module.scss'

const stepsInitialState = [
    {
        name:'Info',
        isActive:true,
    },
    {
        name:'Price',
        isActive:false,
    },
    {
        name:'Bids',
        isActive:false,
    },
    {
        name:'Activity',
        isActive:false,
    },
]

export default function NftDetails({nft}) {
    const [steps,setSteps] = useState(stepsInitialState)

    const setActiveStep = (selectedStep) => {
        setSteps((steps) => {
            return (
                steps.map((step) => {
                    if(step.name === selectedStep.name){
                        return {...step,isActive:true}
                    }
                    return {...step,isActive:false}
                })
            )
        })
    }

    const getCurrentStep = () => {
        const selectedStep = steps.find((step) => step.isActive)

        switch (selectedStep.name) {
            case 'Info':
                return <Info nft={nft}/>
            case 'Price':
                return <Price nft={nft}/>
            case 'Bids':
                return <Bids nft={nft}/>
            case 'Activity':
                return <Activity nft={nft}/>
        }
    }

  return (
    <div className={styles.body}>
        <div className={styles.steps}>
            {
                steps.map((step) => {
                    return (
                        <button 
                        onClick={() => setActiveStep(step)}
                        key={step.name}
                        className={
                            step.isActive ? styles.step + ' ' + styles.active : styles.step
                        }>
                            {step.name}
                        </button>
                    )
                })
            }
        </div>
        {getCurrentStep()}
    </div>
  )
}

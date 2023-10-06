import { useState,useEffect, useCallback } from "react"
import styles from '../../styles/create-company.module.scss'
import Input from "../../UI/Input"
import icons from "../../../assets/icons/socialmedia/socialmedia"
import Image from "next/image"

const inputs = [
    {
        name:'name',
        label:'Legal name',
        placeholder:'SharkRace SharkRace Club'
    },
    {
        name:'employees',
        label:'Employees',
        placeholder:'7'
    },
    {
        name:'founded',
        label:'Founded',
        placeholder:'22.11.2022'
    },
    {
        name:'website',
        label:'Website',
        placeholder:'sharkraceclib.com'
    },
    {
        name:'form',
        label:'Form',
        placeholder:'Corporation'
    },
    {
        name:'location',
        label:'Location',
        placeholder:'...'
    },
]

const socialmedia = [{
    icon:icons.discord,
    alt:'discord',
    link:''
},
{
    icon:icons.telegram,
    alt:'telegram',
    link:''
},
 {
    icon:icons.medium,
    alt:'medium',
    link:''
},
{
    icon:icons.twitter,
    alt:'twitter',
    link:''
},
{
    icon:icons.facebook,
    alt:'facebook',
    link:''
},
{
    icon:icons.tikTok,
    alt:'tikTok',
    link:''
},
{
    icon:icons.instagram,
    alt:'instagram',
    link:''
},
]

export default function CreateCompany({value,name,handler}) {
    const [about,setAbout] = useState(() => (
        {
            name:'',
            employees:'',
            founded:'',
            website:'',
            form:'',
            location:'',
            socialmedia:socialmedia
        }
    ))

    const inputsHandler = useCallback((name,value) => {
        setAbout((state) => {
            return (
                {...state,[name]:value}
            )
        })
    },[about])

    const socialMediaInputs = useCallback((name,value) => {
        setAbout((state) => {
            return (
                {...state,socialmedia:state.socialmedia.map((item) => {
                    if(item.alt === name){
                        return {...item,link:value}
                    }
                    return item
                })}
            )
        })
    },[about])

    useEffect(() => {
        handler(name,about)
    },[about])

    useEffect(() => {
        if(Object.keys(value)?.length){
            setAbout(value)
            value = {}
        }
    },[value])
    
  return (
    <div className={styles.body}>
        <div className={styles.inputs}>
            {inputs.map((input) => {
                return (
                    <Input
                    key={input.name}
                    value={about[input.name]}
                    handler={inputsHandler}
                    label={input.label}
                    name={input.name}
                    placeholder={input.placeholder}
                    />
                )
            })}
        </div>
        <div className={styles.subtitle}>
            <h3>Social media</h3>
        </div>
        <div className={styles.socialmedia}>
            {about.socialmedia.map((item) => {
                return (
                    <div key={item.alt} className={styles.socialmediaItem}>
                        <Image src={icons[item.alt]} alt={item.alt}/>
                        <input
                        onChange={(e) => socialMediaInputs(item.alt,e.target.value)}
                        placeholder='https://example.com' 
                        value={item.link}
                        />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

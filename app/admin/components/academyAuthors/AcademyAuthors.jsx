import { useState, useCallback, useEffect, useContext } from 'react'
import { LangContext } from '../../pages/Academy'
import Image from 'next/image'
import TextAreaCustom from '../../UI/TextAreaCustom'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import AddBtn from '../../UI/AddBtn'
import Input from '../../UI/Input'
import LoaderCustom from '../../../assets/components/loader/Loader'
import FileInput from '../../UI/FileInput'
import socialMedia from '../../../assets/icons/socialmedia'
import loader from '../../../utils/loader'
import updateAuthors from '../../services/academyServices/authors/updateAuthors'
import getAuthors from '../../services/academyServices/authors/getAuthors'
import getDataByLang from '../../../utils/getDataByLang'
import styles from '../../styles/authors.module.scss'

const socialMediaIcons = {
  'twitter':socialMedia.twitter,
  'instagram':socialMedia.instagram,
  'facebook':socialMedia.facebook,
}

const socialMediaInitial =  [
  {
    icon:'twitter',
    name:'Twitter',
    href:''
  },
  {
    icon:'instagram',
    name:'Instagram',
    href:''
  },
  {
    icon:'facebook',
    name:'Facebook',
    href:''
  },
]

const initialData = {
    title:'Автори навчання',
    description:`Learn from others, share your work, and extend your tool set with a diverse group`,
    items:[
      {
        img:'/img3.jpg',
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:'twitter',
            name:'Twitter',
            href:'#'
          },
          {
            icon:'instagram',
            name:'Instagram',
            href:'#'
          },
          {
            icon:'facebook',
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:'/img3.jpg',
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:'twitter',
            name:'Twitter',
            href:'#'
          },
          {
            icon:'instagram',
            name:'Instagram',
            href:'#'
          },
          {
            icon:'facebook',
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:'/img3.jpg',
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:'twitter',
            name:'Twitter',
            href:'#'
          },
          {
            icon:'instagram',
            name:'Instagram',
            href:'#'
          },
          {
            icon:'facebook',
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:'/img3.jpg',
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:'twitter',
            name:'Twitter',
            href:'#'
          },
          {
            icon:'instagram',
            name:'Instagram',
            href:'#'
          },
          {
            icon:'facebook',
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:'/img3.jpg',
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:'twitter',
            name:'Twitter',
            href:'#'
          },
          {
            icon:'instagram',
            name:'Instagram',
            href:'#'
          },
          {
            icon:'facebook',
            name:'Facebook',
            href:'#'
          },
        ]
      },
    ]
}

export default function AcademyAuthors() {
    const [data,setData] = useState(initialData)

    const lang = useContext(LangContext)

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

    const fileInputHandler = (e,authorIndex) => {
      const file = e.target.files[0]
      setData((prev) => {
          return (
              {
                  ...prev,
                  items:prev.items.map((author,aIndex) => {
                    if(aIndex === authorIndex){
                      return (
                        {
                          ...author,
                          img:file
                        }
                      )
                    }

                    return author
                  })
              }
          )
      })
    }

    const addAuthor = () => {
      setData((prev) => {
        return (
          {
            ...prev,
            items:[
              ...prev.items,
              {
                img:'',name:'',description:'',
                profession:'',
                socialMedia:socialMediaInitial
              }]
          }
        )
      })
    }

    const removeAuthor = useCallback((authorIndex) => {
      setData((prev) => {
        return (
          {
            ...prev,
            items:prev.items.filter((author,aIndex) => {
              return aIndex !== authorIndex
            })
          }
        )  
      })
    },[data])

    const authorInputHandler = useCallback((name,value,authorIndex) => {
      setData((prev) => {
        return (
          {
            ...prev,
            items:prev.items.map((author,aIndex) => {
              if(aIndex === authorIndex){
                return {...author,[name]:value}
              }

              return author
            })
          }
        )
      })
    },[data])

    const socialMediaInputHandler = useCallback((name,value,authorIndex,socialItemIndex) => {
      setData((prev) => {
        return (
          {
            ...prev,
            items:prev.items.map((author,aIndex) => {
              if(aIndex === authorIndex){
                return (
                  {
                    ...author,
                    socialMedia:author.socialMedia.map((item, sIndex) => {
                      if(sIndex === socialItemIndex){
                        return {...item,href:value}
                      }

                      return item
                    })
                  }
                )
              }

              return author
            })
          }
        )
      })
    },[data])

    const confirmUpdate = async () => {
      try{
          const formData = new FormData()
          const items = []

          for (const key in data) {
              if(key === 'items'){

                  for (let i = 0; i < data.items.length; i++) {
                      const item = data.items[i]
                      
                      if(item.img && typeof item.img !== 'string'){
                          const imgName = `Img${i}`

                          formData.append(imgName,item.img)

                          items.push({...item,img:imgName})
                      }else{
                          items.push(item)
                      }
                  }
                  
                  formData.append(`items_${lang}`,JSON.stringify(items))
              }else{
                  formData.append(`${key}_${lang}`,data[key])
              }
          }
          
          await updateAuthors('650464254fe67a13b032d3cf',formData,lang)

          window.location.reload()

      }catch(error){
          console.log(error)
      }
    }

    useEffect(() => {
        getAuthors('650464254fe67a13b032d3cf').then(({success,authors}) => {
            const currentLangData = getDataByLang(authors,lang,'_')

            setData(currentLangData)
        })
    },[lang])

    if(!data?.items?.length){
        return <LoaderCustom/>
    }

  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <h2>
              {
                lang === 'ENG'
                ?
                'Authors:'
                :
                'Автори'
              }
              </h2>
            <SquareBtn
            width='250'
            handler={confirmUpdate}
            text={
              lang === 'ENG'
              ?
              'Confirm changes'
              :
              'Підтвердити зміни'
            }
            />
        </div>
        <div className={styles.title}>
            <Input
            value={data.title}
            label={'Title:'}
            name={'title'}
            handler={inputsHandler}
            />
        </div>
        <div className={styles.description}>
            <TextAreaCustom
            value={data.description}
            label={'Description:'}
            name={'description'}
            handler={inputsHandler}
            />
        </div>
        <div className={styles.itemsTitle}>
          Authors:
        </div>
        <div className={styles.items}>
            {
              data.items.map((author,aIndex) => {
                return (
                  <div className={styles.item} key={aIndex}>
                    <div className={styles.imgWrapper}>
                      {
                        author.img
                        ?

                        <img src={
                          typeof author.img === 'string'
                          ?
                          loader(author.img)
                          :
                          URL.createObjectURL(author.img) 
                        } alt={author.name}/>

                        :
                        <></>
                      }
                    </div>
                    <div className={styles.imgInput}>
                        <FileInput
                        handler={(e) => fileInputHandler(e,aIndex)}
                        label={'Image 230x150'}
                        />
                    </div>
                    <div className={styles.itemName}>
                      <Input
                      name={'name'}
                      label={'Name:'}
                      value={author.name}
                      handler={(name,value) => authorInputHandler(name,value,aIndex)}
                      />   
                    </div>
                    <div className={styles.itemProf}>
                      <Input
                      value={author.profession}
                      name={'profession'}
                      label={'Profession:'}
                      handler={(name,value) => authorInputHandler(name,value,aIndex)}
                      />
                    </div>
                    <div className={styles.description}>
                      <Input
                      value={author.description}
                      name={'description'}
                      label={'Description'}
                      handler={(name,value) => authorInputHandler(name,value,aIndex)}
                      />
                    </div>
                    <div className={styles.socialMedia}>
                        {
                          author.socialMedia.map((item,sIndex) => {
                            return (
                              <div key={sIndex} className={styles.socialMediaItem}>
                                <Image src={socialMediaIcons[item.icon]} alt={item.name}/>
                                <Input
                                name={item.icon}
                                label={item.name}
                                value={item.href}
                                handler={(name,value) => socialMediaInputHandler(name,value,aIndex,sIndex)}
                                />
                              </div>
                            )
                          })
                        }
                    </div>
                    <button 
                    onClick={() => removeAuthor(aIndex)}
                    className={styles.removeBtn}>
                        Remove
                    </button>
                  </div>
                )
              })
            }
            <div className={styles.addAuthorBtn}>
              <AddBtn
              handler={addAuthor}
              />
            </div>
        </div>
    </div>
  )
}

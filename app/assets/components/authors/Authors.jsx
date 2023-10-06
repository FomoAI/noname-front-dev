import Image from 'next/image'
import SubTitle from '../subTitle/SubTitle'
import socialMedia from '../../icons/socialmedia'
import styles from './authors.module.scss'
import loader from '../../../utils/loader'

const socialMediaIcons = {
  'twitter':socialMedia.twitter,
  'instagram':socialMedia.instagram,
  'facebook':socialMedia.facebook,
}

export default function Authors({data}) {
  
  return (
    <div className={styles.body}>   
        <div className={styles.head}>
          <SubTitle>
            {data.title}
          </SubTitle>
          <div className={styles.description}>
            {data.description}
          </div>
        </div>
        <div className={styles.authors}>
            {
              data.items.map((author,index) => {
                return (
                    <div className={styles.author} key={index}>
                      <div className={styles.authorImg}>
                        <img src={loader(author.img)} alt={author.name}/>
                      </div>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>
                          {author.name}
                        </div>  
                        <div className={styles.authorProfession}>
                          {author.profession}
                        </div>
                        <div className={styles.authorDescription}>
                          {author.description}
                        </div>
                        <div className={styles.socialMedia}>
                          {
                            author.socialMedia.map((socialItem,index) => {
                              return (
                                <a href={socialItem.href} key={index}>
                                  <Image src={socialMediaIcons[socialItem.icon]} alt={socialItem.name}/>
                                </a>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                )
              })
            }
        </div>
    </div>
  )
}

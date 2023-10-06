import styles from './project-info-block.module.scss'
import Image from 'next/image'
import HTMLReactParser from 'html-react-parser'
import loader from '../../../utils/loader'
import dynamic from 'next/dynamic';

export default function ProjectInfoBlock({tags,img,text}) {
  const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
  const isVideo = img.split('.').pop().includes('mp4')

  return (
    <div className={styles.body}>
      <div className={styles.tags}>
        {tags.map((tag,index) => {
          return (
            <div key={index} className={styles.tag}>
              {tag.value}
            </div>
          )
        })}
      </div>
      {
        isVideo
        ?
        <div className={styles.video}>
          <ReactPlayer 
          controls 
          playing={false} 
          url={`https://noname-backend-production.up.railway.app/api/static${img}`}
          />
        </div>
        :
        <div className={styles.img}>
        {
          img
          ?
          <Image loader={() => loader(img)} width={'580'} height={'342'} src={img} alt={'description-img'}/>
          :
          <></>
        }
        </div>
      }
       
        <div className={styles.text}>
          {HTMLReactParser(text)}
        </div>
    </div>
  )
}

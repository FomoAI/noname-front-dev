import styles from './main-btn.module.scss'

export default function MainBtn({handler,text = 'Buy NFT'}) {
  return (
    <button id='toggle-modal' onClick={handler} className={styles.main}>
      {text}
    </button>
  )
}

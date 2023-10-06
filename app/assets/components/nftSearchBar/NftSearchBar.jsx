import { useState } from 'react'
import TextField from '../../../components/UI/inputs/TextField'
import styles from './nft-search.module.scss'

export default function NftSearchBar({value,handler}) {

  return (
    <div className={styles.body}>
       <TextField value={value} handler={(e) => handler(e.target.value)}/>
    </div>
  )
}

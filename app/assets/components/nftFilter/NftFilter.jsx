import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toggleModalWithoutBlock} from '../../../store/slices/modalsSlice'
import CheckBox from '../../../components/UI/inputs/CheckBox'
import styles from './nft-filter.module.scss'
import MultiRangeSlider from '../multirange/MultiRange'
import CustomSelect from '../customSelect/CustomSelect'

export default function NftFilter({filterData,handler}) {
  const isOpen = useSelector((state) => state.modals.nftFilter.state)
  const [isBuyNow,setIsBuyNow] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className={styles.body}>
        <button 
        onClick={() => dispatch(toggleModalWithoutBlock('nftFilter'))}
        className={styles.btn}>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path d="M2.6664 2.66657C2.57805 2.66532 2.49035 2.68164 2.40837 2.71458C2.32639 2.74753 2.25177 2.79643 2.18886 2.85846C2.12595 2.92049 2.07599 2.99441 2.04189 3.07591C2.00779 3.15742 1.99023 3.24489 1.99023 3.33324C1.99023 3.42159 2.00779 3.50906 2.04189 3.59056C2.07599 3.67207 2.12595 3.74598 2.18886 3.80801C2.25177 3.87004 2.32639 3.91895 2.40837 3.95189C2.49035 3.98483 2.57805 4.00115 2.6664 3.9999H3.20025L7.99973 9.9999H11.9997L16.7992 3.9999H17.3331C17.4214 4.00115 17.5091 3.98483 17.5911 3.95189C17.6731 3.91895 17.7477 3.87004 17.8106 3.80801C17.8735 3.74598 17.9235 3.67207 17.9576 3.59056C17.9917 3.50906 18.0092 3.42159 18.0092 3.33324C18.0092 3.24489 17.9917 3.15742 17.9576 3.07591C17.9235 2.99441 17.8735 2.92049 17.8106 2.85846C17.7477 2.79643 17.6731 2.74753 17.5911 2.71458C17.5091 2.68164 17.4214 2.66532 17.3331 2.66657H2.6664ZM7.99973 11.3332V17.3332L11.9997 15.9999V11.3332H7.99973Z"/>
            </svg>
            <span>Filters</span>
        </button>
        {
          <div 
          id='toggle-modal'
          className={isOpen ? styles.modal + ' ' + styles.visible : styles.modal}>
            <div  id='toggle-modal'className={styles.checkBox}>
              <CheckBox
              handler={() => setIsBuyNow((prev) => !prev)} 
              isChecked={isBuyNow}
              />
              <span id='toggle-modal'>Buy now</span>
            </div>
            <div id='toggle-modal' className={styles.rangeItem}>
                <div id='toggle-modal' className={styles.rangeTitle}>
                  Rarity rank range
                </div>
                <MultiRangeSlider
                    min={0}
                    max={100}
                    onChange={({min,max}) => handler('rarity',{min:min,max:max})}
                    />
            </div>
            <div id='toggle-modal' className={styles.rangeItem}>
                <div id='toggle-modal' className={styles.rangeTitle}>
                Price range
                </div>
                <MultiRangeSlider
                    min={0}
                    max={150}
                    onChange={({min,max}) => handler('price',{min:min,max:max})}
                    />
            </div>
            <div id='toggle-modal' className={styles.rangeItem}>
                <div id='toggle-modal' className={styles.rangeTitle}>
                Share
                </div>
                <MultiRangeSlider
                    min={0}
                    max={100}
                    onChange={({min,max}) => handler('share',{min:min,max:max})}
                    />
            </div>
            <div className={styles.rangeRanking}>
              <div id='toggle-modal' className={styles.rangeTitle}>
                Rarity ranking
              </div>
              <CustomSelect
              items={[
                'Gold',
                'Silver',
                'Metal',
                'Black',
                'Blue',
                'Red',
              ]} 
              placeholder={'Choose trait count'}
              handler={handler}
              />
            </div>
          </div>
        }
    </div>
  )
}

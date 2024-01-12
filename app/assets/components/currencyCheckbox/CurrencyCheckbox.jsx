import styles from './currency.module.scss'


export default function CurrencyCheckbox({items,hanlder}) {
  return (
    <div className={styles.body}>
        <button
        onClick={hanlder}
        className={
            items[0].isSelected
            ?
            styles.item + " " + styles.selectedItem
            :
            styles.item
        }
        >
            {items[0].name}
        </button>
        <div className={styles.checkboxWrapper}>
            <label
            className={
                items[0].isSelected
                ?
                styles.checkboxLabel + ' ' + styles.secondItem
                :
                styles.checkboxLabel + ' ' + styles.firstItem 
            }
            htmlFor='currencyCheckbox'
            ></label>
            <input
            onClick={hanlder}
            id='currencyCheckbox'
            className={
                items[0].isSelected
                ?
                styles.checkbox + ' ' + styles.firstItem 
                :
                styles.checkbox + ' ' + styles.secondItem
            }
            type='checkbox'
            />
        </div>
        <button
        onClick={hanlder}
        className={
            items[1].isSelected
            ?
            styles.item + " " + styles.selectedItem
            :
            styles.item
        }
        >
            {items[1].name}
        </button>
    </div>
  )
}

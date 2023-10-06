import styles from './check-box.module.scss'


export default function CheckBox({isChecked,handler,id = 'none'}) {
    const checkboxClass = isChecked ? styles.fakeCheckBox + ' ' + styles.checked : styles.fakeCheckBox

  return (
    <div id='toggle-modal' className={styles.body}>
        <label 
        className={checkboxClass}
        htmlFor={id}>
        </label>
        <input 
        id={id}
        onClick={() => handler((state) => !state)}
        className={styles.checkBox}
        type="checkbox" />
    </div>
  )
}

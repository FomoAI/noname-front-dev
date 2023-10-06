import styles from './burger.module.scss'

const Burger = () => {
    return (
        <button id='brg-btn' className={styles.burger}>
            <span id='brg-btn'></span>
            <span id='brg-btn'></span>
            <span id='brg-btn'></span>
        </button>
    );
}

export default Burger;

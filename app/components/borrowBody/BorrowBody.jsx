import { useState } from 'react'
import { useSelector } from 'react-redux'
import useModal from '../../hooks/useModal'
import BorrowModal from '../../assets/components/borrowModal/BorrowModal'
import BorrowItem from '../../assets/components/borrowItem/BorrowItem'
import TextField from '../UI/inputs/TextField'
import CustomCheckbox from '../../components/UI/inputs/CheckBox'
import styles from '../styles/borrow-body.module.scss'

const borrowItems = [
    {
        img:'/img1.jpg',
        title:'Newcoin',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Portal',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'De.fi',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        progress:'21%',
        activeStatus:'active',

    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'borrow',
    },
    {
        img:'/img1.jpg',
        title:'Hilton',
        type:'Business',
        status:'Open',
        smart:'0x4657...47h5',
        floorPrice:'0.00 ETH',
        utilization:'0%',
        valuation:'$20,0K',
        APY:'2%',
        totalBorrowed:'$30,0K',
        loansIssued:'1039',
        activeStatus:'closed',
    },
]

const sortItems = [
    {
        name:'Borrow APY',
        value:'borrow',
    },
    {
        name:'Pool size',
        value:'poolSize',
    },
    {
        name:'Floor price',
        value:'floorPrice',
    },
]

const BorrowBody = () => {
    const [all,setAll] = useState(true)
    const [live,setLive] = useState(false)
    const [ended,setEnded] = useState(false)
    
    const [isSort,setIsSort] = useState(false)
    const [sortValue,setSortValue] = useState({name:'Borrow APY',value:'borrow'})
    const isAuth = useSelector((state) => state.auth.userData?.isAuth)
    const {state,modalHandler} = useModal()

    const sortHandler = (value) => {
        setIsSort(false)
        setSortValue(value)
    }

  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.head}>
            <div className={styles.search}>
                <TextField/>
            </div>
            <div className={styles.title}>
            zkSync Market
            </div>
            <div className={styles.headItems}>
                <div className={styles.headItem}>
                    <div className={styles.headItemValue}>
                    $1,4M
                    </div>
                    <div className={styles.headItemKey}>
                    Total borrows
                    </div>
                </div>
                <div className={styles.headItem}>
                    <div className={styles.headItemValue}>
                    $2,4M
                    </div>
                    <div className={styles.headItemKey}>
                    Total available
                    </div>
                </div>
                <div className={styles.headItem}>
                    <div className={styles.headItemValue}>
                    $2,8M
                    </div>
                    <div className={styles.headItemKey}>
                    Total market size
                    </div>
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.filter}>
                    <div className={styles.filterInfo}>
                        <div className={styles.filterTitle}>
                        Asset type
                        </div>
                        <div className={styles.filterDescription}>
                        Available assets suitable to secure the loan
                        </div>
                    </div>
                    <div className={styles.filterBody}>
                        <div className={styles.filterInput}>
                            <CustomCheckbox
                            handler={setAll}
                            isChecked={all}
                            />
                            <span className={
                                all
                                ?
                                styles.filterLabel + " " + styles.selectedLabel 
                                :
                                styles.filterLabel
                            }>
                                All
                            </span>
                        </div>
                        <div className={styles.filterInput}>
                            <CustomCheckbox
                            handler={setLive}
                            isChecked={live}
                            />
                            <span className={
                                live
                                ?
                                styles.filterLabel + " " + styles.selectedLabel 
                                :
                                styles.filterLabel
                            }>
                                Live
                            </span>
                        </div>
                        <div className={styles.filterInput}>
                            <CustomCheckbox
                            handler={setEnded}
                            isChecked={ended}
                            />
                            <span className={
                                ended
                                ?
                                styles.filterLabel + " " + styles.selectedLabel 
                                :
                                styles.filterLabel
                            }>
                                Ended
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.sort}>
                    <button 
                    onClick={() => setIsSort((prev) => !prev)}
                    className={styles.sortBtn}>
                        <span className={styles.sortBy}>Sort by: </span>
                        <span className={styles.sortValue}>{sortValue.name}</span>
                        <div className={
                            isSort
                            ?
                            styles.arrow + ' ' + styles.openSort 
                            :
                            styles.arrow
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                <path d="M3 3L0.401923 0.75L5.59808 0.75L3 3Z" fill="#070B35"/>
                            </svg>
                        </div>
                    </button>
                    <div className={
                        isSort
                        ?
                        styles.sortList + ' ' + styles.sortOpen 
                        :
                        styles.sortList
                    }>
                        {
                            sortItems.map((sortItem) => {
                                return (
                                    <button
                                    onClick={() => sortHandler(sortItem)}
                                    className={styles.sortItemBtn}
                                    key={sortItem.value}
                                    >
                                        {sortItem.name}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.body}>
            {
                borrowItems.map((item,index) => {
                    return (
                        <BorrowItem
                        openBorrowModal={() => modalHandler('',true)}
                        isAuth={isAuth}
                        item={item}
                        key={index}
                        />
                    )
                })
            }
        </div>
    </div>
    <BorrowModal
    isVisible={state}
    modalHandler={modalHandler}
    />
    </>
  )
}

export default BorrowBody

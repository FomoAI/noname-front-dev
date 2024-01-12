import { useMemo, useState } from 'react'
import loader from '../../../utils/loader'
import styles from  './styles.module.scss'

const RwaTable = ({items}) => {
    const [pages,setPages] = useState(() => Math.ceil(items.length / 10))
    const [currentPage,setCurrentPage] = useState(1)

    const currentItems = useMemo(() => {
        if(items.length < 11){
            setPages(0)
            return items
        }
        const endIndex = currentPage * 10
        const startIndex = endIndex - 10
        
        return items.slice(startIndex,endIndex)

    },[items,currentPage])

  return (
    <div className={styles.wrapper}>
        <div className={styles.head}>
            <div className={styles.headItem}>
            #
            </div>
            <div className={styles.headItem}>
            Project
            </div>
            <div className={styles.headItem}>
            Investment Capacity
            </div>
            <div className={styles.headItem}>
            Type
            </div>
            <div className={styles.headItem}>
            Sale end
            </div>
            <div className={styles.headItem}>
            Valuation
            </div>
            <div className={styles.headItem}>
            Floor price
            </div>
            <div className={styles.headItem}>
            Supply
            </div>
            <div className={styles.headItem}>
            Owners
            </div>
            <div className={styles.headItem}>
            Royalty Fee
            </div>
            <div className={styles.headItem}>
            Mint price
            </div>
            <div className={styles.headItem}>
            Revenue
            </div>
        </div>
        <div className={styles.body}>
        {
            currentItems?.length
            ?
            currentItems.map((item,index) => {
                return (
                    <div
                    className={styles.tableItem}
                    key={index}
                    >
                        <div className={styles.itemIndex}>
                            {((currentPage - 1) * 10) + (index + 1)}
                        </div>
                        <div className={styles.project}>
                            <img src={loader(item.img)} alt={item.project}/>
                            <div className={styles.projectName}>
                                {item.project}
                            </div>
                        </div>
                        <div className={styles.capacity}>
                            {item.capacity}
                        </div>
                        <div className={styles.itemValue}>
                            {item.type}
                        </div>
                        <div className={styles.itemValue}>
                            {item.saleEnd}
                        </div>
                        <div className={styles.itemValue}>
                            {item.valuation}
                        </div>
                        <div className={styles.itemValue}>
                            {item.floorPrice}
                        </div>
                        <div className={styles.itemValue}>
                            {item.supply}
                        </div>
                        
                        <div className={styles.itemValue}>
                            {item.owners}
                        </div>
                        
                        <div className={styles.itemValue}>
                            {item.royaltyFee}
                        </div>
                        
                        <div className={styles.itemValue}>
                            {item.mintPrice}
                        </div>
                        
                        <div className={styles.itemValue}>
                            {item.revenue}
                        </div>
                    </div>
                )
            })
            :
            <></>
        }
        </div>
        <div className={styles.pagination}>
            <div className={styles.paginationBtns}>
            {
                new Array(pages).fill(1).map((v,index) => {
                    return (
                        <button
                        className={
                            currentPage === index + 1
                            ?
                            styles.pageBtn + ' ' + styles.currentPage
                            :
                            styles.pageBtn
                        }
                        onClick={() => setCurrentPage(index + 1)}
                        key={index}
                        >
                            {index + 1}
                        </button>
                    )
                })
            }
            </div>
            <div className={styles.paginationInfo}>
                Showing 
                <span>{currentPage === 1 ? currentPage * 10 : `${(currentPage - 1) * 10 + 1}-${currentPage * 10 > items.length ? items.length : currentPage * 10}`}</span>
                <span>out of {items.length}</span>
            </div>
        </div>
    </div>
  )
}

export default RwaTable

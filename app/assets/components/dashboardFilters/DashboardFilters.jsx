import styles from './styles.module.scss'

const DashboardFilters = ({filters,selectedFilter,filterHandler}) => {
  return (
    <div className={styles.body}>
        <div className={styles.items}>
        {
            filters.map((filter,index) => {
                if(!filter.isOpen){
                    return (
                        <div className={styles.btnWrapper}>
                            <button
                            disabled
                            key={index}
                            className={
                                styles.filterBtn + ' ' + styles.disabled 
                            }
                            >
                                {filter.name}
                            </button>
                            <div className={styles.btnLabel}>
                                Soon
                            </div>
                        </div>
                    )
                }
                return (
                    <button
                    key={index}
                    className={
                        selectedFilter === filter.value 
                        ?
                        styles.filterBtn + ' ' + styles.selected 
                        :
                        styles.filterBtn
                    }
                    onClick={() => filterHandler(filter)}
                    >
                        {filter.name}
                    </button>
                )
            })
        }
        </div>
        <hr
        className={styles.line}
        />
    </div>
  )
}

export default DashboardFilters

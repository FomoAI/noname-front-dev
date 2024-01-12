import styles from './total-votes.module.scss'

const TotalVotes = ({totalVotes}) => {

    const getVotesWidth = (vote) => {
        const maxValue = 40 
        
        const width = vote.value / maxValue * 100

        return width
    }

  return (
    <div className={styles.body}>
        <div className={styles.title}>
        Total votes
        </div>
        <div className={styles.head}>
            <div className={styles.headItem}>
                Proposals
            </div>
            <div className={styles.headItem}>
                Total votes
            </div>
        </div>
        <div className={styles.items}>
            {
                totalVotes.map((item,index) => {
                    return (
                        <div className={styles.wrapper}>
                            <div className={styles.item} key={index}>
                                <div className={styles.proposal}>
                                    {item.proposal}
                                </div>
                                <div className={styles.votes}>
                                    <div className={styles.value}>
                                        {item.value} Votes
                                    </div>
                                    <div className={styles.diagram}>
                                        <div 
                                        style={{width:getVotesWidth(item)}}
                                        className={styles.diagramBody}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <hr className={styles.itemLine}/>
                        </div>

                    )
                })
            }
        </div>
    </div>
  )
}

export default TotalVotes

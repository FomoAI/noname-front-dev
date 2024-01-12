import useModal from '../../hooks/useModal'
import VoteModal from '../../assets/components/voteModal/VoteModal'
import VoteItem from '../../assets/components/voteItem/VoteItem'
import styles from '../styles/vote-list.module.scss'

const VotesList = ({votes,title}) => {
    const {state,modalHandler,setModal} = useModal()

  return (
    <>
    <div className={styles.body}>
        <div className={styles.title}>
            {title}
        </div>
        <hr className={styles.headLine}/>
        <div className={styles.items}>
            {
                votes.map((vote,index) => {
                    return (
                        <VoteItem
                        openVoteModal={() => modalHandler('',true)}
                        key={index}
                        item={vote}
                        />
                    )
                })
            }
        </div>
    </div>
    <VoteModal
    isVisible={state}
    modalHandler={modalHandler}
    />
    </>
  )
}

export default VotesList

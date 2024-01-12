import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import {ColorRing} from 'react-loader-spinner'
import loader from '../../../utils/loader'
import styles from './search-list.module.scss'

export default function SearchList(
    {
        type,
        loading,
        label,
        inputLabel,
        items,
        selected,
        searchValue,
        btnHandler,
        inputHandler,
        selectHandler
    }) {

  return (
        selected
        ?
        <div>
        <label 
            className={styles.label}
            htmlFor='collection-name'>
            {label}
            </label>
        {
        type === 'nfts'
        ?
        <div className={styles.selectedCollection}>
            <img
            className={styles.searchItemImg} 
            src={selected.image} 
            alt='nft img'/>
            <div className={styles.searchItemBody}>
                <div className={styles.searchItemTitle}>
                    {selected.name}
                </div>
                <div className={styles.searchItemDesc}>
                    {selected.description}
                </div>
            </div>
            <div className={styles.removeCollection}>
                <SquareBtn 
                handler={btnHandler}
                btnId='none'
                fontSize='14px' 
                height='55' 
                text={'Remove'}/>
            </div>
        </div>
        :
        <div className={styles.selectedCollection}>
            <img
            className={styles.searchItemImg} 
            src={loader(selected.project.img || selected.image)} 
            alt='collection img'/>
            <div className={styles.searchItemBody}>
                <div className={styles.searchItemTitle}>
                    {selected.title || selected.name}
                </div>
                <div className={styles.searchItemDesc}>
                    {selected.project.description || selected.description}
                </div>
            </div>
            <div className={styles.removeCollection}>
                <SquareBtn 
                handler={btnHandler}
                btnId='none'
                fontSize='14px' 
                height='55' 
                text={'Remove'}/>
            </div>
        </div>
        }
        </div>
        :
        <div className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
            <label 
            className={styles.label}
            htmlFor='input-name'>
            {inputLabel}
            </label>
            <input 
            value={searchValue}
            onChange={(e) => inputHandler(e.target.value)}
            className={styles.input}
            placeholder='Name your collection'
            id='input-name'/>
        </div>
        {
            searchValue.length
            ?
                loading
                ?
                <div className={styles.loading}>
                    <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    wrapperClass="blocks-wrapper"
                    colors={['#FF507D', '#FF507D', '#FF507D', '#FF507D', '#FF507D']}
                    />
                </div>
                :
                <div className={styles.searchResult}>
                {
                    type === 'nfts'
                    ?
                    items.map((nft,index) => {
                        return (
                            <div key={index} className={styles.resultWrapper}>
                                <button 
                                onClick={() => selectHandler(nft)}
                                className={styles.searchItem}>
                                    <img
                                    className={styles.searchItemImg} 
                                    src={nft.image} 
                                    alt='nft img'/>
                                    <div className={styles.searchItemBody}>
                                        <div className={styles.searchItemTitle}>
                                            {nft.title || nft.name}
                                        </div>
                                        <div className={styles.searchItemDesc}>
                                            {nft?.project?.description || nft.description}
                                        </div>
                                    </div>
                                </button>
                                <hr className='line'/>
                            </div>
                        )
                    })
                    :
                    items.map((collection) => {
                        return (
                            <div 
                            key={collection._id}
                            className={styles.resultWrapper}>
                                <button 
                                onClick={() => selectHandler(collection)}
                                className={styles.searchItem}>
                                    <img
                                    className={styles.searchItemImg} 
                                    src={loader(collection.project.img || collection.image)} 
                                    alt='collection img'/>
                                    <div className={styles.searchItemBody}>
                                        <div className={styles.searchItemTitle}>
                                            {collection.title || collection.name}
                                        </div>
                                        <div className={styles.searchItemDesc}>
                                            {collection.project.description || collection.description}
                                        </div>
                                    </div>
                                </button>
                                <hr className='line'/>
                            </div>
                        )
                    })
                }
               </div>

            :
            <></>
        }
        </div>
  )
}

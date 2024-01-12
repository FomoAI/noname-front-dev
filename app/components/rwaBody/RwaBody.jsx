import { useState } from 'react'
import RwaTable from '../../assets/components/rwaTable/RwaTable'
import TextField from '../UI/inputs/TextField'
import styles from '../styles/rwa-body.module.scss'

const tableItems = [
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'De.Fi',
        capacity:'Listed',
        type:'Crypto',
        saleEnd:'Nov 2, 2022',
        valuation:'$120,0 K',
        floorPrice:'0.56 ETH',
        supply:'2955',
        owners:'145',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'15%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
    {
        img:'/img1.jpg',
        project:'Newcoin',
        capacity:'Open',
        type:'Business',
        saleEnd:'Mar 8, 2022',
        valuation:'$20,0 K',
        floorPrice:'1.00 ETH',
        supply:'4455',
        owners:'355',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'11%',
    },
    {
        img:'/img1.jpg',
        project:'Portal',
        capacity:'Private pool',
        type:'Crypto',
        saleEnd:'Apr 13, 2022',
        valuation:'$50,0 K',
        floorPrice:'0.40 ETH',
        supply:'4955',
        owners:'305',
        royaltyFee:'2%',
        mintPrice:'0.00 ETH',
        revenue:'6%',
    },
]

const rwaFilters = [
    {
        title:'ALL',
        value:'all',
    },
    {
        title:'Real estate',
        value:'realestate',
    },
    {
        title:'Startups',
        value:'startups',
    },
    {
        title:'Stock',
        value:'stock',
    },
    {
        title:'Art',
        value:'art',
    },
]

const filters = {
    all:'All',
    realestate:'Real estate',
    startups:'Startups',
    stock:'Stock',
    art:'Art'
}

const RwaBody = () => {
    const [isFilter,setIsFilter] = useState(false)
    const [filter,setFilter] = useState('all')

  return (
    <div className={styles.body}>
        <div className={styles.head}> 
            <div className={styles.search}>
                <TextField/>
            </div>
            <div className={styles.filter}>
                <div className={styles.filterHead}>
                    <div className={styles.filterTitle}>
                        NN Real-world-asset market
                    </div>
                    <div className={styles.filterDescription}>
                        A way forward in fractional invest!
                    </div>
                </div>
                <div className={styles.filterWrapper}>
                    <button 
                    onClick={() => setIsFilter((prev) => !prev)}
                    className={styles.mobileFilterBtn}>
                        {filters[filter]}
                    </button>
                    <div className={
                        isFilter
                        ?
                        styles.filterBody + ' ' + styles.visible 
                        :
                        styles.filterBody
                    }>
                        {
                            rwaFilters.map((filterItem,index) => {
                                return (
                                    <button
                                    onClick={() => {
                                        setFilter(filterItem.value)
                                        setIsFilter(false)
                                    }}
                                    key={index}
                                    className={
                                        filterItem.value === filter
                                        ?
                                        styles.item + " " + styles.selected 
                                        :
                                        styles.item
                                    }
                                    >
                                        {filterItem.title}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <RwaTable items={tableItems}/>
    </div>
  )
}

export default RwaBody;

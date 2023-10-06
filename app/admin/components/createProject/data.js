import icons from '../../../assets/icons/socialmedia/socialmedia'

export const selectItems = [
    'Active',
    'Upcoming',
    'Ended'
]
  
export const socialItems = [
    {
        icon:icons.discord,
        isSelect:false,
        alt:'discord',
        link:''
    },
    {
        icon:icons.telegram,
        isSelect:false,
        alt:'telegram',
        link:''
    },
     {
        icon:icons.medium,
        isSelect:false,
        alt:'medium',
        link:''
    },
   {
        icon:icons.twitter,
        isSelect:false,
        alt:'twitter',
        link:''
    },
    {
        icon:icons.facebook,
        isSelect:false,
        alt:'facebook',
        link:''
    },
    {
        icon:icons.tikTok,
        isSelect:false,
        alt:'tikTok',
        link:''
    },
    {
        icon:icons.instagram,
        isSelect:false,
        alt:'instagram',
        link:''
    },
    {
      icon:icons.web,
      isSelect:false,
      alt:'web-site',
      link:''
  },
]
  
export const participantsItemsInitial = [
    {title:'Investors',name:'investors'},
    {title:'Team',name:'team'},
    {title:'Partners',name:'partners'},
]
  
export const inputs = [
    {
      label:'Name:',
      name:'title', 
      placeholder:'SharkRace Cd...',
    },
    {
      label:'Short Description:',
      name:'description', 
      placeholder:'Short Description...',
    },
    {
      label:'Field:',
      name:'field', 
      placeholder:'Field name...',
    },
    {
      label:'Funding Goal:',
      name:'goal', 
      placeholder:'$1,8M',
    },
    {
      label:'Type:',
      name:'type', 
      placeholder:'Seed',
    },
    {
      label:'Banner',
      name:'banner',
      placeholder:'SharkRace Club will hold a...'
    },
    {
      label:'Min.investment:',
      name:'minInvest',
      type:'number',
      placeholder:'$100.00'
    },
    {
      label:'Max.investment:',
      name:'maxInvest',
      type:'number',
      placeholder:'$1000.00'
    },
    {
      label:'All Time High:',
      name:'high',
      placeholder:'3.9'
    },
    {
      label:'Total Raise:',
      name:'totalRaise',
      placeholder:'$300.000'
    },
    {
      label:'Price:',
      name:'price',
      placeholder:'100.0'
    },
    {
      label:'Allocation Pool:',
      name:'allocationPool',
      placeholder:'1000.0'
    },
    {
      label:'Listed:',
      name:'listed',
      placeholder:'400'
    },
    {
      label:'Revenue:',
      name:'revenue',
      placeholder:'15%'
    },
    {
      label:'Market Cap:',
      name:'marketCap',
      placeholder:'$1.38 M'
    },
    {
      label:'Supply:',
      name:'supply',
      placeholder:'10000'
    },
    {
      label:'Owners:',
      name:'owners',
      placeholder:'394'
    },
    {
      label:'Total Volume:',
      name:'totalVolume',
      placeholder:'1000$'
    },
    {
      label:'Royalty Fee:',
      name:'royaltyFee',
      placeholder:'0.5%'
    },
    {
      label:'Participants in the green zone:',
      name:'greenZone',
      type:'number',
      placeholder:'10'
    },
    {
      label:'Participants in the yellow zone:',
      name:'yellowZone',
      type:'number',
      placeholder:'10',
    },
    {
      label:'Nft stake need:',
      name:'nftStakeNeed',
      type:'number',
      placeholder:'1'
    },
    {
      label:'Comission %:',
      name:'comission',
      type:'number',
      placeholder:'0'
    },
    {
      label:'Media comission %:',
      name:'mediaComission',
      type:'number',
      placeholder:'0'
    },
    {
      label:'Staking NFT time start:',
      name:'timeStart', 
      placeholder:'24:00',
    },
    {
      label:'Staking NFT time end:',
      name:'timeEnd', 
      placeholder:'24:00',
    },
    {
      label:'Purchase time start:',
      name:'purchaseTimeStart', 
      placeholder:'24:00',
    },
    {
      label:'Purchase time end:',
      name:'purchaseTimeEnd', 
      placeholder:'24:00',
    },
    {
      label:'Claim time start:',
      name:'claimTimeStart', 
      placeholder:'24:00',
    },
    {
      label:'Green time start:',
      name:'greenTimeStart', 
      placeholder:'24:00',
    },
    {
      label:'Yellow time start:',
      name:'yellowTimeStart', 
      placeholder:'24:00',
    },
]

export const getInitialData = (status,type) => {
    return {
        title:'',
        description:'',
        dates:{
          from: 'ТBA',
          to:'ТBA'
        },
        purchaseDates:{
          from: 'ТBA',
          to:'ТBA'
        },
        distributionStart:'TBA',
        greenTime:'TBA',
        yellowTime:'TBA',
        status:status ? status : 'Active',
        field:'',
        goal:'',
        type:'',
        rating:3,
        isClosed:false,
        path:type,
        funded:'$0.00 (0%)',
        descriptionFull:'',
        lastFunding:'None',
        links:[],
        timeEnd:'24:00',
        timeStart:'24:00',
        purchaseTimeStart:'24:00',
        purchaseTimeEnd:'24:00',
        claimTimeStart:'24:00',
        greenTimeStart:'24:00',
        yellowTimeStart:'24:00',
        banner:'',
        tags:[],
        company:{},
        faq:[],
        risks:[],
        news:[],
        media:[],
        greenZone:0,
        yellowZone:0,
        nftStakeNeed:1,
        comission:0,
        mediaComission:0,
        minInvest:0,
        maxInvest:0,
        totalRaise:0,
    }
}
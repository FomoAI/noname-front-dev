import Info from '../../assets/components/info/Info'
import VotesList from "../votesList/VotesList";
import TextField from "../UI/inputs/TextField";
import TotalVotes from "../../assets/components/totalVotes/TotalVotes";
import ClosedPageLabel from "../../assets/components/closedPageLabel/ClosedPageLabel";
import styles from '../styles/vote.module.scss'

const openVotes = [
  {
      title:'Should we increase the regular monthly NONAME burn',
      posted:`Posted December 16th 2022`,
      status:'Open',
      value:'9',
      description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
      start:'2nd Jan',
      end:'16th Jan',
      burn:'31th Jan',
  },
  {
    title:'Should we increase the regular monthly NONAME burn',
    posted:`Posted December 16th 2022`,
    status:'Open',
    value:'9',
    description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
    start:'2nd Jan',
    end:'16th Jan',
    burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Open',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
]

const upcomingVotes = [
  {
      title:'Should we increase the regular monthly NONAME burn',
      posted:`Posted December 16th 2022`,
      status:'Coming soon',
      value:'0',
      description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
      start:'2nd Jan',
      end:'16th Jan',
      burn:'31th Jan',
  },
  {
    title:'Should we increase the regular monthly NONAME burn',
    posted:`Posted December 16th 2022`,
    status:'Coming soon',
    value:'0',
    description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
    start:'2nd Jan',
    end:'16th Jan',
    burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Coming soon',
  value:'0',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
]

const closedVotes = [
  {
      title:'Should we increase the regular monthly NONAME burn',
      posted:`Posted December 16th 2022`,
      status:'Closed',
      value:'9',
      description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
      start:'2nd Jan',
      end:'16th Jan',
      burn:'31th Jan',
  },
  {
    title:'Should we increase the regular monthly NONAME burn',
    posted:`Posted December 16th 2022`,
    status:'Closed',
    value:'9',
    description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
    start:'2nd Jan',
    end:'16th Jan',
    burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Closed',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Closed',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Closed',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
{
  title:'Should we increase the regular monthly NONAME burn',
  posted:`Posted December 16th 2022`,
  status:'Closed',
  value:'9',
  description:`With this proposal, Noname aims to empower the community to choose what percentage of the total NFT key should be burnt in January 2023 before the NN 3.0 go-live. The below options have been chosen based on different community feedback.`,
  start:'2nd Jan',
  end:'16th Jan',
  burn:'31th Jan',
},
]

const totalVotes = [
  {
    proposal:'Voting topic',
    value:100,
  },
  {
    proposal:'Voting topic',
    value:90,
  },
  {
    proposal:'Voting topic',
    value:45,
  },
  {
    proposal:'Voting topic',
    value:25,
  },
  {
    proposal:'Voting topic',
    value:15,
  },
  {
    proposal:'Voting topic',
    value:32,
  },
  {
    proposal:'Voting topic',
    value:17,
  },
  {
    proposal:'Voting topic',
    value:15,
  },
  {
    proposal:'Voting topic',
    value:15,
  },
]

const VotePage = ({isOpen}) => {
    return (
        isOpen
        ?
        <div className={styles.body}>
          <div className={styles.info}>
            <Info
            title={`VOTE`}
            text={`The voice of the NONAME community`}
            />
          </div>
          <div className={styles.search}>
            <TextField/>
          </div>
          <div className={styles.head}>
            <div className={styles.headInfo}>
              <div className={styles.headTitle}>
                How to vote on Proposals?
              </div>
              <div className={styles.headDescription}>
                Everyone can vote on the proposals. However, number of votes are allocated based on the Noname NFT key. 1 NFT = 1 VOTE.
              </div>
            </div>
            <div className={styles.headStatistics}>
              <div className={styles.headStatisticsItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <path d="M20.1584 19.6168V19.7418C20.299 19.6949 20.4395 19.6793 20.5958 19.6793C21.2361 19.6793 21.8139 20.0697 22.0482 20.6632L22.9696 22.959H27.9675C28.1393 22.959 28.2798 23.0997 28.2798 23.2714C28.2798 23.4432 28.1393 23.5838 27.9675 23.5838H23.2196L23.4695 24.2085H27.5145C27.7957 24.0992 28.108 24.0523 28.436 24.0523C28.9514 24.0523 29.4199 24.1929 29.8416 24.4272V21.6159C29.8416 21.5222 29.7947 21.4441 29.7323 21.3817L26.7024 18.8203C26.64 18.7734 26.5775 18.7422 26.4993 18.7422H21.033C20.5489 18.7422 20.1584 19.1326 20.1584 19.6168ZM26.7805 19.6949L28.7484 21.3661H27.0304C26.8898 21.3661 26.7805 21.2567 26.7805 21.1161V19.6949Z" fill="#596271"/>
  <path d="M26.4992 24.832H23.7192L23.9691 25.4568H26.0151C26.14 25.2225 26.2961 25.0194 26.4992 24.832Z" fill="#596271"/>
  <path d="M29.8416 30.3615V29.2994C29.7636 29.3463 29.6854 29.3775 29.6073 29.4243C29.5293 29.4556 29.4512 29.4868 29.3731 29.5181C29.0763 29.6273 28.764 29.6742 28.4516 29.6742C26.9054 29.6742 25.6404 28.4092 25.6404 26.8629C25.6404 26.5975 25.6872 26.3319 25.7497 26.082H24.2191L24.6565 27.191C24.7501 27.4096 24.7814 27.6595 24.7657 27.9094L24.6877 29.7211C24.6721 30.0647 24.469 30.377 24.1566 30.5176C24.0317 30.58 23.8912 30.6113 23.7505 30.6113C23.5475 30.6113 23.3601 30.5489 23.2039 30.4395L23.0478 30.3146C21.5641 29.2525 21.5641 29.2525 21.5328 29.2213C21.3298 29.0495 21.1892 28.8464 21.0799 28.6122L20.5958 27.394L20.1584 26.3007V30.3458C20.1584 30.8299 20.5489 31.2204 21.033 31.2204H28.967C29.4512 31.236 29.8416 30.8456 29.8416 30.3615Z" fill="#596271"/>
  <path d="M18.3623 18.3826C18.4404 18.3045 18.5028 18.242 18.5809 18.1639C18.7058 18.039 18.7058 17.8516 18.5966 17.7266C18.4716 17.6017 18.2841 17.6017 18.1592 17.711C18.0811 17.7891 18.0031 17.8672 17.9249 17.9453C17.7375 18.1327 17.8781 18.4762 18.1436 18.4762C18.2217 18.4607 18.2998 18.4295 18.3623 18.3826Z" fill="#596271"/>
  <path d="M17.1909 19.8033C17.2534 19.7252 17.3002 19.6315 17.3627 19.5534C17.4564 19.4128 17.4252 19.2254 17.2846 19.1161C17.144 19.0224 16.9566 19.0536 16.8473 19.1942C16.7848 19.2878 16.7223 19.366 16.6599 19.4596C16.5662 19.6003 16.5974 19.8033 16.7536 19.897C16.9097 19.9751 17.0972 19.9438 17.1909 19.8033Z" fill="#596271"/>
  <path d="M19.7055 16.5078C19.6119 16.5703 19.5181 16.6171 19.4244 16.6796C19.2838 16.7733 19.2369 16.9763 19.3463 17.1169C19.4088 17.2106 19.5025 17.2575 19.6119 17.2575C19.768 17.2575 19.9086 17.1169 20.0491 17.0388C20.1897 16.9451 20.2365 16.7577 20.1428 16.6015C20.0491 16.4453 19.8461 16.4141 19.7055 16.5078Z" fill="#596271"/>
  <path d="M15.3949 26.2704C15.2231 26.3016 15.1138 26.4578 15.1449 26.6296C15.1606 26.7389 15.1762 26.8483 15.2074 26.9576C15.2387 27.1294 15.4105 27.2387 15.5823 27.2075C15.7541 27.1762 15.8634 27.0045 15.8322 26.8327C15.8166 26.7389 15.8009 26.6296 15.7697 26.5359C15.7228 26.3641 15.5666 26.2392 15.3949 26.2704Z" fill="#596271"/>
  <path d="M15.7697 28.8317C15.8322 28.988 16.0196 29.066 16.1758 29.0036C16.332 28.9411 16.4101 28.7537 16.3476 28.5975C16.3008 28.5038 16.2696 28.4101 16.2383 28.3164C16.1758 28.1602 16.004 28.0665 15.8322 28.129C15.6761 28.1915 15.5823 28.3632 15.6448 28.535C15.6917 28.6287 15.7229 28.7224 15.7697 28.8317Z" fill="#596271"/>
  <path d="M15.8635 22.8808C15.8947 22.709 15.801 22.5528 15.6292 22.506C15.4574 22.4747 15.3012 22.5684 15.2543 22.7402C15.2231 22.8495 15.2075 22.9588 15.1918 23.0526C15.1606 23.2244 15.27 23.3961 15.4418 23.4274C15.6135 23.4586 15.7697 23.3493 15.801 23.1775C15.8166 23.0838 15.8478 22.9744 15.8635 22.8808Z" fill="#596271"/>
  <path d="M21.2673 16.3511C21.4078 16.3511 21.5484 16.2574 21.6733 16.2106C21.8295 16.1481 21.9233 15.9763 21.8608 15.8045C21.7983 15.6327 21.6265 15.5546 21.4547 15.6171C21.3454 15.6483 21.2516 15.6952 21.158 15.742C21.0017 15.8045 20.9237 15.9919 20.9862 16.1481C21.033 16.2887 21.1424 16.3667 21.2673 16.3511Z" fill="#596271"/>
  <mask id="mask0_279_19"  maskUnits="userSpaceOnUse" x="15" y="24" width="1" height="2">
    <path d="M15.0044 24.3555H15.6444V25.3332H15.0044V24.3555Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_279_19)">
    <path d="M15.3168 25.316C15.4886 25.316 15.6291 25.1754 15.6291 25.0036C15.6291 25.0036 15.6291 24.8006 15.6291 24.6913C15.6291 24.5194 15.5042 24.3789 15.3323 24.3633C15.1606 24.3633 15.02 24.4883 15.0044 24.6601C15.0044 24.7694 15.0044 24.988 15.0044 24.988C15.0044 25.1754 15.1449 25.316 15.3168 25.316Z" fill="#596271"/>
  </g>
  <path d="M16.3007 20.726C16.1444 20.6478 15.957 20.726 15.8946 20.8821C15.8477 20.9759 15.8008 21.0852 15.7696 21.1789C15.7072 21.3351 15.7852 21.5225 15.9414 21.585C16.0976 21.6474 16.285 21.5694 16.3475 21.4131C16.3943 21.3195 16.4256 21.2257 16.4725 21.132C16.5192 20.9759 16.4568 20.7885 16.3007 20.726Z" fill="#596271"/>
  <path d="M30.8725 17.2887C30.9661 17.1482 30.935 16.9608 30.7943 16.8515C30.7007 16.789 30.6225 16.7265 30.5289 16.6641C30.3883 16.5703 30.1852 16.6016 30.0916 16.7577C29.9978 16.8983 30.0291 17.1013 30.1852 17.1951C30.2633 17.2576 30.3571 17.3043 30.4351 17.3668C30.5757 17.4606 30.7787 17.4293 30.8725 17.2887Z" fill="#596271"/>
  <path d="M22.7822 15.5558C22.8134 15.7121 22.9384 15.8058 23.0946 15.8058C23.2195 15.8058 23.3444 15.7589 23.4538 15.7433C23.6256 15.7121 23.7348 15.5558 23.7037 15.3841C23.6724 15.2123 23.5163 15.103 23.3444 15.1342C23.2351 15.1498 23.1258 15.1654 23.0321 15.181C22.8603 15.2279 22.751 15.3841 22.7822 15.5558Z" fill="#596271"/>
  <path d="M32.2624 18.5856C32.3873 18.4607 32.3873 18.2732 32.278 18.1483C32.1999 18.0702 32.1218 17.9921 32.0437 17.914C31.9188 17.7891 31.7314 17.7891 31.6064 17.914C31.4815 18.039 31.4815 18.2264 31.6064 18.3513C31.6845 18.4294 31.7469 18.4919 31.825 18.57C31.9343 18.6949 32.1374 18.6949 32.2624 18.5856Z" fill="#596271"/>
  <path d="M34.605 23.6924C34.7768 23.6611 34.8861 23.505 34.8549 23.3332C34.8393 23.2238 34.8237 23.1145 34.7924 23.0052C34.7612 22.8334 34.5894 22.7241 34.4176 22.7553C34.2458 22.7865 34.1364 22.9583 34.1677 23.1302C34.1833 23.2238 34.1989 23.3332 34.2302 23.4269C34.277 23.5986 34.4332 23.708 34.605 23.6924Z" fill="#596271"/>
  <path d="M34.1678 21.8336C34.324 21.7712 34.4021 21.5994 34.3552 21.4276C34.324 21.3183 34.2771 21.2245 34.2303 21.1309C34.1678 20.9747 33.9804 20.8966 33.8242 20.9591C33.6681 21.0215 33.5899 21.2089 33.6524 21.3652C33.6992 21.4588 33.7305 21.5526 33.7617 21.6462C33.8242 21.818 34.0116 21.8961 34.1678 21.8336Z" fill="#596271"/>
  <mask id="mask1_279_19"  maskUnits="userSpaceOnUse" x="24" y="14" width="2" height="2">
    <path d="M24.6445 14.9941H25.6001V15.623H24.6445V14.9941Z" fill="white"/>
  </mask>
  <g mask="url(#mask1_279_19)">
    <path d="M24.9688 14.9941C24.797 14.9941 24.6565 15.1348 24.6565 15.3066C24.6565 15.4783 24.797 15.6189 24.9688 15.6189H25.2812C25.453 15.6189 25.5936 15.4783 25.5936 15.3222C25.5936 15.1503 25.4686 15.0098 25.2968 14.9941C25.2031 14.9941 24.9688 14.9941 24.9688 14.9941Z" fill="#596271"/>
  </g>
  <path d="M26.5617 15.431C26.5305 15.6028 26.6398 15.759 26.8116 15.7902C26.9365 15.8058 27.0615 15.8683 27.1865 15.8683C27.327 15.8683 27.4519 15.7746 27.4832 15.6184C27.5144 15.4466 27.4207 15.2905 27.2489 15.2436C27.1396 15.2124 27.0303 15.1967 26.9365 15.1811C26.7491 15.1499 26.593 15.2592 26.5617 15.431Z" fill="#596271"/>
  <path d="M28.9671 16.4607C29.092 16.4607 29.2013 16.3982 29.2482 16.2733C29.3263 16.1171 29.2482 15.9297 29.092 15.8672C28.9984 15.8204 28.889 15.7735 28.7953 15.7422C28.6391 15.6798 28.4517 15.7579 28.3893 15.9141C28.3268 16.0703 28.4049 16.2577 28.561 16.3201C28.686 16.367 28.8265 16.4607 28.9671 16.4607Z" fill="#596271"/>
  <path d="M30.2788 33.4703C30.3725 33.4078 30.4662 33.3609 30.5599 33.2985C30.7005 33.2047 30.7474 33.0017 30.638 32.8612C30.5443 32.7205 30.3413 32.6738 30.2007 32.783C30.1226 32.8455 30.0289 32.8924 29.9508 32.9548C29.8102 33.0486 29.7634 33.236 29.8571 33.3922C29.9352 33.5171 30.1382 33.564 30.2788 33.4703Z" fill="#596271"/>
  <path d="M31.3877 32.2673C31.4971 32.3922 31.7001 32.3922 31.8251 32.2829C31.9032 32.2048 31.9812 32.1267 32.0593 32.0486C32.1843 31.9237 32.1843 31.7363 32.0593 31.6113C31.9343 31.4863 31.7469 31.4863 31.622 31.6113C31.5439 31.6894 31.4815 31.7518 31.4034 31.8299C31.2784 31.9392 31.2784 32.1423 31.3877 32.2673Z" fill="#596271"/>
  <path d="M33.3089 30.5495C33.4026 30.4089 33.3714 30.2059 33.2308 30.1122C33.0903 30.0184 32.8872 30.0497 32.7935 30.1902C32.731 30.2684 32.6842 30.3621 32.6217 30.4401C32.528 30.5807 32.5592 30.7681 32.6998 30.8775C32.8404 30.9711 33.0434 30.94 33.1371 30.7993C33.1839 30.7213 33.2464 30.6276 33.3089 30.5495Z" fill="#596271"/>
  <path d="M16.6913 30.5485C16.785 30.689 16.988 30.7359 17.1285 30.6265C17.2692 30.5329 17.3159 30.3298 17.2067 30.1892C17.1442 30.1111 17.0973 30.0174 17.0349 29.9394C16.9411 29.7987 16.7537 29.7519 16.5975 29.8456C16.457 29.9394 16.4101 30.1268 16.5038 30.2829C16.5819 30.3766 16.6288 30.4547 16.6913 30.5485Z" fill="#596271"/>
  <path d="M28.5922 33.6407C28.4984 33.6876 28.4047 33.7188 28.311 33.75C28.1548 33.8125 28.0611 33.9843 28.1236 34.1561C28.1861 34.3122 28.3735 34.3904 28.5297 34.3435C28.6389 34.3122 28.7327 34.2655 28.8264 34.2186C28.9826 34.1561 29.0606 33.9687 28.9982 33.8125C28.9357 33.6563 28.7483 33.5782 28.5922 33.6407Z" fill="#596271"/>
  <path d="M34.7301 27.253C34.7613 27.1437 34.777 27.0344 34.7926 26.9407C34.8238 26.7689 34.7145 26.6127 34.5427 26.5659C34.3709 26.5346 34.2147 26.644 34.1678 26.8158C34.1522 26.9094 34.121 27.0188 34.1053 27.1125C34.0586 27.2843 34.1678 27.4561 34.3396 27.4873C34.527 27.5342 34.6988 27.4249 34.7301 27.253Z" fill="#596271"/>
  <mask id="mask2_279_19"  maskUnits="userSpaceOnUse" x="34" y="24" width="1" height="2">
    <path d="M34.3555 24.6445H34.9955V25.6445H34.3555V24.6445Z" fill="white"/>
  </mask>
  <g mask="url(#mask2_279_19)">
    <path d="M34.6832 24.6445C34.5114 24.6445 34.3708 24.7851 34.3708 24.9569C34.3708 24.9569 34.3708 25.1911 34.3708 25.3004C34.3708 25.4723 34.4958 25.6128 34.6676 25.6285C34.8082 25.6285 34.9331 25.5347 34.98 25.4098C34.98 25.3786 34.9956 25.3629 34.9956 25.3317C34.9956 25.2224 34.9956 24.9725 34.9956 24.9725C34.9956 24.7851 34.8551 24.6445 34.6832 24.6445Z" fill="#596271"/>
  </g>
  <path d="M33.6992 29.2692C33.8554 29.3317 34.0429 29.2692 34.1053 29.113C34.1521 29.0193 34.199 28.91 34.2303 28.8162C34.2927 28.6601 34.2146 28.4727 34.0585 28.4103C33.9022 28.3478 33.7148 28.4258 33.6524 28.582C33.6055 28.6757 33.5743 28.7695 33.5274 28.8631C33.465 29.0193 33.543 29.2067 33.6992 29.2692Z" fill="#596271"/>
  <path d="M26.843 34.1713C26.7493 34.187 26.64 34.2026 26.5462 34.2338C26.3744 34.2651 26.2651 34.4212 26.2963 34.593C26.3276 34.7492 26.4526 34.8586 26.6087 34.8586C26.7336 34.8586 26.8586 34.8273 26.9836 34.7961C27.1553 34.7648 27.2646 34.593 27.2335 34.4212C27.171 34.2495 26.9992 34.1401 26.843 34.1713Z" fill="#596271"/>
  <path d="M33.4805 19.6794C33.418 19.5857 33.3555 19.4919 33.3087 19.3983C33.215 19.2577 33.012 19.2109 32.8714 19.3202C32.7308 19.4139 32.684 19.6169 32.7933 19.7575C32.8558 19.8355 32.9027 19.9293 32.9651 20.0074C33.0588 20.1479 33.2463 20.1948 33.4024 20.1011C33.5273 20.023 33.5586 19.8355 33.4805 19.6794Z" fill="#596271"/>
  <path d="M17.7063 31.8299C17.7845 31.9081 17.8626 31.9861 17.9406 32.0642C18.0655 32.1891 18.2686 32.1891 18.3779 32.0642C18.5029 31.9392 18.5029 31.7518 18.3779 31.6269C18.2998 31.5488 18.2374 31.4864 18.1593 31.4082C18.0344 31.2833 17.847 31.2833 17.722 31.3926C17.597 31.502 17.597 31.705 17.7063 31.8299Z" fill="#596271"/>
  <mask id="mask3_279_19"  maskUnits="userSpaceOnUse" x="24" y="34" width="2" height="1">
    <path d="M24.3555 34.3555H25.3332V34.9844H24.3555V34.3555Z" fill="white"/>
  </mask>
  <g mask="url(#mask3_279_19)">
    <path d="M24.7033 34.3594C24.5314 34.3594 24.3909 34.4843 24.3752 34.6562C24.3752 34.828 24.5002 34.9685 24.672 34.9841C24.7813 34.9841 25 34.9841 25 34.9841C25.1718 34.9841 25.3123 34.8436 25.3123 34.6717C25.3123 34.4999 25.1718 34.3594 25 34.3594C24.9062 34.3594 24.7969 34.3594 24.7033 34.3594Z" fill="#596271"/>
  </g>
  <path d="M19.5492 32.6102C19.4087 32.5165 19.2213 32.5477 19.1119 32.6883C19.0182 32.8289 19.0494 33.0163 19.19 33.1256C19.2837 33.1881 19.3618 33.2506 19.4555 33.313C19.5961 33.4067 19.7991 33.3755 19.8928 33.2193C19.9866 33.0788 19.9553 32.8757 19.7991 32.782C19.721 32.7351 19.6273 32.6727 19.5492 32.6102Z" fill="#596271"/>
  <path d="M22.8759 34.1251C22.7041 34.0938 22.548 34.1876 22.5011 34.3594C22.4698 34.5312 22.5635 34.703 22.7354 34.7342C22.8447 34.7655 22.9539 34.7811 23.0477 34.7967C23.2195 34.828 23.3756 34.7186 23.4069 34.5468C23.4381 34.375 23.3289 34.2188 23.157 34.1876C23.0789 34.1563 22.9852 34.1407 22.8759 34.1251Z" fill="#596271"/>
  <path d="M21.1423 33.5326C20.9861 33.4545 20.7986 33.5326 20.7362 33.6888C20.6581 33.845 20.7362 34.0324 20.8924 34.0948C20.9861 34.1417 21.0954 34.1886 21.1892 34.2198C21.3453 34.2822 21.5327 34.2042 21.5952 34.048C21.6577 33.8918 21.5796 33.7044 21.4234 33.6419C21.3297 33.6107 21.236 33.5794 21.1423 33.5326Z" fill="#596271"/>
  <path d="M19.0494 21.8655L21.6576 28.3939C21.7201 28.5344 21.8138 28.6594 21.9232 28.7687L23.563 29.9401C23.6568 30.0025 23.7817 30.0181 23.8754 29.9713C23.9847 29.9245 24.0472 29.8151 24.0472 29.7058L24.1253 27.8784C24.1409 27.7223 24.1253 27.5817 24.0629 27.4412L21.4702 20.8972C21.2828 20.4131 20.7362 20.1788 20.252 20.3818L19.5805 20.6473C19.1119 20.8347 18.862 21.3969 19.0494 21.8655ZM23.4537 29.0811L22.5167 28.4095L23.5162 27.9253L23.4537 29.0811ZM19.8148 21.2251L20.4863 20.9597C20.6425 20.8972 20.8299 20.9753 20.8924 21.1315L23.36 27.3162L22.1418 27.9097C22.1418 27.9097 19.6429 21.6468 19.6429 21.6312C19.518 21.3345 19.7366 21.2564 19.8148 21.2251Z" fill="#596271"/>
  <path d="M28.436 24.6758C27.2335 24.6758 26.2495 25.6597 26.2495 26.8622C26.2495 28.0648 27.2335 29.0488 28.436 29.0488C29.6386 29.0488 30.6225 28.0648 30.6225 26.8622C30.6225 25.6597 29.6386 24.6758 28.436 24.6758ZM28.436 28.424C27.577 28.424 26.8742 27.7213 26.8742 26.8622C26.8742 26.0033 27.577 25.3004 28.436 25.3004C29.295 25.3004 29.9978 26.0033 29.9978 26.8622C29.9978 27.7213 29.295 28.424 28.436 28.424Z" fill="#596271"/>
  <path d="M28.9826 26.4407L28.2017 26.9092L27.9987 26.6125C27.9049 26.4718 27.7019 26.4407 27.5613 26.5343C27.4208 26.6281 27.3896 26.8311 27.4832 26.9717L27.8424 27.5027C27.9362 27.6432 28.1236 27.6745 28.2641 27.5964L29.3106 26.9717C29.4511 26.8779 29.5136 26.6905 29.4198 26.55C29.3106 26.3938 29.1231 26.3469 28.9826 26.4407Z" fill="#596271"/>
                </svg>
                <span>Proposals:</span>
                <span className={styles.headStatisticsValue}>5</span>
              </div>
              <div className={styles.headStatisticsItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <mask id="mask0_304_210"  maskUnits="userSpaceOnUse" x="15" y="15" width="20" height="20">
                    <path d="M15.0044 15.9336H34.0222V34.978H15.0044V15.9336Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_304_210)">
                    <path d="M32.8509 20.8854L31.371 22.3652C31.7981 23.3091 32.0354 24.3571 32.0354 25.4601C32.0354 29.6155 28.6675 32.9834 24.5121 32.9834C20.3567 32.9834 16.9888 29.6155 16.9888 25.4601C16.9888 21.3047 20.3567 17.9369 24.5121 17.9369C25.5511 17.9369 26.5396 18.1474 27.4395 18.5281L28.9301 17.0375C27.6104 16.3434 26.1069 15.9512 24.5117 15.9512C19.2597 15.9512 15.0022 20.2086 15.0022 25.4605C15.0022 30.7126 19.2597 34.97 24.5117 34.97C29.7637 34.97 34.0211 30.7126 34.0211 25.4605C34.0216 23.802 33.5974 22.2426 32.8509 20.8854Z" fill="#738094"/>
                  </g>
                  <mask id="mask1_304_210"  maskUnits="userSpaceOnUse" x="19" y="15" width="16" height="15">
                    <path d="M19.3555 15.0664H34.9955V29.4886H19.3555V15.0664Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask1_304_210)">
                    <path d="M23.7232 29.4681C23.5957 29.2025 23.4876 28.9428 23.3512 28.6995C22.8414 27.7923 22.3385 26.8804 21.7995 25.9908C21.5006 25.4983 21.1157 25.063 20.6507 24.7112C20.2778 24.4288 19.8757 24.2419 19.365 24.3831C19.3861 24.3255 19.3955 24.2833 19.4153 24.2466C19.6505 23.817 19.9187 23.4126 20.3071 23.1026C20.8341 22.6824 21.3981 22.6196 22.0159 22.899C22.6532 23.187 23.1355 23.6589 23.5772 24.1756C23.932 24.5911 24.2549 25.0337 24.5968 25.4703C24.6037 25.4651 24.6222 25.457 24.633 25.4427C25.3076 24.5528 25.9694 23.6525 26.6587 22.7741C28.1614 20.8581 29.7158 18.9839 31.4483 17.2693C32.0508 16.6735 32.71 16.1314 33.3704 15.5987C33.6258 15.3933 33.9465 15.2539 34.2569 15.1368C34.6018 15.0067 34.8218 15.1118 34.9923 15.4166C34.951 15.4631 34.908 15.5148 34.8614 15.563C33.0251 17.4601 31.3786 19.5109 29.8957 21.6942C28.5201 23.7196 27.2745 25.8238 26.1343 27.99C26.0375 28.1743 25.9147 28.303 25.7284 28.399C25.0605 28.7452 24.3996 29.106 23.7232 29.4681Z" fill="#738094"/>
                  </g>
                </svg>
                <span>Total votes:</span>
                <span className={styles.headStatisticsValue}>5,118</span>
              </div>
            </div>
          </div>
          <div className={styles.lists}>
            <VotesList
            votes={openVotes}
            title={'Open proposals'}
            />
            <TotalVotes
            totalVotes={totalVotes}
            />
            <VotesList
            votes={upcomingVotes}
            title={'Upcoming proposals'}
            />
            <div className={styles.closedVotes}>
              <VotesList
              votes={closedVotes}
              title={'Concluded proposals'}
              />
            </div>
          </div>
        </div>
        :
        <ClosedPageLabel
        text={'VOTE'}
        label={'Soon'}
        description={'The voice of the NONAME community'}
        />
      )
}

export default VotePage;

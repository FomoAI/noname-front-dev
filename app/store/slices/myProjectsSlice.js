import { createSlice } from "@reduxjs/toolkit";
import img1 from '../../assets/img/img1.jpg'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'
import img4 from '../../assets/img/img4.jpg'
import projectImg from '../../assets/img/news/img3.jpg'
import icons from '../../assets/icons/socialmedia/socialmedia'

const myProjectsSlice = createSlice({
    name:'myProjects',
    initialState:[
        {   
            id:1901,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img1.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:3,
            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1902,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img2.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:2,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1903,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img3.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:1,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1904,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img4.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:2,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1905,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img1.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:2,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1906,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img2.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:3,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1907,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img3.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:1,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
        {   
            id:1908,
            dateStart:'22.11.2022',
            timeStart:'24:00',
            timeEnd:'24:00',
            investments:'$100.00 (15.018%)',
            path:'donate',
            isClosed:false,
            dateEnd:'01.01.2022',
            title:'SharkRace Club',
            description:'Short description in one line...',
            field:'Field name',
            goal:'$1,8M',
            img:'/img4.jpg',
            funded:'$2.72 (25%)',
            lastFunding:'Mar 8, 2022',
            type:'Seed',
            rating:1,
                            status:'Active',
            socialmedia:[
                {
                    icon:icons.medium,
                    alt:'Medium',
                    link:'/'
                },
                {
                    icon:icons.telegram,
                    alt:'Telegram',
                    link:'/'
                },
                {
                    icon:icons.tikTok,
                    alt:'tikTok',
                    link:'/'
                },
                {
                    icon:icons.discord,
                    alt:'discord',
                    link:'/'
                },
                {
                    icon:icons.facebook,
                    alt:'facebook',
                    link:'/'
                },
                {
                    icon:icons.instagram,
                    alt:'instagram',
                    link:'/'
                },
                {
                    icon:icons.twitter,
                    alt:'twitter',
                    link:'/'
                },
            ],
            projectImg:'/dimg3.jpg',
            descriptionFull:
            `
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
             officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
             Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
             officia consequat duis enim velit mollit.Amet minim mollit non deserunt ullamco 
             est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
              officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco 
              est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
              consequat duis enim velit mollit.Amet minim mollit non deserunt
             ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            `,
            investors:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager I',
                },
            ],
            team:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager T',
                },
            ],
            partners:[
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
                {
                    img:'/img1.jpg',
                    name:'Dr. Laurent El Ghaul',
                    text:'Business manager P',
                },
            ],
            links:[
                {
                    name:'ArcBlock Rating Review',
                    link:'/'
                },
                {
                    name:'ArcBlock Coin Guide',
                    link:'/'
                },
            ]
        },
    ],
    reducers:{

    }
})

export default myProjectsSlice.reducer
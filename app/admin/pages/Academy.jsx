import { useState,createContext } from 'react';
import AcademyMain from '../components/academyMain/AcademyMain';
import AcademyDirections from '../components/academyDirections/AcademyDirections';
import AcademyCoursesInfo from '../components/academyCoursesInfo/AcademyCoursesInfo';
import AcademyStudyFormat from '../components/academyStudyFormat/AcademyStudyFormat';
import AcademyCourses from '../components/academyCourses/AcademyCourses';
import AcademyAuthors from '../components/academyAuthors/AcademyAuthors';
import AcademyReviews from '../components/academyReviews/AcademyReviews';
import AcademyFilter from '../components/academyFilter/AcademyFilter';
import styles from '../styles/academy.module.scss'

const langs = [
    {
        name:'ENG',
    },
    {
        name:'UA',
    },
]

const getCurrentSection = (section) => {
    switch (section) {
        case 'main':
            return <AcademyMain/>
        case 'directions':
            return <AcademyDirections/>
        case 'coursesinfo':
            return <AcademyCoursesInfo/>
        case 'studyformat':
            return <AcademyStudyFormat/>
        case 'courses':
            return <AcademyCourses/>
        case 'authors':
            return <AcademyAuthors/>
        case 'reviews':
            return <AcademyReviews/>
        default:
            return <AcademyMain/>
    }
}

export const LangContext = createContext('ENG')

const AcademyAdminPage = () => {
    const [currentSection,setCurrentSection] = useState('main')
    const [lang,setLang] = useState('ENG')

    return (
        <LangContext.Provider value={lang}>
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div>
                    <div className={styles.academyTitle}>
                        <h1>
                            {
                                lang === 'ENG'
                                ?
                                'Academy'
                                :
                                'Академія'
                            }
                        </h1>
                    </div>
                    <AcademyFilter
                    lang={lang}
                    handler={(section) => setCurrentSection(section)}
                    />
                </div>
                <div className={styles.langs}>
                    {
                        langs.map((langItem) => {
                            return (
                                <button 
                                key={langItem.name}
                                onClick={() => setLang(langItem.name)}
                                className={
                                    langItem.name === lang
                                    ?
                                    styles.lang + ' ' + styles.selected
                                    :   
                                    styles.lang
                                    }>
                                    {langItem.name}
                                </button>

                            )
                        })
                    }
                </div>
            </div>
            {
                getCurrentSection(currentSection)
            }
        </div>
        </LangContext.Provider>
    )
}

export default AcademyAdminPage;

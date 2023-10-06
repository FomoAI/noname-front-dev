import { useState , useCallback} from 'react'
import styles from '../styles/bussiness.module.scss'
import ProjectsRow from '../components/projectsRow/ProjectsRow'

const getProjectType = (title) => {
   switch (title) {
    case 'Startups':
      return 'startup'
    case 'Donates':
      return 'donate'
    case 'Crypto':
      return 'crypto'
    case 'Real Estate':
      return 'realestate'
   }
}

export default function Bussiness({projects,title}) {
  const [projectsData,setProjectsData] = useState(() => projects.map((item) => {
   return {...item,projects:item.projects.reverse()}
  } ))

  const changeStatusLocal = useCallback((id,index) => {
    setProjectsData((state) => state.map((projectRow,i) => {
      if(i === index){
        return (
          {...projectRow,
            projects:projectRow.projects.map((project) => {
              if(project._id === id){
                return {...project,isMainProject:!project.isMainProject}
              }
              return project
            })
          }
        )
      }
      return projectRow
    }))
  },[projectsData])

  const hideLocal = useCallback((id,index) => {
    setProjectsData((state) => state.map((projectRow,i) => {
      if(i === index){
        return (
          {...projectRow,
            projects:projectRow.projects.map((project) => {
              if(project._id === id){
                return {...project,hidden:!project.hidden}
              }
              return project
            })
          }
        )
      }
      return projectRow
    }))
  },[projectsData])

  const deleteProjectLocal = useCallback((id,index) => {
    setProjectsData((state) => state.map((projectRow,i) => {
      if(index === i){
        const filtered = projectRow.projects.filter((project) => {
          return project._id !== id
        })
        return(
          {...projectRow,projects:filtered}
        )
      }
      return projectRow
    }))
  },[projectsData])

  return (
    <div className={styles.body}>
        <div className={styles.title}>
            <h1>{title}</h1>
        </div>
        {projectsData.map((projectsItem,index) => {
            return (
              <ProjectsRow 
              hideLocal={hideLocal}
              removeLocal={deleteProjectLocal}
              changeLocal={changeStatusLocal}
              index={index}
              key={projectsItem.name} 
              type={getProjectType(title)} 
              status={projectsItem.name} 
              projects={projectsItem.projects}/>
            )
            
        })}
    </div>
  )
}

import styles from '../styles/projects-dates.module.scss'
import Project from '../project/Project'

export default function ProjectsDates({projectsWithDates}) {
  return (
    <div className={styles.projectsList}>
    {
        projectsWithDates.map((projectWithDates,index) => {
            return (
                <div key={index} className={styles.body}>
                    <div className={styles.date}>
                        {projectWithDates.date}
                    </div>
                    <div className={styles.projects}>
                        {projectWithDates.projects.map((project) => {
                            return <Project key={project._id} project={project}/>
                        })}
                    </div>
                </div>
                )
        })
    }
    </div>
  )
}

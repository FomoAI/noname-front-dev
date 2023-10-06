import styles from './projects-stats.module.scss'
import ProjectsStatsItem from '../projectStatsItem/ProjectsStatsItem'

export default function ProjectsStatsTable({projects}) {


  return (
    <div className={styles.table}>
        <div className={styles.head}>
            <span>Projects</span>
            <span>Type</span>
            <span>Total Raise</span>
            <span>All Time High</span>
            <span>Purpose</span>
        </div>
        {
            projects?.length
            ?
            projects.map((project) => {
                return <ProjectsStatsItem key={project._id} item={project}/>
            })
            :
            <></>
        }
    </div>
  )
}

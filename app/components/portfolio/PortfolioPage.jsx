import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllPartnersFromPool,getMeInPool,getPoolId,getPoolInfo } from '../../smart/initialSmartMain'
import useProjects from '../../hooks/useProjects'
import getUserProjects from '../../services/getUserProjects'
import getUserData from '../../utils/getUserData'
import Info from '../../assets/components/info/Info'
import Project from '../project/Project'
import Hidden from '../../assets/components/HiddenComponent/Hidden'
import StakingBlock from '../staking/StakingBlock'
import LoaderCustom from '../../assets/components/loader/Loader'
import styles from '../styles/portfolio.module.scss'

export default function PortfolioPage() {
  const [loadingPage,setLoadingPage] = useState(false)
  const [poolId,setPoolId] = useState(null)
  const [projects,setProjects] = useState([])
  const [project,setProject] = useState()
  const {allProjects} = useProjects({})
  const isAuth = useSelector((state) => state.auth.userData.isAuth)

  useEffect(() => {

    const getProjectsInfo = async () => {
      setLoadingPage(true)
      const {success,projects} = await getUserProjects(getUserData().address)
      
      if(!projects?.length || allProjects?.length){
        setLoadingPage(false)

        const currentProject = allProjects.find((pr) => pr.isMainProject)

        setProject(currentProject)
        setPoolId(Number(currentProject?.poolId))

        return
      }

      const projectsWithInvestData = []

      for (let i = 0; i < projects.length; i++) {
        const project = projects[i]

        if(project.poolId){
          const {sumInvest,participants} = await getAllPartnersFromPool(project.poolId)
          
          const {data} = await getMeInPool(project.poolId,window.ethereum.selectedAddress)

          // const res = await getUserInvestInfoEndedPool(project.poolId,window.ethereum.selectedAddress)
          const {response} = await getPoolInfo(project.poolId)
  
          projectsWithInvestData.push({
            ...project,
            funded:sumInvest,
            investments:data.invest,
            isClaim:response.isClaim,
            claimed:response.claimed
          })

        }else{
          projectsWithInvestData.push(project)
        }
      }
      
      if(success){
        setProjects(projectsWithInvestData)
      }

      const currentProject = allProjects.find((pr) => pr.isMainProject)
      const poolId = currentProject.poolId

      setPoolId(poolId)
      setProject(currentProject)

      setLoadingPage(false)
    }

    getProjectsInfo()
  },[allProjects])
  
  if(loadingPage){
    return <LoaderCustom/>
  }

  if(!isAuth){
    return (
      <Hidden>
        Please, connect wallet to use Dashboard
      </Hidden>
    )
  }

  return (
    <main className={styles.body}>
        <Info title={'My projects'} text={'Projects that I have invested in'}/>
        <div className={styles.projects}>
            {
              projects?.length
              ?
              projects.map((project) => {
                return <Project key={project._id} project={project} inDashboard={true}/>
              })
              :
              <div className={styles.projectsEmptyText}>
                You haven't participated in any projects yet
              </div>
            }
        </div>

      <StakingBlock
      project={project}
      projects={projects}
      poolId={poolId}
      />
    </main>
  )
}

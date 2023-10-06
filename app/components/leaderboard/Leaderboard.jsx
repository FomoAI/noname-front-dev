import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getLeaderBoardData } from '../../smart/initialSmartMain'
import Info from "../../assets/components/info/Info"
import MyScore from "../../assets/components/myScore/MyScore"
import LeaderboardTable from "../../assets/components/leaderboardTable/LeaderboardTable"
import ProjectsStats from "../../assets/components/projectsStats/ProjectsStats"
import Hidden from "../../assets/components/HiddenComponent/Hidden"
import styles from '../styles/leaderboard.module.scss'
import useProjects from "../../hooks/useProjects"
import Loader from '../../assets/components/loader/Loader'

export default function Leaderboard() {
  const userData = useSelector((state) => state.auth.userData)
  const {allProjects,loading} = useProjects({})
  const [smartLoading,setSmartLoading] = useState(false)
  const [list,setList] = useState([])
  const [userRankData,setUserRankData] = useState({})

  useEffect(() => {
    if(!allProjects?.length) return

    const currentProject = allProjects.find((pr) => pr.isMainProject)
    
    if(!currentProject?.poolId) return
    
    setSmartLoading(true)

    getLeaderBoardData(currentProject?.poolId).then(({boardList,userData}) => {
      setList(Array.isArray(boardList) ? boardList : [])
      setUserRankData(userData)
      setSmartLoading(false)
    })

  },[allProjects])

  if(loading || smartLoading) return <Loader/>

  return (
    userData.isAuth
    ? 
    <div className={styles.marginTop}>
        <Info 
        title={'Leaderboard'} 
        text={'The most active and successful members of No name community'}
        />
        <div className={styles.wrapper}>
            <MyScore userData={{
              ...userData,
              ...userRankData
            }}/>
            <LeaderboardTable 
              list={list}
            />
        </div>
        <div className={styles.projectStats}>
          <ProjectsStats projects={allProjects}/>
        </div>
    </div>
    :
    <Hidden>
        Please, connect wallet to use Leaderboard
    </Hidden>
  )
}

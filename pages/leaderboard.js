import Layout from '../app/components/layout/index'
import Leaderboard from '../app/components/leaderboard/Leaderboard'
import HeadBlock from '../app/components/head/Head'

export default function LeaderboardPage() {
  return (
    <>
    <HeadBlock title={'Leaderboard'}/>
    <Layout >
        <Leaderboard/>
    </Layout>
    </>
  )
}

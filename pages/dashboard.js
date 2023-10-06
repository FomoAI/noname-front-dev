import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import PortfolioPage from '../app/components/portfolio/PortfolioPage'

export default function Home() {
  return (
    < >
      <HeadBlock title={'Portfolio'}/>
      <Layout>
        <PortfolioPage/>
      </Layout>
    </>
  )
}

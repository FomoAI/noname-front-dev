import HeadBlock from "../app/components/head/Head"
import VotePage from "../app/components/vote/VotePage"
import Layout from '../app/components/layout/index'

export default function Vote() { 
    return (
        <>
        <HeadBlock title={'Vote'}/>
        <Layout>
            <VotePage
            isOpen={false}
            />
        </Layout>
        </>
    )
}
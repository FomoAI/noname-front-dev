import RwaMarket from "../app/components/rwaMarket/RwaMarket"
import HeadBlock from "../app/components/head/Head"
import Layout from '../app/components/layout/index'

export default function Rwa() { 
    return (
        <>
        <HeadBlock title={'Rwa market'}/>
        <Layout>
            <RwaMarket isOpen={true}/>
        </Layout>
        </>
    )
}
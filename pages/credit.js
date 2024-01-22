import HeadBlock from "../app/components/head/Head"
import Layout from '../app/components/layout/index'
import Borrow from "../app/components/credit/Borrow"

export default function Credit() { 
    return (
        <>
        <HeadBlock title={'Credit'}/>
        <Layout>
            <Borrow
            isCreditLine={true}
            isOpen={false}
            />
        </Layout>
        </>
    )
}
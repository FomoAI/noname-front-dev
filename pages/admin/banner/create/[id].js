import HeadBlock from '../../../../app/components/head/Head'
import Layout from '../../../../app/admin/components/layout/index'
import getSlides from '../../../../app/admin/services/bannerServices/getSlides'
import CreateSlide from '../../../../app/admin/components/createSlide/CreateSlide'

export async function getServerSideProps(context) {
  try{
    const {success,slide} = await getSlides(context.params.id)

    if(success){
      return {
        props: {slide}, 
      }
    }

    return {
      props: {slide:null}, 
    }
   
  }catch(error){
    return {slide:null}
  }
}

export default function AdminSlide({slide}) {
  
  return (
    < >
      <HeadBlock title={'Admin - Edit Slide'}/>
      <Layout>
        <CreateSlide action={'Edit'} slide={slide}/>
      </Layout>
    </>
  )
}

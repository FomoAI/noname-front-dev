import HeadBlock from '../../../app/components/head/Head'
import Layout from '../../../app/admin/components/layout/index'
import Banner from '../../../app/admin/pages/Banner';
import getSlides from '../../../app/admin/services/bannerServices/getSlides';

export async function getServerSideProps() {
    try{
      const {slides} = await getSlides()
      if(!slides){
        return { props: { slides :[]} }
      }
      return { props: { slides } }
      
    }catch(error){
      return { props: { slides:[] } }
    }
  }

const AdminBanner = ({slides}) => {
    return (
        < >
        <HeadBlock title={'Admin - Banner'}/>
        <Layout>
            <Banner slides={slides}/>
        </Layout>
      </>
    );
}

export default AdminBanner;

import HeadBlock from '../app/components/head/Head'
import getInfo from '../app/admin/services/infoServices/getInfo'
import getFooter from '../app/admin/services/footerServices/getFooter'
import NoNamePage from '../app/components/no-name/NoNamePage'

export async function getServerSideProps() {
  try{
    const {footer} = await getFooter()
    if(!footer.length){
      return { props: { footer :[]} }
    }
    return { props: { footer } }
    
  }catch(error){
    return { props: { footer:[] } }
  }
}


export default function InfoPage({footer}) {
  
  return (
    < >
        <HeadBlock title={'none'}/>
        <NoNamePage 
        whitepaper={footer[0]?.whitepaperLink}
        shillClub={footer[0]?.shillClubLink}
        socialMedia={footer[0].socialmedia}
        />
    </>
  )
}

import { useDispatch} from 'react-redux'
import {openModal} from '../../app/store/slices/modalsSlice'
import Hidden from '../../app/assets/components/HiddenComponent/Hidden'
import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/components/layout/index'
import { useEffect } from 'react'

export default function WaitingList() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openModal('wallet'))
    },[])

  return (
    < >
      <HeadBlock title={'Waiting list'}/>
      <Layout>
        <Hidden>
        Please add wallet to use waiting list...
        </Hidden>
      </Layout>
    </>
  )
}

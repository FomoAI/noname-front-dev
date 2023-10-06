import { useState, useEffect } from 'react'
import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import getAdmins from '../../app/admin/services/adminServices/getAdmins'
import getUsers from '../../app/admin/services/adminServices/getUsers'
import Home from '../../app/admin/pages/Home'

export default function Admin() {
  const [admins,setAdmins] = useState([])
  const [users,setUsers] = useState([])

  useEffect(() => {
    const getAdminsData = async () => {
      const {admins} = await getAdmins()
      const {users} = await getUsers()
      setAdmins(admins)
      setUsers(users)
    }
    getAdminsData()
  },[]) 

  return (
    < >
      <HeadBlock title={'Admin - Home'}/>
      <Layout>
        <Home users={users} admins={admins}/>
      </Layout>
    </>
  )
}

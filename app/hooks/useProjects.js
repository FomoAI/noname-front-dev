import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import fetchProjects from "../services/fetchProjects";

const useProjects = ({filter = null,find = ''}) => {
    const [loading,setLoading] = useState(false)
    const [filteredProjects,setFilteredProjects] = useState([])
    const [finded,setFinded] = useState({})
    const [allProjects,setAllProjects] = useState(() => [])
    const user = useSelector((state) => state.auth.userData)

    const getAllProjects = async () => {
        try{
            setLoading(true)
            let {projects} = await fetchProjects()
            let donates = (await fetchProjects('donates')).projects
            let crypto = (await fetchProjects('crypto')).projects
            let realestate = (await fetchProjects('realestate')).projects
            
            projects = projects.map((item) => {
                return item.projects
            }).flat()

            donates = donates.map((item) => {
                return item.projects
            }).flat()

            crypto = crypto.map((item) => {
                return item.projects
            }).flat()

            realestate = realestate.map((item) => {
                return item.projects
            }).flat()
            setLoading(false)
            return [...projects,...donates,...crypto,...realestate]
        }catch(error){
            console.log(error)
            setLoading(false)
            return []
        }
    }

    useEffect(() => {
        getAllProjects().then((data) => setAllProjects(data))
    },[])
    

    useMemo(() => {
        if(find && allProjects.length){
            setFinded(allProjects.find((project) => {
                return String(project.id) === String(find)
            }))
        }
    },[find])

    useMemo(() => {
        if(filter && allProjects.length){
            setFilteredProjects(allProjects.filter((project) => {
                return filter.includes(project._id)
            }))
        }
    },[filter])

    return {allProjects:allProjects,getAllProjects,filtered:filteredProjects,project:finded,loading};
}

export default useProjects;

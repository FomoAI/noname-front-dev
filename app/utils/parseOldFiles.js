
export default (project) => {
   return (
    [
    [project.investors,project.team,project.partners]
    .flat()
    .map((item) => {
      return {
         img:item.img,remove:false
      }
    }),
    [project.img,project.projectImg]
    .map((item) => {
      return {
         img:item,remove:false
      }
    })
    ].flat()
   )
}
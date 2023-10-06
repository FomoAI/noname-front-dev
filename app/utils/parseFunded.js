import parseGoal from "./parseGoal"

export default (funded,goal) => {
   const percent = Number(funded / parseGoal(goal) * 100).toFixed(2)
   console.log()
   return isNaN(percent) ? 0 : percent
}
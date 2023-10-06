
export default () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (7 * (24 * 60 * 60 * 1000)));
    const dayTomorrow = tomorrow.getDate(); 
    const monthTomorrow = tomorrow.getMonth() + 1;
    const yearTomorrow = tomorrow.getFullYear(); 

    const yesterday = new Date(today.getTime() + (-7 * (24 * 60 * 60 * 1000)));
    const dayyesterday = yesterday.getDate(); 
    const monthyesterday = yesterday.getMonth() + 1;
    const yearyesterday = yesterday.getFullYear(); 

    return (
        {past:`${String(dayyesterday).length > 1 ? dayyesterday : `0${dayyesterday}`}.${String(monthyesterday).length > 1 ? monthyesterday : `0${monthyesterday}`}.${yearyesterday}`,
        future:` ${String(dayTomorrow).length > 1 ? dayTomorrow : `0${dayTomorrow}`}.${String(monthTomorrow).length > 1 ? monthTomorrow : `0${monthTomorrow}`}.${yearTomorrow}`
        }
    )
}
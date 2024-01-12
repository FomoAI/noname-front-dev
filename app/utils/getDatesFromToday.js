
export default function () { 
    const dates = [];
    const today = new Date(); 
    
    for (let i = 0; i < 8; i++) {
      const date = new Date(today); 
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      dates.push(date.getTime());
    }
    
    return dates;
}
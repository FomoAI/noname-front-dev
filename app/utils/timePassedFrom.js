export function timePassedFrom(date) {
    const currentDate = new Date();
    const passedTime = currentDate - date;
  
    const seconds = Math.floor(passedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;

    if(days > 0){
        return `${days}d, ${remainingHours}h ${remainingMinutes} m`;
    }

    if(hours > 0){
        return `${remainingHours}h ${remainingMinutes} m`;
    }

    return `${remainingMinutes} min`;
}
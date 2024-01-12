export function remainingTime(endTime) {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();

    let difference = end - now;

    if (difference <= 0) {
        return 'Time has expired';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);

    const seconds = Math.floor(difference / 1000);

    if(days > 0){
        return `${days} days, ${hours} hours, ${minutes} minutes`;
    }

    if(hours > 0){
        return `${hours} hours, ${minutes} minutes`;
    }

    return `${minutes} minutes`

}
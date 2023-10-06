
export default (date, type)  => {
    if(type === 1){
        return String(`${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}`)
    }

    if(type === 2){
        const day = String(new Date(date)).split(' ')[0]
        return String(`${new Date(date).toDateString().split(' ')[1]} ${day}, ${new Date(date).getFullYear()}`)
    }

    if(type === 3){
        const day = String(new Date(date)).split(' ')[0]
        return String(`${day} ${new Date(date).toDateString().split(' ')[1]}, ${new Date(date).getFullYear()}`)
    }

    if(type === 4){
        const year = new Date().getFullYear()

        const currentDate = new Date(`${date.split('.')[1]}.${date.split('.')[0]}.${year}`)

        const day = String(currentDate.getDay())

        const time = String(currentDate).split(' ')[4]

        return String(`${currentDate.toDateString().split(' ')[1]} ${day}, ${currentDate.getFullYear()}, ${time}`)
    }

    return String(`${new Date(date).toDateString().split(' ')[1]} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`)
}
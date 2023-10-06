
export default (data) => {
    return (Object.values(data).filter((value) => value.length > 3).length > 1)
}
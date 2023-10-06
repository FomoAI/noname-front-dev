export default (array,name,formData) => {
    array.forEach((item,index) => {
        formData.append(`${name}Img${index}`,item.img)
      })
}
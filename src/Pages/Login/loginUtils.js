
export const setTokenToLocalStorage = (token)=>{
    localStorage.setItem("metaEBP",`@xl${token}`)

}

export const getToken =()=>{
    return localStorage.getItem("metaEBP")?.substring(3)
}
export const removeToken =()=>{
    localStorage.removeItem("metaEBP")
   
}
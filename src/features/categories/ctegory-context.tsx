import { PropsWithChildren, createContext, useContext, useState } from "react";

const CategoryContext = createContext<any | undefined>(undefined)

const CategoryProvider = ({children} : PropsWithChildren) =>{
    const [category,setCategory] = useState<object>()
    return(
        <CategoryContext.Provider value={{category,setCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}
const useCategoryContext = ()=>{
    return useContext(CategoryContext)
}

export {useCategoryContext,CategoryProvider}
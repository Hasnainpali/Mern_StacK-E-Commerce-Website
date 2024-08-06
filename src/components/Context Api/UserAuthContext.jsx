import React,{createContext,useState} from "react";

export const UserContext = createContext();

export const UserProvide = ({children}) =>{
    const [isHeaderFooter,setisHeaderFooter]= useState(true);
    const [isLogin, setisLogin] = useState(false);
    const [selected, setSelected] = useState("Mens ")
    const [alertBox, setAlertBox] = useState({
        open:false,
        msg:"",
        error:false
    });
    const [user,setUser] = useState({
        name:"",
        email:""
    })
    const BaseURl = "https://full-stack-ecommerce-server.vercel.app"

    return(
        <UserContext.Provider value={{
            isHeaderFooter,
            setisHeaderFooter,
            isLogin,
            setisLogin,
            BaseURl,
            selected,
            setSelected, 
            alertBox,
            setAlertBox,
            user,
            setUser
         }}>
            {children}
        
        </UserContext.Provider>


    )
}
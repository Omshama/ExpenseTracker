import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom";

export const useUserAuth=()=>{
    const {user,updateUser,clearUser}=useContext(UserContext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user ) return ;
        let isMounted =true;
        const fetchUserInfo =async()=>{

            try{
                

            }
            catch(error)
            {

            }
            
            )
        }
    })
}
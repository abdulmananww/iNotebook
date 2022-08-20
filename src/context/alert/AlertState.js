import React,{useState} from 'react';
import AlertContext from './AlertContext'
const AlertState = (props)=> {
    const [alert, setAlert] = useState({title:"",msg:"",type:""});
    const showAlert = (title,msg,type)=>{
        setAlert({title:title,msg:msg,type:type})
        setTimeout(() => {
            setAlert({title:"",msg:"",type:""})    
        }, 3000);
    }
  return (
      <AlertContext.Provider  value={{alert,showAlert}}>
        {props.children}
      </AlertContext.Provider>
  );
}


export default AlertState;
import React,{useContext} from "react";
import alertContext from "../context/alert/AlertContext";

export default function Alert() {
  const context = useContext(alertContext);
  const {alert} = context;
  return (
    alert.title && <div>
      <div className={`alert alert-${alert.type}`} role="alert">
        <strong>{alert.title}:</strong> {alert.msg}
      </div>
    </div>
  );
}

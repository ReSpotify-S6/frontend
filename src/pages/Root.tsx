import { Outlet } from "react-router-dom";
import "./styles.scss";
import { useEffect, useState } from "react";
import AdminToolbar from "./NavBar/toolbars/AdminToolbar";
import UserToolbar from "./NavBar/toolbars/UserToolbar";
import { useKeycloak } from "@react-keycloak/web";

export default function Root() {
  const [toolbar, setToolBar] = useState(<></>);
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if(keycloak.authenticated){
      if(keycloak.hasRealmRole("administrator")){
        setToolBar(<AdminToolbar />);
      }
      else{
        setToolBar(<UserToolbar />);
      }
    }
  }, [keycloak, keycloak.authenticated])

  return (
    <>
      <header>
        {toolbar}
      </header>
      <div className="middle">
        <Outlet/>
      </div>
    </>
  );
}
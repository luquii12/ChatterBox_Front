import {  useEffect, useState } from "react";
import Card from "../components/Card";
import GroupServices from "../services/GroupServices";
import { useAuth } from "../auth/AuthProvider";
import TextChat from "../components/TextChat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const {user}=useAuth()
  console.log(user);
  
  const [groups, setGroups] = useState([]);
useEffect(() => {
GroupServices.getAllGroups("1").then((response) => {
  setGroups(response.data);
}
).catch((error) => {
  console.error("Error fetching groups:", error);
});


},[])


  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Bienvenido a Nuestra Página</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id_grupo} id={group.id_grupo} title={group.nombre_grupo} description={group.descripcion} image={group.foto_grupo} />
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Card from "../components/Card";
import GroupServices from "../services/GroupServices";
import { useAuth } from "../auth/AuthProvider";
import Welcome from "./Welcome";

const Home = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState(null); // null = aún no cargado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.usuario?.id_usuario) {
      GroupServices.getAllGroups(user.usuario.id_usuario)
        .then((response) => {
          setGroups(response.data);
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
          setGroups([]); 
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setGroups([]); // si no hay usuario
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {groups && groups.length > 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-6 background-primary">
          <h1 className="text-6xl font-bold mb-15 text-center">MY GROUPS</h1>
          <div className="grid gap-25 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1400px]">
            {groups.map((group) => (
              <div key={group.id_grupo} className="cursor-pointer">
                <Card
                  id={group.id_grupo}
                  title={group.nombre_grupo}
                  description={group.descripcion}
                  image={group.foto_grupo}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Home;

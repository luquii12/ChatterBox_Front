import { useEffect, useState } from "react";
import Card from "../components/Card";
import GroupServices from "../services/GroupServices";
import { useAuth } from "../auth/AuthProvider";
import Welcome from "./Welcome";
import { Settings } from "lucide-react";     
import { useNavigate } from "react-router-dom"; 

const Home = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();  
  useEffect(() => {
    if (user?.usuario?.id_usuario) {
      GroupServices.getAllGroups(user.usuario.id_usuario)
        .then((response) => {
          setGroups(response.data);
          console.log("Grupos obtenidos:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
        });
    }
  }, [user]);

  return (
    <>
      {groups.length > 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-15 background-primary">
          <h1 className="text-6xl font-bold mb-15 text-center">MY GROUPS</h1>
          <div className="grid gap-25 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1400px]">
            {groups.map((group) => (
              <div key={group.id_grupo} className="relative cursor-pointer">
                <div className="relative">
                  <Card
                    id={group.id_grupo}
                    title={group.nombre_grupo}
                    description={group.descripcion}
                    image={group.foto_grupo}
                  />
                  {group.id_usuario_creador === user?.usuario?.id_usuario && (
                    <div className="absolute bottom-3 right-5">
                      <Settings
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/groups/${group.id_grupo}/settings`);
                        }}
                        className="primary-color cursor-pointer"
                        size={30}
                      />
                    </div>
                  )}
                </div>
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

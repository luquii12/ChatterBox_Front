import { useEffect, useState } from "react";
import Card from "../components/Card";
import GroupServices from "../services/GroupServices";
import { useAuth } from "../auth/AuthProvider";

const PublicGroups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

 useEffect(() => {
  const fetchGroups = async () => {
    if (user?.usuario?.id_usuario) {
      try {
        const userGroupsResponse = await GroupServices.getAllGroups(user.usuario.id_usuario);
        const userGroupsData = userGroupsResponse.data;
        setUserGroups(userGroupsData);

        const publicGroupsResponse = await GroupServices.getpublic();
        const publicGroupsData = publicGroupsResponse.data;

        const filteredPublicGroups = publicGroupsData.filter((group) => {
          const yaEstoy = userGroupsData.some(userGroup => userGroup.id_grupo === group.id_grupo);
          return !group.es_privado && !yaEstoy;
        });

        setGroups(filteredPublicGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }
  };

  fetchGroups();
}, [user]);


  const handleJoinGroup = (groupId) => {
    GroupServices.joinGroup(groupId)
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-15 background-primary">
      <h1 className="text-6xl font-bold mb-15 text-center">PUBLIC GROUPS</h1>
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1400px]">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id_grupo} className="cursor-pointer flex flex-col items-center">
              <Card
                id={group.id_grupo}
                title={group.nombre_grupo}
                description={group.descripcion}
                image={group.foto_grupo}
                nav={false}
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                onClick={() => handleJoinGroup(group.id_grupo)}
              >
                Unirse al grupo
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-xl text-center col-span-full mt-10">
            No public groups available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicGroups;

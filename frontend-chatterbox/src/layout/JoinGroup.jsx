import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Search } from "lucide-react";
import GroupServices from "../services/GroupServices";

export default function JoinGroup() {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [imageUrls, setImageUrls] = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) {
      setHasSearched(true);
      setGroups([]);
      setImageUrls({});
      return;
    }
    setLoading(true);
    setGroups([]);
    setImageUrls({});
    setHasSearched(true);
    GroupServices.getpublic(search)
      .then(async (response) => {
        const grupos = response.data.content || [];
        setGroups(grupos);

        // Cargar imágenes
        const urls = {};
        await Promise.all(
          grupos.map(async (group) => {
            try {
              const res = await GroupServices.getImagenGrupo(group.id_grupo);
              const url = URL.createObjectURL(res.data);
              urls[group.id_grupo] = url;
            } catch {
              urls[group.id_grupo] = null;
            }
          })
        );
        setImageUrls(urls);
      })
      .catch((error) => {
        setGroups([]);
        setImageUrls({});
        console.log("Error fetching groups: ", error);
      })
      .finally(() => setLoading(false));
  };

  const joinGroup = (groupId) => {
    GroupServices.joinGroup(groupId)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setSelectedGroup(null);
          setSuccess(false);
          navigate(`/group/${groupId}`);
        }, 500);
      })
      .catch((error) => {
        console.error("Error joining group:", error);
        setShowModal(false);
        setSelectedGroup(null);
        setSuccess(false);
      });
  };

  return (
    <div className="min-h-screen background-primary flex items-center justify-center px-2 py-2">
      <div className="background-secondary border primary-color rounded-lg p-10 w-[1000px] text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100">
        <div className="flex justify-center mb-6">
          <h2 className="text-5xl" style={{ color: "#FFEBA7" }}>
            Join Public Group
          </h2>
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 text-lg">Search Public Groups</label>
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 primary-color pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type group name..."
                className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="ml-4 px-6 py-3 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer flex items-center"
              style={{ minWidth: 120 }}
            >
              Search
            </button>
          </div>
        </div>

        {hasSearched && !search.trim() && (
          <div className="text-center text-yellow-200 mb-4">
            Please enter a group name to search.
          </div>
        )}

        {loading && (
          <div className="text-center text-yellow-200 mb-4">
            Loading groups...
          </div>
        )}

        {hasSearched && search.trim() && groups.length === 0 && !loading && (
          <div className="text-center text-gray-400">No groups found.</div>
        )}

        {groups.length > 0 && (
          <div className="space-y-4 mb-6">
            {groups.map((group) => (
              <div
                key={group.id_grupo}
                className="background-terciary border border-yellow-400 p-6 rounded transition-all duration-300 flex items-center space-x-4"
              >
                <img
                  src={imageUrls[group.id_grupo] || "/default-group.png"}
                  alt="Group"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold">{group.nombre_grupo}</p>
                </div>
                <button
                  className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer"
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowModal(true);
                  }}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedGroup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
              {!success ? (
                <>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Are you sure you want to join{" "}
                    <span className="text-yellow-500">
                      {selectedGroup.nombre_grupo}
                    </span>
                    ?
                  </h3>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      className="px-6 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer"
                      onClick={() => joinGroup(selectedGroup.id_grupo)}
                    >
                      Yes, join
                    </button>
                    <button
                      className="px-6 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition cursor-pointer"
                      onClick={() => {
                        setShowModal(false);
                        setSelectedGroup(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    You have joined the group successfully!
                  </h3>
                  <p className="text-gray-600">Redirecting...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

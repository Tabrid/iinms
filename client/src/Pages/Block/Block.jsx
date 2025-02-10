import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

const Block = () => {
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: "", latitude: "", longitude: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);

  // Fetch blocks from the backend
  const fetchBlocks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bloks/blocks");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  // Fetch blocks when the component mounts
  useEffect(() => {
    fetchBlocks();
  }, []);

  const openAddRoleModal = () => {
    setCurrentRole({ name: "", latitude: "", longitude: "" });
    setIsEditMode(false);
    setEditRoleId(null);
    setModalVisible(true);
  };

  const openEditRoleModal = (id) => {
    const roleToEdit = roles.find((role) => role.id === id);
    if (roleToEdit) {
      setCurrentRole({ name: roleToEdit.name, latitude: roleToEdit.latitude, longitude: roleToEdit.longitude });
      setIsEditMode(true);
      setEditRoleId(id);
      setModalVisible(true);
    }
  };

  const saveRole = async () => {
    if (isEditMode) {
      // Update existing block
      try {
        const response = await fetch(`http://localhost:5000/api/bloks/blocks/${editRoleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentRole),
        });
        const updatedRole = await response.json();
        setRoles((prevRoles) =>
          prevRoles.map((role) => (role.id === editRoleId ? updatedRole : role))
        );
      } catch (error) {
        console.error("Error updating block:", error);
      }
    } else {
      // Add new block
      try {
        const response = await fetch("http://localhost:5000/api/bloks/blocks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentRole),
        });
        const newBlock = await response.json();
        setRoles([...roles, newBlock]);
      } catch (error) {
        console.error("Error adding block:", error);
      }
    }

    setModalVisible(false);
    setCurrentRole({ name: "", latitude: "", longitude: "" });
  };

  const deleteRole = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/bloks/blocks/${id}`, {
        method: "DELETE",
      });
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting block:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div >
        <div className="p-6 bg-gray-50 min-h-screen w-full">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Block List</h1>
            <div className="flex justify-end mb-4">
              <button
                onClick={openAddRoleModal}
                className="bg-slate-600 text-white px-6 py-2 rounded shadow hover:shadow-lg transition duration-300"
              >
                Add Block
              </button>
            </div>
          </div>

          <table className="w-full border-collapse bg-white rounded shadow-lg">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="border-b px-6 py-3 text-left">ID</th>
                <th className="border-b px-6 py-3 text-left">Name</th>
                <th className="border-b px-6 py-3 text-left">Latitude</th>
                <th className="border-b px-6 py-3 text-left">Longitude</th>
                <th className="border-b px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-100">
                  <td className="border-b px-6 py-3 w-24">{role.id}</td>
                  <td className="border-b px-6 py-3">{role.name}</td>
                  <td className="border-b px-6 py-3">{role.latitude}</td>
                  <td className="border-b px-6 py-3">{role.longitude}</td>
                  <td className="border-b px-6 py-3 h-full flex gap-4">
                    <button
                      onClick={() => openEditRoleModal(role.id)}
                      className="text-slate-600 hover:underline"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => deleteRole(role.id)}
                      className="hover:underline text-red-500"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {modalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                  {isEditMode ? "Edit Block" : "Add Block"}
                </h2>
                <label className="block mb-2 font-medium">Block Name</label>
                <input
                  type="text"
                  value={currentRole.name}
                  onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Block name"
                />
                <label className="block mb-2 font-medium">Latitude</label>
                <input
                  type="text"
                  value={currentRole.latitude}
                  onChange={(e) => setCurrentRole({ ...currentRole, latitude: e.target.value })}
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Latitude"
                />
                <label className="block mb-2 font-medium">Longitude</label>
                <input
                  type="text"
                  value={currentRole.longitude}
                  onChange={(e) => setCurrentRole({ ...currentRole, longitude: e.target.value })}
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Longitude"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setModalVisible(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveRole}
                    className="bg-slate-600 text-white px-4 py-2 rounded shadow hover:shadow-lg transition duration-300"
                  >
                    Save
                  </button>
                </div>
                <button
                  onClick={() => setModalVisible(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Block;

import React, { useState } from 'react';
import {
  Users,
  Lock,
  Unlock,
  FileText,
  UserPlus,
  Trash2,
  ShieldCheck,
  ShieldX,
  Save,
  Image as ImageIcon,
} from 'lucide-react';

export default function ModifyGroup() {
  const [groupName, setGroupName] = useState();
  const [description, setDescription] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  const [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [image, setImage] = useState(null);

  const handleAddMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (name) => {
    setMembers(members.filter((m) => m !== name));
    setAdmins(admins.filter((a) => a !== name));
  };

  const handleGiveAdmin = (name) => {
    if (!admins.includes(name)) setAdmins([...admins, name]);
  };

  const handleRemoveAdmin = (name) => {
    setAdmins(admins.filter((a) => a !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      groupName,
      description,
      isPrivate,
      members,
      admins,
      image,
    });
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-6xl primary-color font-semibold mb-10">MODIFY GROUP</h2>

      <form
        onSubmit={handleSubmit}
        className="background-secondary border primary-color rounded-lg p-10 w-[1500px] min-h-[700px] grid grid-cols-1 md:grid-cols-2 gap-10 text-white"
      >
        {/* Group Name */}
        <div className="relative">
          <label className="block mb-2">Group Name</label>
          <Users className="absolute left-3 top-2/3 -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

        {/* Group Image */}
        <div className="relative">
          <label className="block mb-2">Group Image</label>
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 primary-color" />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="relative">
          <label className="block mb-2">Group Privacy</label>
          <div className="flex gap-5 mt-2">
            <label className="flex items-center gap-2">
              <Unlock />
              <input
                type="radio"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
              />
              Public
            </label>
            <label className="flex items-center gap-2">
              <Lock />
              <input
                type="radio"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
              />
              Private
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block mb-2">Description</label>
          <FileText className="absolute left-3 top-13 w-6 h-6 primary-color" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your group"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
            rows="4"
          />
        </div>

        {/* Add Member */}
        <div className="relative">
          <label className="block mb-2">Add Member</label>
          <div className="flex gap-2 items-center">
            <input
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded background-terciary border border-gray-600"
            />
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>

        {/* Members List */}
        <div>
          <label className="block mb-2">Delete Members</label>
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m} className="flex justify-between items-center border-b border-gray-600 py-1">
                <span>{m}</span>
                <button type="button" onClick={() => handleRemoveMember(m)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Remove Admin */}
        <div>
          <label className="block mb-2">Administrator Permissions</label>
          <select
            onChange={(e) => handleRemoveAdmin(e.target.value)}
            className="w-full px-4 py-3 rounded background-terciary border border-gray-600"
          >
            <option value="">Remove admin</option>
            {admins.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Give Admin */}
        <div>
          <label className="block mb-2">Give Administrator Permissions To</label>
          <select
            onChange={(e) => handleGiveAdmin(e.target.value)}
            className="w-full px-4 py-3 rounded background-terciary border border-gray-600"
          >
            <option value="">Select member</option>
            {members.filter((m) => !admins.includes(m)).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="w-[600px] border-2 text-white py-5 rounded hover:bg-[#FFEBA7] background-terciary flex justify-center items-center gap-2"
            style={{ borderColor: '#FFEBA7' }}
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

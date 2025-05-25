import React, { useState } from 'react';
import { Users, CheckCircle } from 'lucide-react';
import GroupServices from '../services/GroupServices';

export default function JoinGroup() {
  const [code, setCode] = useState('');
  const [group, setGroup] = useState(null);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckCode = async () => {
    setLoading(true);
    setValid(false);
    setGroup(null);

  
     
      GroupServices.joinGroup(code).then((response) => {

     console.log('Grupo creado:', response.data);
     
      setGroup(response.data);
    })
    .catch((error) => {
      setValid(true);
      console.error('Error:', error);
      setValid(false);
      setGroup(null);
    })
 
  }
  return (
    <div className="min-h-screen background-primary flex items-center justify-center px-2 py-2">
      <div className="background-secondary border primary-color rounded-lg p-10 w-[1000px] text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100">

        <div className="flex justify-center mb-6">
          <h2 className="text-5xl primary-color font-semibold text-center">Join Group</h2>
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 text-lg">Invitation Code</label>
          <Users className="absolute left-3 top-2/3 -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="#GROUPCODE"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

        {   group && (
          <div className="background-terciary border border-green-500 p-6 rounded mb-6 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <img
                src={group.foto_grupo}
                alt="Group"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-xl font-semibold">{group.nombre_grupo}</p>
                <p className="text-sm text-gray-400">{group.members} members</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-green-400 font-medium">
              <CheckCircle className="w-5 h-5 mr-2" />
              Valid Code
            </div>
          </div>
        )}

       
        <div className="flex justify-center">
          <button
            onClick={handleCheckCode}
            className="w-[400px] mt-4 border-1 text-white py-4 rounded hover:bg-[#FFEBA7] background-terciary disabled:opacity-50"
            style={{ borderColor: '#FFEBA7' }}
          >
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
}
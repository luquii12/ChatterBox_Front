import  { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GroupServices from "../services/GroupServices";

const Card = ({ title, description, image,id ,nav=true}) => {
    const navigate = useNavigate();
const [imagenGrupo, setImagenGrupo] = useState(null);
const goGroup=(id)=>{
  if(!nav) return;
  
navigate(`/group/${id}`);


}
useEffect(() => {
  GroupServices.getImagenGrupo(id)
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setImagenGrupo(imageUrl);
    })
    .catch((error) => {
      console.error("Error fetching group image:", error);
      setImagenGrupo("https://via.placeholder.com/150"); // Placeholder image
    });
},[])

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm background-terciary border-background-secondary" onClick={()=>{goGroup(id)}}>
      <img className="rounded-t-lg w-full h-48 object-cover" src={imagenGrupo} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight secondary-color">
          {title}
        </h5>
        <p className="mb-3 font-normal secondary-color">{description}</p>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { useNavigate } from "react-router";

const Card = ({ title, description, image,id ,nav=true}) => {
    const navigate = useNavigate();

const goGroup=(id)=>{
  if(!nav) return;
  
navigate(`/group/${id}`);
}


  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" onClick={()=>{goGroup(id)}}>
      <img className="rounded-t-lg w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
       
      </div>
    </div>
  );
};

export default Card;

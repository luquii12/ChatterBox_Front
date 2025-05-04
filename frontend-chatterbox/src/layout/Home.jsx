import React from "react";
import Card from "../components/Card";

const cards = [
  {
    id: 1,
    title: "Adquisiciones tecnológicas destacadas",
    description: "Las adquisiciones empresariales más importantes de 2021 hasta ahora.",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    title: "Tendencias de inteligencia artificial",
    description: "Explora cómo la IA está transformando la industria.",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    title: "Ciberseguridad moderna",
    description: "Estrategias clave para proteger tus datos en 2025.",
    image: "https://via.placeholder.com/400x200",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Bienvenido a Nuestra Página</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Home;

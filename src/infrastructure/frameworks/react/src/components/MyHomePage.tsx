import React from "react";
import { ChevronRight, Star, Users, Shield } from "lucide-react";
import Button from "./Button";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TestimonialType {
  name: string;
  role: string;
  content: string;
}

function MyHomePage() {
  const features: Feature[] = [
    {
      title: "Qualité Premium",
      description: "Des motos d'exception conçues avec les meilleurs matériaux",
      icon: <Star className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Communauté",
      description: "Rejoignez une communauté passionnée de motards",
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Sécurité",
      description: "Votre sécurité est notre priorité absolue",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
    },
  ];

  const testimonials: TestimonialType[] = [
    {
      name: "Jean Dupont",
      role: "Motard passionné",
      content:
        "La meilleure expérience moto que j'ai jamais eue. Le service est impeccable.",
    },
    {
      name: "Marie Martin",
      role: "Pilote amateur",
      content: "Des motos d'exception et un service client remarquable.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="my-32 text-4xl md:text-6xl font-bold mb-6">
              Découvrez l'Excellence sur Deux Roues
            </h1>
            <p className="text-xl mb-8">
              Vivez une expérience de conduite unique avec nos motos d'exception
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              Découvrir nos modèles
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi Nous Choisir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Derniers Modèles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={`/api/placeholder/400/300`}
                    alt="Moto"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Modèle {item}</h3>
                <p className="text-gray-600">
                  Description du modèle avec ses caractéristiques principales.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ce Que Nos Clients Disent
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à Rejoindre l'Aventure ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Réservez un essai dès aujourd'hui et découvrez la différence par
            vous-même
          </p>
          <Button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Réserver un essai
          </Button>
        </div>
      </section>
    </div>
  );
}

export default MyHomePage;

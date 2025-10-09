import Image from "next/image";
import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import { notFound } from "next/navigation";
import ConsumptionMethodCard from "./components/consumption-method-card";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <Image
          width={82}
          height={82}
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
        />
        <h1 className="font-semibold">{restaurant?.name}</h1>
        <p>
          Vem com a gente bro, que aqui a comida é topzeira da quebrada tlg
          mermão.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-4">
          <ConsumptionMethodCard
            slug={slug}
            imageAlt="Comer Aqui"
            imageUrl="/dine_in.png"
            buttonText="Comer Aqui"
            option="DINE_IN"
          />
          <ConsumptionMethodCard
            slug={slug}
            imageAlt="Levar pra casa"
            imageUrl="/takeaway.png"
            buttonText="Levar pra casa"
            option="TAKEAWAY"
          />
        </div>
      </div>
    </div>
  );
}

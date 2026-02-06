import { Layers, MapPin, DollarSign, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import type PageProps from "@/PageProps";

const Advantages = ({ id, cardStyling }: PageProps) => {
  const advantagesList = [
    {
      icon: Layers,
      title: "All-in-One Ecosystem",
      description:
        "Multiple business tools integrated seamlessly in one platform.",
    },
    {
      icon: MapPin,
      title: "Local Relevance",
      description:
        "Built specifically for African businesses with WhatsApp and MPESA integration.",
    },
    {
      icon: DollarSign,
      title: "Affordability",
      description:
        "Accessible pricing designed for small and medium-sized businesses.",
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description:
        "Grow your business without worrying about outgrowing your tools.",
    },
  ];

  return (

    <div id={id} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          The Cloudora Advantage
        </h2>
        <p className="text-lg text-muted-foreground">
          Why businesses choose Cloudora
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advantagesList.map((advantage, index) => {
          const Icon = advantage.icon;
          return (
            <Card
              key={index}
              className={`${cardStyling}`}
            >
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Icon className=" text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Advantages;

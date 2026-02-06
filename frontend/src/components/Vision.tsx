import { Book, Compass, Target } from "lucide-react";
import { Card } from "./ui/card";
import type PageProps from "@/PageProps";

const Vision = ({id, cardStyling}: PageProps) => {

  const cards = [
    {
      icon: Target,
      title:"Vision",
      content: `To become Africa's leading provider of smart, 
        accessible, and scalable SaaS solutions that transform 
        how businesses operate and grow.`,
    },
    {
      icon: Compass,
      title:"Mission",
      content: `To simplify business processes through automation, 
        real-time analytics, and practical integrations that make 
        everyday work faster, easier, and more impactful.`,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div id={id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className={`${cardStyling}`}>
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-6 text-white">
                {<Icon/>}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </Card>
          );
        })}
      </div>

      {/* Background & Rationale */}
      <div className="mt-16 max-w-4xl mx-auto">

        <Card className={`${cardStyling} `}>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Background & Rationale
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
            `Cloudora was born from the vision to simplify business processes for
            African entrepreneurs and organizations. We understand the unique
            challenges faced by businesses in our markets — from payment
            processing to communication barriers. That's why we've created a suite
            of smart SaaS tools that integrate seamlessly with WhatsApp and MPESA,
            the platforms you already use and trust. Our goal is to make powerful
            business automation accessible, affordable, and easy to use for every
            business, regardless of size.`
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Vision
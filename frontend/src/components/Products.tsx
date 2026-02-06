import { BookOpen, Box, Calendar, Home, QrCode } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import type PageProps from "@/PageProps";

const Products = ({id, cardStyling, pageView}: PageProps) => {
  const productsList = [
    {
      icon: Calendar,
      title: "Appointment booking system",
      description:
        "Smart scheduling with automated WhatsApp reminders to reduce no-shows and manage staff schedules.",
    },
    {
      icon: QrCode,
      title: "MPESA QR Code Generator",
      description:
        "Generate custom QR codes for seamless mobile payments and faster transactions.",
    },
    {
      icon: BookOpen,
      title: "Learning Management System",
      description:
        "Upload courses, manage assignments, and track student progress with easy analytics.",
    },
    {
      icon: Home,
      title: "Rent Tracking System",
      description:
        "Automate rent collection and reminders via WhatsApp, simplifying property management.",
    },
    {
      icon: Box,
      title: "Inventory Management System",
      description:
        "Real-time inventory tracking and management to optimize stock levels and reduce waste.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div id={id} className=" mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cloudora Products
          </h2>
          <p className="text-lg text-gray-600">
            Powerful tools designed to transform your business operations
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {productsList.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card
                key={index}
                // className="p-4 shadow-lg border-gray-100 hover:-translate-y-1 transition-all duration-300"
                className={`${cardStyling}`}
              >
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.title}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
            <Button
              variant="default"
              className="!bg-orange-500 hover:!bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
              onClick={() => pageView?.("formView")}
            >
              Book Consultation
            </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Products;

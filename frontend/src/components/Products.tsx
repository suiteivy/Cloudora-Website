import type PageProps from "@/PageProps";
import { BookOpen, Box, Calendar, Home, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Products = ({ id, cardStyling }: PageProps) => {
  const productsList = [
    {
      icon: Calendar,
      title: "Appointment booking system",
      href: "https://bookease.cloudora.live/",
      description:
        "Smart scheduling with automated WhatsApp reminders to reduce no-shows and manage staff schedules.",
    },
    {
      icon: QrCode,
      title: "MPESA QR Code Generator",
      href: "https://merchantpro.cloudora.live/",
      description:
        "Generate custom QR codes for seamless mobile payments and faster transactions.",
    },
    {
      icon: BookOpen,
      title: "Learning Management System",
      href: "https://lms.cloudora.live/",
      description:
        "Upload courses, manage assignments, and track student progress with easy analytics.",
    },
    {
      icon: Home,
      title: "Rent Tracking System",
      href: "https://rentease.cloudora.live/",
      description:
        "Automate rent collection and reminders via WhatsApp, simplifying property management.",
    },
    {
      icon: Box,
      title: "Inventory Management System",
      href: "https://stocksense.cloudora.live/",
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
              <Link
                key={index}
                to={product.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <Card className={`${cardStyling} h-full`}>
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
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/book-consultation">
            <Button
              variant="default"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;

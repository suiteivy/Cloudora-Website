import { Building, Glasses, Magnet } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import type PageProps from "@/PageProps";

interface NavigationProps {
  mode: "formView" | "mainView"
  pageView?: (mode: "formView" | "mainView") => void 
}

export const Navigation = ({ mode, pageView }: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "vision", label: "Vision", icon: Glasses },
    { id: "products", label: "Products", icon: Glasses },
    { id: "advantages", label: "Advantages", icon: Magnet },
    { id: "contacts", label: "Contact", icon: Building },
  ];

  const [navShadow, setNavShadow] = useState("");

  function handleScroll() {
    if (window.scrollY > 5) {
      setNavShadow("bg-background/60 bg-opacity-70 backdrop-blur-md shadow-md  ");
    } else {
      setNavShadow("bg-transparent");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 top-0 left-0 right-0 transition-all duration-300
          w-full max-w-none px-4 sm:px-4 lg:px-16 xl:px-20 ${navShadow}`}
      onScroll={handleScroll}
    >
      <div className="w-full max-w-none px-4 sm:px-4 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Button  
              type="button"
              className="flex items-center space-x-2 bg-opacity-100 hover:bg-orange-50"
              onClick={() => pageView?.("mainView")}
            >
              <span className="text-2xl font-bold uppercase hover:opacity-80 text-orange-500 ">
                Cloudora
              </span>
            </Button>
          </div>

          {mode === "mainView" && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      const element = document.getElementById(item.id)
                      element?.scrollIntoView({
                        block: "start", 
                        behavior:"smooth",
                      })
                    }}
                    className={cn(
                      "text-md font-medium transition-colors hover:text-orange-500",
                      isActive ? "bg-orange-500 text-white" : "text-gray-600",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-md">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

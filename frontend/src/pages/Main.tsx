import { Navigation } from "@/components/Navigation"
import Advantages from "@/components/Advantage"
import  Contacts  from "@/components/Contacts"
import Hero from "@/components/Hero"
import Products from "@/components/Products"
import { useState } from "react"
import Vision from "@/components/Vision"
import SessionBook from "./SessionBook"
import { Cloud, Sparkles } from "lucide-react"

const Main = () => {
  const [mode, setMode] = useState<"formView" | "mainView">("mainView")
  const [isLoading, setIsLoading] = useState(false)

  const LoadingView = () => (
    <div className="h-[440px] flex flex-col items-center justify-center">
      <div className="h-12">
        <Cloud className="w-14 h-14 text-orange-500 animate-pulse"/>
      </div>
    </div>
  )

  const DiscountBanner = () => (
    <div className="fixed top-20 left-0 right-0 z-40 overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-4 py-2 text-white shadow-md">
      <div className="pointer-events-none absolute inset-0 banner-glow" />
      <div className="relative max-w-8xl mx-auto banner-enter">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <p className="flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Sparkles className="h-4 w-4" />
            Limited-Time Offer: Get 10% OFF all Cloudora services
          </p>
          {/* <p className="text-xs font-medium sm:text-sm">Use code: CLOUDORA10</p> */}
        </div>
      </div>
    </div>
  )

  const handleSwitch = (newMode: "formView" | "mainView") => {
    setIsLoading(true)
    setTimeout(()=> {
      setMode(newMode)
      setIsLoading(false)
    }, 1200)
  }


  const cardStyling = `p-8 shadow-lg border-gray-100 
  hover:-translate-y-1 transition-all duration-300`

  const components = [
    <Hero />, 
    <Vision id={"vision"} cardStyling={cardStyling} />,
    <Products id={"products"} cardStyling={ cardStyling } pageView={handleSwitch} />, 
    <Advantages id={"advantages"} cardStyling={ cardStyling } />, 
    <Contacts id={"contacts"} cardStyling={ cardStyling } />,
    ]

  const sectionIds = ["hero", "vision", "products", "advantages", "contacts"]

  return (
    <>
      {!isLoading && (
        <Navigation
          mode={mode}
          pageView={handleSwitch}
        />
      )}
      {!isLoading && mode === "mainView" && <DiscountBanner />}
      
      {isLoading ? (
        <LoadingView />
      ) : mode === "mainView" ? (
        <>
          {components.map((component, index) => {
            return (
              <section
                key={sectionIds[index]}
                id={sectionIds[index]}
                className="scroll-mt-10 py-10 px-4 first:pt-32"
              >
                <div className="max-w-8xl mx-auto">{component}</div>
              </section>
            );
          })}
        </>
      ) : (
        <section className="min-h-screen pt-20 px-4">
          <SessionBook pageView={handleSwitch}/>
        </section>
      )}
      {!isLoading && 
        <footer className="bg-orange-500 py-6">
          <div className="max-w-[1600px] mx-auto px-4 text-center">
            <p className="text-white text-lg">
              © Cloudora — Simplifying Work, Amplifying Impact.
            </p>
          </div>
        </footer>
      }
      <style>
        {`
          .banner-enter {
            animation: banner-enter 700ms ease-out;
          }

          .banner-glow {
            background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.28) 50%, transparent 70%);
            transform: translateX(-120%);
            animation: banner-glow 3.5s linear infinite;
          }

          @keyframes banner-enter {
            0% {
              opacity: 0;
              transform: translateY(-8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes banner-glow {
            100% {
              transform: translateX(140%);
            }
          }
        `}
      </style>
    </>
  );
}

export default Main

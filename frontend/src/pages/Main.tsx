import { Navigation } from "@/components/Navigation"
import Advantages from "@/components/Advantage"
import  Contacts  from "@/components/Contacts"
import Hero from "@/components/Hero"
import Products from "@/components/Products"
import { useState } from "react"
import Vision from "@/components/Vision"
import SessionBook from "./SessionBook"
import { Cloud } from "lucide-react"

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
      {!isLoading && <Navigation mode={mode} pageView={handleSwitch} />}
      
      {isLoading ? (
        <LoadingView />
      ) : mode === "mainView" ? (
        components.map((component, index) => {
          return (
            <section
              key={sectionIds[index]}
              id={sectionIds[index]}
              className="scroll-mt-10 py-10 px-4"
            >
              <div className="max-w-8xl mx-auto">{component}</div>
            </section>
          );
        })
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
    </>
  );
}

export default Main
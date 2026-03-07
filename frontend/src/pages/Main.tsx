import Advantages from "@/components/Advantage"
import Contacts from "@/components/Contacts"
import Hero from "@/components/Hero"
import { Navigation } from "@/components/Navigation"
import Products from "@/components/Products"
import Vision from "@/components/Vision"

const Main = () => {
  const cardStyling = `p-8 shadow-lg border-gray-100 
  hover:-translate-y-1 transition-all duration-300`

  const components = [
    <Hero />,
    <Vision id={"vision"} cardStyling={cardStyling} />,
    <Products id={"products"} cardStyling={cardStyling} />,
    <Advantages id={"advantages"} cardStyling={cardStyling} />,
    <Contacts id={"contacts"} cardStyling={cardStyling} />,
  ]

  const sectionIds = ["hero", "vision", "products", "advantages", "contacts"]

  return (
    <>
      <Navigation />
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
      <footer className="bg-orange-500 py-6">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-white text-lg">
            © Cloudora — Simplifying Work, Amplifying Impact.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Main

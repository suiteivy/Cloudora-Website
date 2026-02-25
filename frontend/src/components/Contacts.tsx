import { Mail, Phone, Instagram, Linkedin, Target } from "lucide-react"
import { Card } from "./ui/card"

interface PageProps {
  id: string
  cardStyling: string
}

const Contacts = ({id, cardStyling}: PageProps) => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Contact@cloudoraltd@gmail.com",
      link: "mailto:Contact@cloudoraltd@gamil.com"
    },
    {
      icon: Target,
      label: "Help",
      value: "Support@cloudoraltd@gamil.com",
      link: "mailto:Support@cloudoraltd@gamil.com"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "cloudora.solutions",
      link: "https://instagram.com/cloudora.solutions"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Cloudora Solutions",
      link: "https://linkedin.com/company/cloudora-solutions"
    }
  ]
  
  return (
    <>
        <div id={id} className="max-w-[1600px] mx-auto px-4 min-h-fit mb-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Get in touch with our team
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className={`p-8 ${cardStyling}`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {contact.label}
                        </p>
                        <p className="text-lg font-medium text-foreground">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>
        </div>

    </>
  )
}

export default Contacts
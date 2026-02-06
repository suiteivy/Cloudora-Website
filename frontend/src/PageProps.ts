export default interface PageProps {
  id?: string,
  cardStyling?: string
  pageView?: (mode: "formView" | "mainView") => void
}

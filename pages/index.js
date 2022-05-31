import Layout from '../components/Layout';
import IntroContent from '../components/IntroContent'
import AboutSection from '../components/AboutSection'
import PortfolioPageContent from '../components/PortfolioPageContent'
import ContactForm from '../components/ContactForm'
import MiscPageContent from '../components/MiscPageContent'

export default function Home(){
  return(
    <Layout>
      <IntroContent />
      <MiscPageContent />
      <AboutSection />
      <PortfolioPageContent />
      <ContactForm />
    </Layout>
  )
}
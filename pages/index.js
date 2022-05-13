import Layout from '../components/Layout';
import IntroContent from '../components/IntroContent'
import AboutSection from '../components/AboutSection'
import PortfolioPageContent from '../components/PortfolioPageContent'
import ContactForm from '../components/ContactForm'

export default function Home(){
  return(
    <Layout>
      <IntroContent />
      <AboutSection />
      <PortfolioPageContent />
      <ContactForm />
    </Layout>
  )
}
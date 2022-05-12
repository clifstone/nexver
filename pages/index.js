import Layout from '../components/Layout';
import IntroContent from '../components/IntroContent'
import HomePageContent from '../components/HomePageContent'
import PortfolioPageContent from '../components/PortfolioPageContent'
import ContactForm from '../components/ContactForm'

export default function Home(){
  return(
    <Layout>
      <IntroContent />
      <HomePageContent />
      <PortfolioPageContent />
      <ContactForm />
    </Layout>
  )
}
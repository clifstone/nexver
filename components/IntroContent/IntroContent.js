import { gql, useQuery } from '@apollo/client'
import LoadingScreen from '../LoadingScreen'
import { motion } from "framer-motion"

const GetIntroPageContent = gql`
query IntroSections {
    introSections {
        nodes {
            content
            id
            introSectionId
        }
    }
}
`; 

export default function IntroContent(){
  const { loading, error, data } = useQuery(GetIntroPageContent);

  if (error) return `Error! ${error.message}`;
  if (loading) return (<LoadingScreen />);

  const introsectioncontent = data.introSections.nodes;
  
  return (
    <section className="introsection">
    {
      introsectioncontent.map(thecontent => {
        return(
          <motion.div className="introitem" key={thecontent.introSectionId} dangerouslySetInnerHTML={{__html: thecontent.content}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          >
          </motion.div>
        )
      })
    }
    </section>
  );
}
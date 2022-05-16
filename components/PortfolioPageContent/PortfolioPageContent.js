import { gql, useQuery } from '@apollo/client'
import { motion } from "framer-motion"
import { InView  } from "react-intersection-observer"
import LoadingScreen from '../LoadingScreen'

const GetPortfolioPageContent = gql`
query PPS {
  portfolioSections {
    nodes {
      content
      id
      title
      featuredImage {
        node {
          altText
          srcSet
          title
        }
      }
    }
  }
}
`;

export default function PortfolioPageContent(){
  const { loading, error, data } = useQuery(GetPortfolioPageContent);
  if (loading) return (<LoadingScreen />);
  if (error) return `Error! ${error.message}`;
  const portfoliopagesectioncontent = data.portfolioSections.nodes;

  return (
    <section id="portfoliosection" className="portfoliosection fullsection">
      <div className="wrapper">
        <InView threshold={0}>
          {({ ref, inView }) => (
            <div className="sectionheading">
              <motion.h2
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 0.5, ease: 'backOut' }}>Projects</motion.h2>
              <motion.p
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 1, delay: 0.15, ease: 'backOut' }}>Here are some personal and client projects that I created</motion.p>
            </div>
          )}
        </InView>
        {
          portfoliopagesectioncontent.map(thecontent => {
            return(
              <InView threshold={0} key={thecontent.id}>
              {({ ref, inView }) => (
                <motion.div className='portfolioitem' dangerouslySetInnerHTML={{__html: thecontent.content}}
                ref={ref}
                initial={{ opacity:0, y: 50 }}
                animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
                transition={{ duration: 1, delay: 0.25, ease: 'backOut' }}
                ></motion.div>
              )}
              </InView>
            )
          })
        }
      </div>
    </section>
  );
}
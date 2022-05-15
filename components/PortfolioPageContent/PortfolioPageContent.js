import { gql, useQuery } from '@apollo/client'
import LoadingScreen from '../LoadingScreen'
import { motion } from "framer-motion"

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
        <div className="sectionheading">
          <h2>Projects</h2>
          <p>Here are some personal and client projects that I created</p>
        </div>
        {
          portfoliopagesectioncontent.map(thecontent => {
            return(
              <div className='portfolioitem' key={thecontent.id} dangerouslySetInnerHTML={{__html: thecontent.content}}></div>
            )
          })
        }
      </div>
    </section>
  );
}
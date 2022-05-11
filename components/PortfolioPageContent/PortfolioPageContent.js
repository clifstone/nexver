import { gql, useQuery } from '@apollo/client'

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
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const portfoliopagesectioncontent = data.portfolioSections.nodes;

  return (
    <div className="portfolio">
    {
      portfoliopagesectioncontent.map(thecontent => {
        return(
          <section key={thecontent.id} className='portfoliosection' dangerouslySetInnerHTML={{__html: thecontent.content}}></section>
        )
      })
    }
    </div>
  );
}
import { gql, useQuery } from '@apollo/client'

const GetHomePageContent = gql`
query homepagesections {
  homePageSections {
    nodes {
      content
      id
      homePageSectionId
    }
  }
}
`;

export default function HomePageContent(){
  const { loading, error, data } = useQuery(GetHomePageContent);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const homepagesectioncontent = data.homePageSections.nodes;

  return (
    <section className="aboutsection">
    {
      homepagesectioncontent.map(thecontent => {
        return(
          <div className='aboutitem' key={thecontent.homePageSectionId} dangerouslySetInnerHTML={{__html: thecontent.content}}></div>
        )
      })
    }
    </section>
  );
}
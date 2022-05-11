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
    <div className="homepage">
    {
      homepagesectioncontent.map(thecontent => {
        return(
          <section key={thecontent.homePageSectionId} className='homepagesection' dangerouslySetInnerHTML={{__html: thecontent.content}}></section>
        )
      })
    }
    </div>
  );
}
import { gql, useQuery } from '@apollo/client'

const GetMiscPageContent = gql`
query PPS {
  miscSections {
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

export default function MiscPageContent(){
  const { loading, error, data } = useQuery(GetMiscPageContent);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const miscpagecontent = data.miscSections.nodes;

  return (
    <div className="misc">
    {
      miscpagecontent.map(thecontent => {
        return(
          <section key={thecontent.id} className='portfoliosection miscsection' dangerouslySetInnerHTML={{__html: thecontent.content}}></section>
        )
      })
    }
    </div>
  );
}
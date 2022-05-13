import { gql, useQuery } from '@apollo/client'

const GetAboutSection = gql`
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

export default function AboutSection(){
  const { loading, error, data } = useQuery(GetAboutSection);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const aboutsections = data.homePageSections.nodes;

  return (
    <section className="aboutsection fullsection">
      <div className="wrapper">
        <div className="sectionheading">
          <h2>ABOUT CLIF R.</h2>
          <p>Here, you&rsquo;ll find out more about me, what I do, and my current skills</p>
        </div>
        {
          aboutsections.map(thecontent => {
            return(
              <div className='aboutitem' key={thecontent.homePageSectionId} dangerouslySetInnerHTML={{__html: thecontent.content}}></div>
            )
          })
        }
      </div>
    </section>
  );
}
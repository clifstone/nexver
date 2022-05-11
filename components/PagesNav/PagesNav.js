import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

const GetPageLinks = gql`
  query GetPageLinks {
    menu(id: "Pages", idType: NAME) {
      id
      menuItems {
        edges {
          node {
            id
            label
            path
            url
          }
        }
      }
    }
  }
`;

export default function PagesNav(){

  const { loading, error, data } = useQuery(GetPageLinks);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function closemen(){
    window.document.body.classList.remove('showmen');
  }
  
  return (
    <nav className="pagesmenu">
      <ul>
        {
          data.menu.menuItems.edges.map(page => {
            return(
              <li key={page.node.id} onClick={closemen}>
                <Link href={`${page.node.path}`} >{page.node.label}</Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}
import { gql, useQuery } from '@apollo/client'
import { motion } from "framer-motion"
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

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  const closemen = () => {
    window.document.body.classList.remove('showmen');
    window.history.replaceState(null, null, ' ');
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: -100 },
    show: { y: 0 },
    transition: { duration: 1 }
  }
  
  return (
    <nav className="pagesmenu">
      <motion.ul variants={container} initial="hidden" animate="show">
        {
          data.menu.menuItems.edges.map(page => {
            return(
              <motion.li key={page.node.id} onClick={closemen} variants={item}>
                <Link href={`${page.node.path}`} >{page.node.label}</Link>
              </motion.li>
            )
          })
        }
      </motion.ul>
    </nav>
  );
}
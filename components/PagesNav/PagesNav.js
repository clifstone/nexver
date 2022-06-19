import { useQuery } from '@apollo/client'
import { motion } from "framer-motion"
import { GET_PAGES_MENU } from '../../data/queries'
import RippleButton from '../RippleButton'

const getPagesMenu = GET_PAGES_MENU;

export default function PagesNav(){

  const { loading, error, data } = useQuery(getPagesMenu);

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
      <motion.ul className="pagesmenu__list" variants={container} initial="hidden" animate="show">
        {
          data.menu.menuItems.edges.map(page => {
            return(
              <motion.li className="pagesmenu__list-item ripplebtn" key={page.node.id} onClick={closemen} variants={item}>
                <RippleButton url={`${page.node.path}`} label={`${page.node.label}`} />
              </motion.li> 
            )
          })
        }
      </motion.ul>
    </nav>
  );
}
import { gql, useQuery } from '@apollo/client'
import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import MenBtn from '../MenBtn'
import Sidebar from '../Sidebar'

const GetLogos = gql`
  query GetLogos {
    theme(id: "dGhlbWU6bmV4dA==") {
      mobileLogoOption
      logoOption
    }
  }
`;

export default function Header(){
  const { loading, error, data } = useQuery(GetLogos);

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  let smlogo = data.theme.mobileLogoOption;
  return (
    <header className="siteheader">
      <div className="wrapper">
        <div className="headercontent">
          <motion.div className="sitelogo" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.25, ease:'backOut' }}>
            <Link href="/">
              <a><Image src={smlogo} alt="" width={800} height={256} /></a>
            </Link>
          </motion.div>
        </div>
        <MenBtn />
      </div>
      <Sidebar />
    </header>
  );
} 
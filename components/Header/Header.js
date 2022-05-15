import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from "framer-motion"
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

  let lglogo = data.theme.logoOption;
  let smlogo = data.theme.mobileLogoOption;

  return (
    <>
    <motion.header className="siteheader" initial={{ y: -100, opacity:0 }} animate={{ y: 0, opacity:1 }} transition={{ duration: 1, ease: "backOut" }}>
      <div className="wrapper">
        <div className="headercontent">
          <div className="sitelogo">
            <Link href="/">
              <a><Image src={smlogo} alt="" width={800} height={256} /></a>
            </Link>
          </div>
        </div>
        <MenBtn />
      </div>
      <Sidebar />
    </motion.header>
    </>
  );
}
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'

const GetLogos = gql`
  query GetLogos {
    theme(id: "dGhlbWU6bmV4dA==") {
      mobileLogoOption
      logoOption
    }
  }
`;

export default function SiteLogo(){

  const { loading, error, data } = useQuery(GetLogos);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  let lglogo = data.theme.logoOption;
  let smlogo = data.theme.mobileLogoOption;
  
  return (
    <div className="sitelogo">
      <Link href="/">
        <a><Image src={smlogo} alt="" width={800} height={256} /></a>
      </Link>
    </div>
  );
}
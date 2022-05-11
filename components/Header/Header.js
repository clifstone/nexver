import MenBtn from '../MenBtn'
import SiteLogo from '../SiteLogo'
import Sidebar from '../Sidebar'

export default function Header(){   
  return (
    <>
    <header className="siteheader">
      <div className="wrapper">
        <div className="headercontent">
          <SiteLogo />
        </div>
        <MenBtn />
      </div>
      <Sidebar />
    </header>
    </>
  );
}
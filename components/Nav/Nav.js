import Link from 'next/link'

export default function Nav( {navarr} ){
  
    return (
      <nav className="navi">
        <ul>
          {
            navarr.map(page => {
              var navarrpath = page.node.path,
                navpath = navarrpath.replace( new RegExp('/k/'), '/');
              return(
                <li key={page.node.id}>
                  <Link href={`${navpath}`}>{page.node.label}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    );
  }
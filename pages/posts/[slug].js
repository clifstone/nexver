export default function Page( data ){

    const post = data.post;
    
    const closeWindow = () => {
        window.open(location.href, "_self", "");
        window.close()
    }

    return (
        <div className="posrel">
            <div className='blogpage' dangerouslySetInnerHTML={{__html: post.content}}></div>
            <div className="clickanywhere">Click anywhere to close</div>
            <div className="winoverlay" onClick={closeWindow}></div>
            <style jsx global>{`
                .siteheader {
                display:none;
                }
            `}</style>
        </div>
    )

}

export async function getStaticProps(context) {

    const res = await fetch('https://kip.cat/mcwp/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query PageQuery($id: ID!) {
                page(id: $id, idType: URI)   {
                  title
                  slug
                  content
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            `,
            variables: {
                id: context.params.slug,
                idType: 'SLUG'
            }
        })
    })

    const json = await res.json()
    return {
        props: {
            post: json.data.page,
        },
    }

}

export async function getStaticPaths() {

    const res = await fetch('https://www.kip.cat/mcwp/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query AllPagesQuery {
                pages(first:1000) {
                    nodes {
                        slug
                        content
                        title
                        featuredImage {
                            node {
                                sourceUrl
                                altText
                            }
                        }
                    }
                }
            }
        `})
    })

    const json = await res.json()
    const pages = json.data.pages.nodes;

    const paths = pages.map((page) => ({
        params: { slug: page.slug },
    }))

    return { paths, fallback: false }

}
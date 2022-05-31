import { useRouter } from "next/router"

export default function Page( data ){

    const post = data.post;
    
    const router = useRouter();

    return (
        <div className="posrel">
            <div className='blogpage' dangerouslySetInnerHTML={{__html: post.content}}></div>
            <button onClick={() => router.back()}>Back</button>
        </div>
    )

}

export async function getStaticProps(ctx) {

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
                id: ctx.params.slug,
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
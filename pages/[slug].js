import { useRouter } from 'next/router'
import { StandaloneClient } from '../data/StandaloneClient'
import { ALLPAGES_SLUGS, PAGES_CONTENT } from '../data/queries'

const client = StandaloneClient;
const getPaths = ALLPAGES_SLUGS;
const getContent = PAGES_CONTENT;

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

export const getStaticProps = async (ctx) => {
    const { data } = await client.query({query: getContent,  variables: { id: ctx.params.slug, idType: 'SLUG' }  });

    return {
        props: {
            post: data.page,
        },
    }
};

export const getStaticPaths = async () => {
    const { data } = await client.query({query: getPaths}).then((res) => {
        console.log(res)
        return res
    }).catch((err) => {
        console.log(err, "error on your side")
        return err
    });
    const pages = data.pages.nodes;
    const paths = pages.map((page) => ({
        params: { slug: page.slug },
    }))

    return { paths, fallback: false }
};
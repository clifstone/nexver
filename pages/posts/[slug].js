import { useRouter } from 'next/router'
import { StandaloneClient } from '../../data/StandaloneClient'
import { ALLPOSTS_SLUGS, POST_CONTENT } from '../../data/queries'

const client = StandaloneClient;
const getPaths = ALLPOSTS_SLUGS;
const getContent = POST_CONTENT;

export default function Post( data ){
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
            post: data.post,
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
    const posts = data.posts.nodes;
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }
};
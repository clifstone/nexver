import { getPostsByCategory } from '../../lib/api';
import Link from 'next/link'
import ArticleCard from '../ArticleCard'

export default function PostByCategoryList( {postarr} ){
  return (
    <div className="post-list">
      {
        postarr.nodes.map(post => {
          return(
            <Link key={post.slug} href={`/posts/${post.slug}`}>{post.slug}</Link>
          )
        })
      }
    </div>
  );
}
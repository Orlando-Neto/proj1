import Head from '../components/Head'
import Corpo from '../components/Corpo'
import prisma from '../lib/prisma'

export const getServerSideProps = async ({ req }) => {

  const posts = await prisma.post.findMany()
  return { props: { posts } }
}

// Display list of posts (in /pages/index.tsx)
export default function Home({posts}) {
  
  return (
    <>
      <Head>

      </Head>

      <Corpo>
        <ul> 
          {posts.map(post => (
            <li key={post.id}>{post.id} - {post.title}</li>
            )
          )}
        </ul>
      </Corpo>
    </>
  )
}
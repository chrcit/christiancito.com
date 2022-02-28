import { gql } from '@apollo/client'
import Layout from 'components/Layout'
import { client, Renderer } from 'lib/keystone'
import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = ({posts}: {posts: any}) => {
  return (<>
    <Layout>

      <div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <h1>
              <Link href={`/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h1>
            <p>{post.tags.map((tag: any) => tag.name).join(', ')}</p>
          </div>
        ))}
      </div>

    </Layout>
  </>)
}

export async function getStaticProps({ params }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
  const result = await client.query({
      query: gql`
          query GetPosts {
              posts {
                  id
                  title
                  status
                  slug
                  content {
                      document(hydrateRelationships: true)
                  }
                  tags {
                      name
                  }
              }
          }
      `
  })

  const data = result.data.posts;

  return {
      props: {
          posts: data
      }
  }
}

export default Home

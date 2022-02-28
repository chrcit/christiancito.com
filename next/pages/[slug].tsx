import { gql } from "@apollo/client";
import Layout from "components/Layout";
import { client, Renderer } from "lib/keystone";
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

export default function PostPage({post}: {post: any}) {
    return (<>
        <Layout>
            <article className="flex flex-col">
                <header>
                    <h1 className="text-5xl">{post.title}</h1>
                    <ul>
                        {post.tags.map((tag: any) => (
                            <li key={tag.id}>{tag.name}</li>
                        ))}
                    </ul>
                </header>
                <section>
                    <Renderer document={post.content.document} />
                </section>
            </article>
        </Layout>
    </>);
}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const result = await client.query({
        query: gql`
            query GetPostSlugs {
                posts {
                    slug
                }
            }
        `
    })

    const paths = result.data.posts.map((post: any) => {
        return {params: {slug: post?.slug}}
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const result = await client.query({
        query: gql`
            query GetPost($unique: PostWhereUniqueInput!) {
                post(where: $unique) {
                    id
                    title
                    status
                    content {
                        document(hydrateRelationships: true)
                    }
                    tags {
                        id
                        name
                    }
                }
            }
        `,
        variables: {
            unique: {"slug": params?.slug}
        }
    });

    return {
        props: {
            post: result?.data?.post
        }
    }
}
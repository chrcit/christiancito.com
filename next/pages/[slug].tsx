import { gql } from "@apollo/client";
import { client, Renderer } from "lib/keystone";
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

export default function PostPage({post}: {post: any}) {

    return (<>
        <h1>Post Page</h1>
        <Renderer document={post.content.document} />
        <p>{post.tags.map((tag: any) => tag.name).join(', ')}</p>
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
                        name
                    }
                }
            }
        `,
        variables: {
            unique: {"slug": params?.slug}
        }
    });

    console.log(result)

    return {
        props: {
            post: result?.data?.post
        }
    }
}
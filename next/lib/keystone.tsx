import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import Link from 'next/link';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/api/graphql`;

export const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache()
});

const renderers: DocumentRendererProps['renderers'] = {
    // use your editor's autocomplete to see what other renderers you can override
    inline: {
      relationship: ({relationship, data}) => {
          if (relationship === 'post') {
              console.log(data)
              if (data === null || data.data === undefined) {
                  return <span>[unknown post]</span>;
                } else {
                    return <Link href={`/${data.data.slug}`}>{data.data.title}</Link>;
                }
            }
  
            return null;
        }
    },
};
  
  export const Renderer = ({document}: any) => {
    return <DocumentRenderer renderers={renderers} document={document} />;
  }
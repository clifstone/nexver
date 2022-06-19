import { gql } from '@apollo/client';

export const GetAboutSection = gql `
    query homepagesections {
    homePageSections {
        nodes {
        content
        id
        homePageSectionId
        }
    }
    }
`;

export const ALLPAGES_SLUGS = gql `

query AllPagesQuery {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }

`;

export const PAGES_CONTENT = gql `

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

`;

export const ALLPOSTS_SLUGS = gql `

query GetPostsBySlug {
    posts {
      nodes {
        slug
      }
    }
  }

`;

export const POST_CONTENT = gql `

query PostQuery($id: ID!) {
    post(id: $id, idType: URI)   {
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

`;

export const GET_PAGES_MENU = gql `
  query GetPageLinks {
    menu(id: "Pages", idType: NAME) {
      id
      menuItems {
        edges {
          node {
            id
            label
            path
            url
          }
        }
      }
    }
  }
`;
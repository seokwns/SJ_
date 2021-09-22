module.exports = {
  siteMetadata: {
    title: "SJ_",
    author: "Seokjun Moon",
    description: "This blog is powered by Gatsby",
    siteUrl: "https://seokjun.gatsbyjs.io/",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog`,
      },
      __key: "blog",
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://seokjun.gatsbyjs.io/",
        sitemap: "https://seokjun.gatsbyjs.io/sitemap.xml",
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
  ],
  flags: {
    DEV_SSR: false
 }
};

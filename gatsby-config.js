module.exports = {
  siteMetadata: {
    title: "SJ_",
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
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
  ],
  flags: {
    DEV_SSR: false
 }
};

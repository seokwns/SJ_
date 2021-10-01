module.exports = {
  siteMetadata: {
    title: "SJ_",
    author: "Seokjun Moon",
    description: "This blog is powered by Gatsby",
    siteUrl: "https://seokjun.gatsbyjs.io",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
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
        name: "post-files",
        path: `${__dirname}/posts`,
      },
      __key: "posts",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog-images",
        path: `${__dirname}/posts/post-images`,
      },
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
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
            "gatsby-remark-line-breaks",
            "gatsby-remark-prismjs",
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'material icons',
          'Noto+Sans+KR\:100, 200, 300, 400, 500, 600, 700, 800, 900',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
          shortname: `seokjun-gatsbyjs-io`
      }
    },
  ],
  flags: {
    DEV_SSR: false
 }
};

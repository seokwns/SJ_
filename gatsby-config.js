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
        sitemap: "https://seokjun.gatsbyjs.io/sitemap/sitemap-0.xml",
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          "gatsby-remark-embed-video",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-line-breaks",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
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
            {
              resolve: "gatsby-remark-embed-video",
              options: {
                ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                height: 400, // Optional: Overrides optional.ratio
                related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
                loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
                urlOverrides: [
                  {
                    id: "youtube",
                    embedURL: videoId =>
                      `https://www.youtube-nocookie.com/embed/${videoId}`,
                  },
                ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
                containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
                iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
              },
            },
            "gatsby-remark-responsive-iframe",
            "gatsby-remark-line-breaks",
            "gatsby-remark-prismjs",
            "gatsby-remark-images",
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'material icons',
          'Noto+Sans+KR\:100, 300, 400, 500, 700, 900',
          'Nanum+Gothic\:400, 700, 800',
          'Raleway\:100, 200, 300, 400, 500, 600, 700, 800, 900',
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

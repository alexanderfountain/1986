require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const linkResolver = require("./src/utils/linkResolver");

module.exports = {
  siteMetadata: {
    title: `1986`,
    description: `The original color changing masks.`,
    author: `Alexander FOuntain`,
    siteUrl: `https://1986.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://1986.io",
        sitemap: "https://1986.io/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true;
        },
        linkResolver: ({ node, key, value }) => (doc) => {
          // Your link resolver
          if (doc.type === "product") {
            return "/" + doc.uid;
          }
          if (doc.type === "pa") {
            return "/" + doc.uid;
          }
          // Homepage route fallback
          return "/";
        },
        // PrismJS highlighting for labels and slices
        repositoryName: `1986`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          pa: require("./src/schemas/page.json"),
          product: require("./src/schemas/product.json"),
          site_information: require("./src/schemas/site_information.json"),
          blocks: require("./src/schemas/blocks.json"),
          block: require("./src/schemas/block.json"),
        },
        prismicToolbar: false,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: '@import "variables.scss"; @import "mixins.scss";',
        includePaths: ["src/components/scss"],
      },
    },
    {
      resolve: `gatsby-theme-shopify-manager`,
      options: {
        shopName: "19-86",
        accessToken: "ea3f72385a09fa80335785e41a2d8993",
      },
    },
    `gatsby-plugin-netlify-headers`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prescriptive`,
        short_name: `Prescriptive`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/1986faviconwhite.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        version: "1.0",

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false,
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: "GTM-KWP5GHG",

    //     // Include GTM in development.
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: true,

    //     // Specify optional GTM environment details.
    //     // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
    //     // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`chivo\:400,400i,700`, `Roboto\:500,600,700`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allPrismicPa {
              nodes {
                uid
              }
            }
        }`,
        resolveSiteUrl: ({ site, allSitePage }) => {
          //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ site, allPrismicPa }) => {
          let pages = [];
          allPrismicPa.nodes.map((edge) => {
            pages.push({
              url: `${site.siteMetadata.siteUrl}/${edge.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            });
          });
          return pages;
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-135446148-1", // Google Analytics / GA
        ],
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1313519648993511",
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K566PM2",
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
};

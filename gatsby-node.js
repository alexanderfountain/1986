const path = require("path")
const { TRUE } = require("node-sass")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      page: allPrismicPa {
        nodes {
          uid
          data {
            webinar
          }
        }
      }
      product: allPrismicProduct {
        nodes {
          uid
          data {
            sku {
              text
            }
          }
        }
      }
    }
  `)
  const pageTemplateProduct = path.resolve("src/templates/product.js")
  pages.data.product.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: pageTemplateProduct,
      context: {
        uid: node.uid,
        sku: node.data.sku[0].text,
      },
    })
  })
  const pageTemplate = path.resolve("src/templates/page.js")
  pages.data.page.nodes.forEach(node => {
    if (node.uid == "home") {
      createPage({
        path: `/`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      })
    }
      else {
      createPage({
        path: `/${node.uid}`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      })
    }
  })
}
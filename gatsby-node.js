const path = require("path");
const { TRUE } = require("node-sass");
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
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
      shopify: allShopifyProduct {
        nodes {
          shopifyId
          title
        }
      }
    }
  `);
  const pageTemplateProduct = path.resolve("src/templates/product.js");
  pages.data.shopify.nodes.forEach((node) => {
    const path = string_to_slug(node.title);
    createPage({
      path: `/${path}`,
      component: pageTemplateProduct,
      context: {
        shopifyId: node.shopifyId,
      },
    });
  });
  const pageTemplate = path.resolve("src/templates/page.js");
  pages.data.page.nodes.forEach((node) => {
    if (node.uid == "home") {
      createPage({
        path: `/`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      });
    } else {
      createPage({
        path: `/${node.uid}`,
        component: pageTemplate,
        context: {
          uid: node.uid,
        },
      });
    }
  });
};

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

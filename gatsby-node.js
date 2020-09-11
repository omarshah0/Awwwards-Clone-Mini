exports.createPages = ({ actions: { createPage } }) => {
  const products = require("./src/data/products.json")
  products.forEach(product => {
    createPage({
      path: `/products/${product.id}/`,
      component: require.resolve("./src/templates/product.js"),
      context: product,
    })
  })
}

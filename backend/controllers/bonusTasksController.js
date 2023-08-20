// ● Implement search functionality for products.
// ● Implement pagination for retrieving a list of products.
// ● Implement filtering and sorting options for retrieving products.

// ... (previous code)

// Implement search functionality for products
const Products = require("../models/ProductModel");

// Search functionality
const search = async (req, res) => {
  const searchTerm = { $text: { $search: req.body } };
  const products = await Products.find({ searchTerm });
  // throw new Error("Some Eror");
  res.json(products);
};

// Pagination, filtering, and sorting
// app.get('/products/list', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 10;
//   const sortBy = req.query.sortBy || 'id';
//   const sortOrder = req.query.sortOrder || 'asc';
//   const categoryFilter = req.query.category || '';

//   let filteredProducts = products;

//   // Apply category filter
//   if (categoryFilter) {
//     filteredProducts = filteredProducts.filter(product =>
//       product.category.toLowerCase() === categoryFilter.toLowerCase()
//     );
//   }

//   // Sort products
//   filteredProducts.sort((a, b) => {
//     const aValue = a[sortBy];
//     const bValue = b[sortBy];
//     if (sortOrder === 'asc') {
//       return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
//     } else {
//       return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
//     }
//   });

//   // Paginate products
//   const startIndex = (page - 1) * pageSize;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

//   res.json(paginatedProducts);
// });

module.exports = { search };

// helper functions
export function featuredProducts(arr) {
  return arr.filter(item => item.featured === true);
}

// flatten

export function flattenProducts(data) {
  return data.map(item => {
    // cloudinary
    const image = (item.image && item.image.url) || null;
    return { ...item, image };
  });
}

export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProducts;
}

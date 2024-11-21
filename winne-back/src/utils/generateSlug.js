const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const createUniqueSlug = async (baseSlug) => {
  let uniqueSlug = generateSlug(baseSlug);
  let slugExists = await Product.findOne({ slug: uniqueSlug });

  while (slugExists) {
    uniqueSlug = `${uniqueSlug}-${Math.floor(Math.random() * 1000)}`;
    slugExists = await Product.findOne({ slug: uniqueSlug });
  }

  return uniqueSlug;
};

module.exports = {
  generateSlug,
  createUniqueSlug,
};

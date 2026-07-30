// Fetch latest products from our actual backend
export const fetchProducts = async (ids = []) => {
  try {
    let url = "/api/products?status=active";
    if (ids && ids.length > 0) {
      url += `&ids=${ids.join(",")}`;
    } else {
      url += "&sort=bestselling&limit=6";
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.data?.products || [];
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
};

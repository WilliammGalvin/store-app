import axios from "axios";
import ShopView from "./components/shop_view";
import type { ShopItem } from "./components/shop_view";
import NavBar from "./components/nav_bar";
import { useEffect, useState } from "react";
import CategorySelect from "./components/category_select";

function App() {
  const [productData, setProductData] = useState<ShopItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchProductsData = async () => {
    const url = "https://fakestoreapi.com/products";
    const response = await axios.get(url);
    return response.data as ShopItem[];
  };

  const fetchCategoriesData = async () => {
    const url = "https://fakestoreapi.com/products/categories";
    const response = await axios.get(url);
    return response.data as string[];
  };

  const sortProductsByCategory = async (category: string) => {
    setLoading(true);
    setSelectedCategory(category);

    var data: ShopItem[] = [];

    if (category === "all") {
      await fetchProductsData().then((res) => {
        data = res;
      });
    } else {
      const url = `https://fakestoreapi.com/products/category/${category}`;
      await axios.get(url).then((res) => {
        data = res.data as ShopItem[];
      });
    }

    setProductData(data);
    setLoading(false);
  };

  const fetchAllData = async () => {
    await fetchCategoriesData().then((res) => {
      setCategories(res);
    });

    sortProductsByCategory(selectedCategory);
  };

  const isCategorySelected = (category: string) => {
    return category === selectedCategory;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />

      <section className="flex justify-center my-4">
        <CategorySelect
          categories={categories}
          sortByCategory={sortProductsByCategory}
          isCategorySelected={isCategorySelected}
        />
      </section>

      <section className="bg-gray-100 py-6 flex-1">
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <ShopView data={productData} />
        )}
      </section>
    </div>
  );
}

export default App;

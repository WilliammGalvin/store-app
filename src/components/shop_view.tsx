export type ShopItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

function ProductCard({ item }: { item: ShopItem }) {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center bg-white w-full h-[25vh] p-8 rounded-lg mb-3">
        <img className="w-auto h-auto" src={item.image} alt={item.title} />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between gap-x-4">
          <p>{item.title}</p>
          <p className="font-semibold">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex gap-x-2">
          <p>⭐️ {item.rating.rate}</p>
          <p>({item.rating.count})</p>
        </div>
      </div>
    </div>
  );
}

export default function ShopView({ data }: { data: ShopItem[] }) {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-4 w-5/6 gap-12">
        {data.map((item: ShopItem) => (
          <li key={item.id}>
            <ProductCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CategorySelect({
  categories,
  sortByCategory,
  isCategorySelected,
}: {
  categories: string[];
  sortByCategory: (category: string) => void;
  isCategorySelected: (category: string) => boolean;
}) {
  const capitalizeCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="inline-block">
      <ul className="flex gap-x-4 text-lg">
        {["all", ...categories].map((category: string) => (
          <li
            key={category}
            className={`rounded-lg px-4 py-2 shadow ${
              isCategorySelected(category) ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => sortByCategory(category)}
          >
            {capitalizeCategory(category)}
          </li>
        ))}
      </ul>
    </div>
  );
}

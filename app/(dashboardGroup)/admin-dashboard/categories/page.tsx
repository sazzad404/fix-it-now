import { getCategories } from "../_action/getCategories";
import CategoryManagement from "./_components/CategoryManagement";


const CategoriesPage = async () => {
  const result = await getCategories();

  return (
    <CategoryManagement
      categories={result.success ? result.data : []}
    />
  );
};

export default CategoriesPage;
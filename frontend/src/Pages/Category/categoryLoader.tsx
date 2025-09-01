import type { LoaderFunctionArgs } from "react-router";
import { getPaginatedCategory } from "../../Api/CategoryController";

export async function categoryLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  console.log(id);
  
  const res = await getPaginatedCategory(Number(id), 1, 15);
  console.log(res);
  return res;
}
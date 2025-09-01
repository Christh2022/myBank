import type { ActionFunctionArgs } from "react-router";

export async function categoryAction({ request }: ActionFunctionArgs) {
     const formData = await request.formData();
    console.log(formData);
    
}
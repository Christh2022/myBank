import type { ActionFunctionArgs } from "react-router";

export async function categoryAction({ request }: ActionFunctionArgs) {
     const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
}
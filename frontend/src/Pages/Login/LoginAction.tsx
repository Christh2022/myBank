import { redirect, type ActionFunctionArgs } from "react-router";
import { LoginUser } from "../../Api/Auth";

export async function loginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== 'string' || typeof password !== 'string') {
        return { message: 'Email et mot de passe requis.' };
    }

    try {
        await LoginUser(email, password);
        return redirect("/home");
    } catch (err) {
        let message = "Échec de connexion";
        if (err && typeof err === "object" && "message" in err) {
            message = String((err as { message?: string }).message);
        }
        return { message };
    }
  
}
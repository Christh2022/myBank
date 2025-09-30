import { getTransactions } from "../../Api/ExpenseController";

export async function expenseLoader() {
    const data = await getTransactions();
    return data.map((item: {
        id: number;
        date: string;
        amount: string;
        label: string;
        category: { title: string };
        status: string;
    }) => ({
        id: item.id,
        date: new Date(item.date).toLocaleString('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }),
        amount: `€${parseFloat(item.amount).toFixed(2)}`,
        payement_name: item.label,
        method: 'Visa "3456',
        category: item.category.title,
        status: item.status ,
        option: '...',
    }));
}

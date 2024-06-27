import { supabase } from '../../../../supabase';
import { Item } from '../../../../types'; 

export const fetchIngredients = async (userId: string): Promise<Item[]> => {
    const { data, error } = await supabase
        .from('item')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching ingredients:', error);
        return [];
    }

    return data as Item[];
};

export const addIngredient = async (ingredient: Omit<Item, 'item_id'>) => {
    const { data, error } = await supabase
        .from('item')
        .insert([ingredient]);

    if (error) {
        console.error('Error adding ingredient:', error);
        return null;
    }

    return data as Item[];
};

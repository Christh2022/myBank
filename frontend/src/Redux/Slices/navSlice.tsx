import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
// Importe la fonction createSlice pour créer un slice Redux, et PayloadAction pour typer les actions.

interface NavState {
  visible: boolean;
  navigate: boolean;
}
// Déclare l'interface du state du slice : ici, un booléen "visible" pour afficher ou cacher le nav.

const initialState: NavState = {
  visible: false,
  navigate: false
};
// Définit l'état initial du nav : visible par défaut.

const navSlice = createSlice({
    name: 'nav',
    // Nom du slice, utilisé dans les actions et le store.
    initialState,
    // L'état initial défini plus haut.
    reducers: {
        setNavVisible(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        // Action pour définir explicitement la visibilité du nav (true ou false).
        toggleNav(state) {
            state.visible = !state.visible;
        },
        
      setNavigate(state, action: PayloadAction<boolean>) {
          state.navigate = action.payload
        }
    },
});
// Crée le slice avec ses reducers et actions.

export const { setNavVisible, toggleNav, setNavigate } = navSlice.actions;
// Exporte les actions générées pour pouvoir les utiliser dans tes composants.
export const visible = (state: RootState) => state.nav.visible
export const navigate = (state: RootState) => state.nav.navigate

export default navSlice.reducer;
// Exporte le reducer pour l'ajouter au store Redux.
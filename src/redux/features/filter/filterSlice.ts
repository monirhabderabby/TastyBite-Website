import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    menu: string;
    min: number;
    max: number;
    searchTerm: string;
}

const initialState: FilterState = {
    menu: "",
    min: 0,
    max: 200,
    searchTerm: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setMenu(state, action: PayloadAction<string>) {
            state.menu = action.payload;
        },
        setMin(state, action: PayloadAction<number>) {
            state.min = action.payload;
        },
        setMax(state, action: PayloadAction<number>) {
            state.max = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
    },
});

export const { setMenu, setMin, setMax, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;

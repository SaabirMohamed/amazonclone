import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  groupsCounts: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //find the item 1st returns a number greater than or equal to zero is found (only 1 find not all)
      const targetItemIndex = state.items.findIndex(
        (idx) => idx.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (targetItemIndex >= 0) {
        // found 1
        newBasket.splice(targetItemIndex, 1);
      }
      state.items = newBasket; // mutated if found ...returns the state
    },
    updateBasket: (state, action) => {
      // expects field name and value and id to be passed
      // example dispatch(updateBasket({targetField, newFieldValue, id}))
      // or
      // dispatch(updateBasket({price, 10.0, id}))
      let targetField = action.payload.targetField;
      let newFieldValue = action.payload.newFieldValue;
      const index = state.items.findIndex(
        (item) => item.id !== action.payload.id
      ); //finding index of the item
      let newArray = [...state.items]; //making a new array

      if (targetField && newFieldValue && index >= 0) {
        // found a mactching item to edit
        newArray[index].targetField = newFieldValue; // thats targetted field
        state.items = newArray;
      }
    },
    findGroupTotals: (state, action) => {
      // create an array with how many times each of the same product appears based on ID field
      var groupsCounts = state.items.reduce((a, b) => {
        var i = a.findIndex((x) => x.id === b.id);
        return i === -1 ? a.push({ id: b.id, times: 1 }) : a[i].times++, a;
      }, []);
      // assign that array to state
      state.groupsCounts = groupsCounts;
      // loop through the items in state and assign a total_price field.
      state.items.forEach((element) => {
        if (element.id === state.groupsCounts.id) {
          element[state.groupsCounts.id].total_price =
            element.price * groupsCounts.times;
        }
      });
    },
  },
});

export const { addToBasket, removeFromBasket, updateBasket } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

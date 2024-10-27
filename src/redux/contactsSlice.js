// import { createSlice } from "@reduxjs/toolkit";
// import { fetchContacts } from "./contactsOps";

// import { loadContactList } from "../data/contactList";
// const initialState = {
//   items: loadContactList(),
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {
//     addContact: (state, action) => {
//       state.items.push(action.payload);
//     },
//     deleteContact: (state, action) => {
//       state.items = state.items.filter(
//         (contact) => contact.id !== action.payload
//       );
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const selectContacts = (state) => state.contacts.items;
// export default contactsSlice.reducer;

// src/redux/tasksSlice.js

// src/redux/tasksSlice.js

// src/redux/tasksSlice.js

// import { createSlice } from "@reduxjs/toolkit";
// // Імпортуємо операцію
// import { fetchTasks } from "./operations";

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   }, // Додаємо обробку зовнішніх екшенів
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, (state, action) => {})
//       .addCase(fetchContacts.fulfilled, (state, action) => {})
//       .addCase(fetchContacts.rejected, (state, action) => { });
//     //
//      .addCase(addContact.pending, (state, action) => {})
//       .addCase(addContact.fulfilled, (state, action) => {})
//     .addCase(addContact.rejected, (state, action) => { });
//   //
//    .addCase(deleteContact.pending, (state, action) => {})
//       .addCase(deleteContact.fulfilled, (state, action) => {})
//       .addCase(deleteContact.rejected, (state, action) => {});
//   },
// });

// export const tasksReducer = tasksSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

const contactsPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const contactsRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        contactsPending(state);
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        contactsRejected(state, action);
      })

      .addCase(addContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
   
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        contactsRejected(state, action);
      })
      .addCase(deleteContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
       
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload
        );
      

        state.items.splice(index, 1);
      
      })
      .addCase(deleteContact.rejected, (state, action) => {
        contactsRejected(state, action);
      });
  },
});

export const selectHasError = (state) => state.contacts.hasError;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectContacts = createSelector(
  [(state) => state.contacts.items, selectNameFilter],
  (contacts, query) =>
    contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    )
);

export const contactsReducer = contactsSlice.reducer;


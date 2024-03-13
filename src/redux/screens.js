import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  id: null,
  name: null,
  nestedComponents: []
}

export const currentScreen = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startLoading: (state, value) => {
      state.loading = true;
    },
    endLoading: (state, value) => {
      state.loading = false;
    },
    setCurrentScreen: (state, value) => {
      state.nestedComponents = value.payload.nestedComponents;
      state.id = value.payload.id;
      state.name = value.payload.name;
      state.loading = false;
    },
    insertBefore: (state, value) => {
      let index = state.nestedComponents.findIndex(widget => widget.id === value.payload.parent_id);

      // if parent widget is not found or payload is empty
      if (!value.payload.widget || index === -1) {
        return;
      }

      if (Array.isArray(value.payload.widget)) {
        value.payload.widget.reverse().forEach(item => {
          state.nestedComponents.splice(index, 0, item);
        });
      } else {
        let index = state.nestedComponents.findIndex(widget => widget.id === value.payload.widget.id);

        // if widget is already in place
        if (index !== -1) {
          return;
        }

        state.nestedComponents.splice(index, 0, value.payload.widget);
      }
    },
    insertAfter: (state, value) => {
      const parentIndex = state.nestedComponents.findIndex(widget => widget.id === value.payload.parent_id);

      // Перевіряємо, чи знайдено батьківський віджет або чи не є payload порожнім
      if (parentIndex === -1 || !value.payload.widget) {
        return;
      }

      if (Array.isArray(value.payload.widget)) {
        // Якщо віджет - масив
        value.payload.widget.reverse().forEach(item => {
          state.nestedComponents.splice(parentIndex + 1, 0, item);
        });
      } else {
        // Якщо віджет - не масив
        const existingWidgetIndex = state.nestedComponents.findIndex(widget => widget.id === value.payload.widget.id);

        // Перевіряємо, чи віджет вже є на місці
        if (existingWidgetIndex !== -1) {
          return;
        }

        state.nestedComponents.splice(parentIndex + 1, 0, value.payload.widget);
      }
    },
    remove: (state, value) => {
      state.nestedComponents = state.nestedComponents.filter(widget => {
        if (widget.id === value.payload.parent_id) {
          // Remove the widget itself if it matches the parent_id
          return false;
        }

        // Also, check if any nested component has the same parent_id
        if (widget.nestedComponents) {
          widget.nestedComponents = widget.nestedComponents.filter(nestedWidget => nestedWidget.id !== value.payload.parent_id);
        }

        return true;
      });
    },
    append: (state, value) => {
      value.payload.widget.forEach((item) => {
        let index = state.nestedComponents.findIndex(element => element.id === item.id);
        if (index === -1) {
          state.nestedComponents.splice(index, 0, item);
        }
      });
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setCurrentScreen,
  insertAfter,
  insertBefore,
  remove,
  append,
  replace,
  resetCurrentScreen
} = currentScreen.actions

export default currentScreen.reducer
import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";
import { isEmpty } from '../components/helpers/utils';

const FixedTop = "FixedTop";
const FixedBottom = "FixedBottom";
const excludeWidgets = [FixedTop, FixedBottom];

const initialState = {
  loading: false,
  screens: {},
  currentScreenId: null
}

export const screens = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    startLoading: (state, value) => {
      state.loading = true;
    },
    endLoading: (state, value) => {
      state.loading = false;
    },
    setCurrentScreenId: (state, value) => {
      state.currentScreenId = value.payload;
    },
    setScreen: (state, value) => {
      state.screens = { ...state.screens, [value.payload.id]: value.payload };
      state.loading = false;
    },
    insertBefore: (state, value) => {
      const screen = state.screens[value.payload.screen_id];
      let index = screen.nestedComponents.findIndex(widget => widget.id === value.payload.parent_id);

      // if parent widget is not found or payload is empty
      if (!value.payload.widget || index === -1) {
        return;
      }

      if (Array.isArray(value.payload.widget)) {
        value.payload.widget.reverse().forEach(item => {
          screen.nestedComponents.splice(index, 0, item);
        });
      } else {
        screen.nestedComponents.splice(index, 0, value.payload.widget);
      }

      state.screens = { ...state.screens, [value.payload.screen_id]: screen };
    },
    insertAfter: (state, value) => {
      const screen = state.screens[value.payload.screen_id];
      const parentIndex = screen.nestedComponents.findIndex(widget => widget.id === value.payload.parent_id);

      // Перевіряємо, чи знайдено батьківський віджет або чи не є payload порожнім
      if (parentIndex === -1 || !value.payload.widget) {
        return;
      }

      if (Array.isArray(value.payload.widget)) {
        // Якщо віджет - масив
        value.payload.widget.reverse().forEach(item => {
          screen.nestedComponents.splice(parentIndex + 1, 0, item);
        });
      } else {
        // Якщо віджет - не масив
        const existingWidgetIndex = screen.nestedComponents.findIndex(widget => widget.id === value.payload.widget.id);

        // Перевіряємо, чи віджет вже є на місці
        if (existingWidgetIndex !== -1) {
          return;
        }

        screen.nestedComponents.splice(parentIndex + 1, 0, value.payload.widget);
      }
      state.screens = { ...state.screens, [value.payload.screen_id]: screen };
    },
    remove: (state, value) => {
      const screen = state.screens[value.payload.screen_id];
      const updatedNestedComponents = screen.nestedComponents.filter(widget => {
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
      state.screens = { ...state.screens, [value.payload.screen_id]: { ...screen, nestedComponents: updatedNestedComponents } };
    },
    append: (state, value) => {
      const screen = state.screens[value.payload.screen_id];
      value.payload.widget.forEach((item) => {
        let index = screen.nestedComponents.findIndex(element => element.id === item.id);
        if (index === -1) {
          screen.nestedComponents.splice(index, 0, item);
        }
      });
      state.screens = { ...state.screens, [value.payload.screen_id]: screen };
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setCurrentScreenId,
  setScreen,
  resetCurrentScreen,
  insertAfter,
  insertBefore,
  remove,
  append,
  replace,
} = screens.actions

export default screens.reducer

// Export a reusable selector here
export const selectCurrentFixedTop = state => {
  if (state.screens.currentScreenId === null) return [];
  return state.screens.screens[state.screens.currentScreenId].nestedComponents.find(widget => widget.name == FixedTop)
}
export const selectCurrentFixedBottom = state => {
  if (state.screens.currentScreenId === null) return [];
  return state.screens.screens[state.screens.currentScreenId].nestedComponents.find(widget => widget.name == FixedBottom)
}
export const selectCurrentScreenMainBody = state => {
  if (state.screens.currentScreenId === null) return [];
  return state.screens.screens[state.screens.currentScreenId].nestedComponents.filter(widget => !excludeWidgets.includes(widget.name))
}
export const selectCurrentScreen = state => {
  if (state.screens.currentScreenId === null) return [];
  return state.screens.screens[state.screens.currentScreenId].nestedComponents
}
export const selectCurrentScreenByName = (state, name) => {
  if (state.screens.currentScreenId === null || isEmpty(state.screens)) return [];
  return Object.values(state.screens).filter(item => item.name === name);
}

const ItemUp = "MOVE_ITEM_UP";
const ItemDown = "MOVE_ITEM_DOWN";
const Select = "SELECT";
const unSelected = "UNSELECTED";
const changing = "CHANGING";
const setNewName = "SET_NAME";
const createName = "CREATE_NAME";

const initialState = { food: [
  { name: "Честная", id: 0, selected: false, changing: false, },
  { name: "Умная", id: 1, selected: false, changing: false, },
  { name: "Добрая", id: 2, selected: false, changing: false, },
  { name: "Красивая", id: 3, selected: false, changing: false, },
  { name: "Общительная", id: 4, selected: false, changing: false, },
  { name: "Веселая", id: 5, selected: false, changing: false, },
  { name: "Обворожительная ", id: 6, selected: false, changing: false, },
  { name: "Спокойная", id: 7, selected: false, changing: false, },
  { name: "Чудесная", id: 8, selected: false, changing: false, },
], };

function rootReducer (state = initialState, action) {
  console.log(state)
    switch (action.type) {

    case ItemUp:
      const upItems = [...state.food];
      const infoForButton = {...state.infoForButton};
      state.food.forEach( (item, index) => {
        if(item.selected && index !== 0) {
          upItems[index-1] = upItems.splice(index, 1, upItems[index-1])[0];
        }
      });
      return {
        food: [...upItems],
        infoForButton: {...infoForButton}, 
      };

    case ItemDown:
      const downItems = [...state.food];
      for (let index = downItems.length-1; index >= 0; index--) {
        let item = state.food[index];
        if (item.selected && index !== downItems.length-1) {
          downItems[index+1] = downItems.splice(index, 1, downItems[index+1])[0];
        }
      };
      return {
        food: [...downItems],
      };

    case Select:
      return {
        food: [...state.food].map( item => {
          if(item.id === action.payload) {
            item.selected = !item.selected;
          }
          return item;
        } )
      };

    case unSelected:
      return {
        food: [...state.food].map( item => {
          return {...item, selected: false};
        } )
      };
    
    case changing:
      return {
        food: [...state.food].map( item => {
          if(item.id === action.payload) { 
          return {
            ...item, changing: true};
          } else {
            return {...item}
          }
        } )
      };

    case setNewName:
      return {
        food: [...state.food].map( item => {
          if(item.id === action.payload.id) { 
          return {
            ...item, name: action.payload.name, changing: false};
          } else {
            return {...item}
          }
        } )
      };
    case createName:
      console.log(action)
      const name = action.payload.trim();
      if(name !== "") {
        if(action.payload.event !== undefined) {
          action.payload.event.preventDefault()
        }
        return {
          food: [...state.food, {name: name, id: state.food[state.food.length-1].id+1, selected: false, changing: false,}]
        };
      } else {
        return {
          food: [...state.food]
        };
      }
    default:
      return state;
  }
}

export default rootReducer;
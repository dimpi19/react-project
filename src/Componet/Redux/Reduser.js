
const arr = [];
export const myReducer = (state = arr, action) => {
    if (action.type == "ADD") {
        return state = [
            ...state,
            { ...action.payload, quantity: 1 }
        ]
    }
    else if (action.type == "IncQty") {
        return state.map((item, index) =>
            index === action.index ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    else if (action.type == "DecQty") {
        return state.map((item, index) =>
            index == action.index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        )
    }
    else if (action.type == "DELETE_ITEM") {
        return state.filter((_, i) => i !== action.payload);
    }

    return state
}
const { configureStore } = require("@reduxjs/toolkit")

const productsReducer = (
    state = {
        value: [
            {
                key: 0,
                name: "product",
                price: 10000,
                currency: "KRW"
            }
        ]
    },
    action
) => {
    switch (action.type) {
        case "products/added":
            return { value: [...state.value, action.payload] }
        case "products/removed":
            return {
                value: state.value.filter(
                    (product) => product !== action.payload
                )
            }
        default:
            return state
    }
}

const productsIdReducer = (state = 1, action) => {
    switch (action.type) {
        case "productsId/incremented":
            return state + 1
        default:
            return state
    }
}

let productsStore = configureStore({ reducer: productsReducer })
let productsIdStore = configureStore({ reducer: productsIdReducer })

export { productsStore, productsIdStore }

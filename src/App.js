import logo from "./logo.svg"
import "./App.css"
import { useState } from "react"
import { productsIdStore, productsStore } from "./redux"

const Product = (props) => {
    const deleteProductHandler = () => {
        productsStore.dispatch({
            type: "products/removed",
            payload: props.product
        })
    }
    return (
        <div>
            <h3>
                {props.product.name} ({props.product.key})
            </h3>
            <p>
                {props.product.price} {props.product.currency}
            </p>
            <button onClick={deleteProductHandler}>삭제</button>
        </div>
    )
}

function App() {
    const [products, setProducts] = useState(productsStore.getState().value)
    productsStore.subscribe(() => {
        setProducts(productsStore.getState().value)
    })

    const [newProductName, setNewProductName] = useState("")
    const [newProductPrice, setNewProductPrice] = useState(0)
    const [newProductCurrency, setNewProductCurrency] = useState("")

    const [newProductId, setNewProductId] = useState(productsIdStore.getState())
    productsIdStore.subscribe(() => {
        setNewProductId(productsIdStore.getState())
    })

    const addNewProductHandler = () => {
        productsStore.dispatch({
            type: "products/added",
            payload: {
                key: newProductId,
                name: newProductName,
                price: newProductPrice,
                currency: newProductCurrency
            }
        })
        productsIdStore.dispatch({
            type: "productsId/incremented"
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    {products.map((product) => {
                        return <Product key={product.key} product={product} />
                    })}
                </div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        addNewProductHandler()
                    }}
                >
                    <input
                        value={newProductName}
                        onChange={(event) => {
                            setNewProductName(event.target.value)
                        }}
                    ></input>
                    <input
                        value={newProductPrice}
                        onChange={(event) => {
                            setNewProductPrice(event.target.value)
                        }}
                    ></input>
                    <input
                        value={newProductCurrency}
                        onChange={(event) => {
                            setNewProductCurrency(event.target.value)
                        }}
                    ></input>
                    <button type="submit">새 제품 추가</button>
                </form>
            </header>
        </div>
    )
}

export default App

import { createContext, useState } from 'react'
import { useLocalStorage } from '../Hooks/useLocalStorage'

export const ContextCartLists = createContext();

const CartItemsContext = ({ children }) => {
    const [isUserLogin, setIsUserLogin] = useLocalStorage('User', {});
    const [ProductCart, setProductCart] = useLocalStorage('CartItems', []);
    const [cartDetail, setCartDetail] = useLocalStorage('cartDetail', {});
    const [Open, setOpen] = useState(false);

    const CartQuantityDecrement = (Product) => {
        setProductCart((prevCart) =>
            prevCart.map((item) => {
                if (item.ProductName === Product && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    if (item.ProductName === Product && item.quantity < 2) {
                        setOpen(true);
                    }
                }
                return item;
            })
        );
    }

    const subTotalValue = (total) => {
        return { subtotal: (total - total / 20), taxes: total / 20 };
    }

    const DeleteItems = (Product) => {
        setProductCart((prevCart) =>
            prevCart.filter((item) => item.ProductName !== Product).map((item) => {
                return item;
            })
        );
        setOpen(false);
    }

    const Total = () => {
        return ProductCart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    }

    const loginAsGuest = () => {
        const guestUser = {
            FirstName: "guest_" + new Date().getTime(),
            name: "Guest User",
            isGuest: true,
        };
        setIsUserLogin(guestUser);
    }



    const CartQuantityIncrement = (Product) => {
        setProductCart((prevCart) =>
            prevCart.map((item) => {
                if (item.ProductName === Product) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        );
    }


    return (
        <ContextCartLists.Provider value={{
            ProductCart,
            setProductCart,
            CartQuantityDecrement,
            CartQuantityIncrement,
            Open,
            setOpen,
            DeleteItems,
            Total,
            subTotalValue,
            loginAsGuest
        }}>
            {children}
        </ContextCartLists.Provider>
    )
}

export default CartItemsContext
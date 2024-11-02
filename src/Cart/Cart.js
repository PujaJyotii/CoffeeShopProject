import { Button, Modal } from "react-bootstrap";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CartSliceAction } from "../Redux/CartSlice";

import { ListSliceActions } from "../Redux/ListSlice";

function Cart(props) {
  const cartList = useSelector((state) => state.cart.cart);
  const listItem = useSelector((state) => state.list.list1);
  const dispatch = useDispatch();
  const totalA = cartList.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const increaseHandler = async (el) => {
    let index = cartList.findIndex((item) => item.nameV === el.nameV);
    let Index = listItem.findIndex((val) => val.nameV === el.nameV);
    let quant = +cartList[index].amount;
    let val = +cartList[index].value;
    if (quant === val) {
      console.log(
        "Cant Perform operation as the exisiting product is sold out"
      );
    } else {
      let exisitingItem = cartList[index];
      let obj = {
        ...exisitingItem,
        amount: exisitingItem.amount + 1,
      };
      try {
        let resp = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart/${exisitingItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
          }
        );
        let data = await resp.json();
        console.log(data);
        dispatch(CartSliceAction.increase(obj));
      } catch (error) {
        console.log(error);
      }
    }
    try {
      let quant = listItem[Index].quantity;
      let exisiting = listItem[Index];
      if (quant === 1) {
        let obj = { ...exisiting };
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/data/${exisiting.id}.json`,
          {
            method: "DELETE",

            headers: {
              "Content-Type": "application/json", // Set headers for JSON data
            },
          }
        );
        if (!res1.ok) {
          throw new Error(res1.status);
        }
        let data = await res1.json();
        dispatch(ListSliceActions.deduce(obj));
        console.log(data);
      } else {
        let obj = { ...exisiting, quantity: exisiting.quantity - 1 };
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/data/${exisiting.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json", // Set headers for JSON data
            },
          }
        );
        if (!res1.ok) {
          throw new Error(res1.status);
        }
        let data = await res1.json();
        dispatch(ListSliceActions.deduce(obj));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseHandler = async (el) => {
    let index = cartList.findIndex((item) => item.nameV === el.nameV);
    let Index = listItem.findIndex((item) => item.nameV === el.nameV);
    let quant = +cartList[index].amount;
    try {
      let exisitingItem = cartList[index];
      if (quant === 1) {
        let obj = { ...exisitingItem };
        let res = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart/${exisitingItem.id}.json`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) {
          throw new Error(res.ok);
        }
        let data = await res.json();
        dispatch(CartSliceAction.decrease(obj));
        console.log(data);
      } else {
        let obj = {
          ...exisitingItem,
          amount: exisitingItem.amount - 1,
        };
        let resp = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart/${exisitingItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
          }
        );
        let data = await resp.json();
        console.log(data);
        dispatch(CartSliceAction.decrease(obj));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let exisitingItem = listItem[Index];
      if (Index !== -1) {
        let obj = {
          ...exisitingItem,
          quantity: exisitingItem.quantity + 1,
        };
        let res = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/data/${exisitingItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json", // Set headers for JSON data
            },
          }
        );
        if (!res.ok) {
          throw new Error(res.status);
        }
        let data = await res.json();
        dispatch(ListSliceActions.induce(obj));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal onHide={props.onHide} show={props.onShow}>
        <div className={classes.card}>
          <Modal.Header closeButton>
            <Modal.Title>Card</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ul>
              {cartList.map((el) => (
                <li key={el.nameV} className={classes.innercard}>
                  <div>
                    <div>Name of Product : {el.nameV}</div>
                    <div>Price : Rs{el.price}</div>
                  </div>
                  <div className={classes.innerbox}>
                    <div
                      className={classes.box}
                      onClick={() => increaseHandler(el)}
                    >
                      +
                    </div>
                    <div>x{el.amount}</div>
                    <div
                      className={classes.box}
                      onClick={() => decreaseHandler(el)}
                    >
                      -
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <div className={classes.price}>Total Amount : Rs {totalA}</div>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={props.onHide}
              className={classes.btn1}
            >
              Close
            </Button>
            <Button variant="primary" className={classes.btn}>
              Purchase
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default Cart;

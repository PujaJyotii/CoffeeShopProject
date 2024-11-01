import { Button, Modal } from "react-bootstrap";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CartSliceAction } from "../Redux/CartSlice";

function Cart(props) {
  const cartList = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const totalA = cartList.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const increaseHandler = (el) => {
    dispatch(CartSliceAction.increase(el));
  };
  const decreaseHandler = (el) => {
    dispatch(CartSliceAction.decrease(el));
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

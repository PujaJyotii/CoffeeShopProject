import { Button, Card, Form } from "react-bootstrap";
import classes from "./Home.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListSliceActions } from "../Redux/ListSlice";
import { CartSliceAction } from "../Redux/CartSlice";

function Home() {
  const [nameV, setNameV] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const dispatch = useDispatch();
  const listItem = useSelector((state) => state.list.list1);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (nameV.length === 0 || +price <= 0 || +quantity <= 0) {
      return;
    }
    let obj = {
      nameV,
      price,
      quantity,
    };
    try {
      let res1 = await fetch(
        "https://cafe-project-27f9a-default-rtdb.firebaseio.com/data.json",
        {
          method: "POST",
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
      dispatch(ListSliceActions.add({ id: data.name, ...obj }));
    } catch (error) {
      console.log(error);
    }

    setNameV("");
    setPrice("");
    setQuantity("");
  };

  const addHandler = (item) => {
    dispatch(CartSliceAction.add({ ...item, amount: 1 }));
    dispatch(ListSliceActions.deduce(item));
  };

  return (
    <>
      <Card className={classes.card}>
        <Card.Body>
          <Form onSubmit={SubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Name"
                value={nameV}
                onChange={(e) => setNameV(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button className={classes.btn} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className={classes.card}>
        <ul>
          {listItem.map((el) => (
            <Card className={classes.innercard} key={el.nameV}>
              <li className={classes.innerBox}>
                <div>
                  <div>Name of Product : {el.nameV}</div>
                  <div>Price : Rs{el.price}</div>
                  <div>Quantity : {el.quantity}</div>
                </div>
                <div>
                  <Button
                    className={classes.btn}
                    onClick={() => addHandler(el)}
                  >
                    Add to bag
                  </Button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
      </Card>
    </>
  );
}

export default Home;

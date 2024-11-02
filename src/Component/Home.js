import { Button, Card, Form } from "react-bootstrap";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListSliceActions } from "../Redux/ListSlice";
import { CartSliceAction } from "../Redux/CartSlice";

function Home() {
  const [nameV, setNameV] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const dispatch = useDispatch();
  const listItem = useSelector((state) => state.list.list1);
  const Cart = useSelector((state) => state.cart.cart);

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
      dispatch(ListSliceActions.add({ ...obj, id: data.name }));
    } catch (error) {
      console.log(error);
    }

    setNameV("");
    setPrice("");
    setQuantity("");
  };
  useEffect(() => {
    async function gettingData() {
      let resp = await fetch(
        "https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart.json"
      );

      let data = await resp.json();
      let arr = [];
      for (const key in data) {
        arr.push({
          ...data[key],
          id: key,
        });
      }

      dispatch(CartSliceAction.get(arr));
    }

    gettingData();
  }, [dispatch]);
  const addHandler = async (item) => {
    let index = Cart.findIndex((el) => el.nameV === item.nameV);
    let Index = listItem.findIndex((el) => el.nameV === item.nameV);
    try {
      if (index !== -1) {
        // Existing item in cart
        const existingItem = Cart[index];

        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + 1,
        };

        // Update amount in Firebase
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart/${existingItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res1.ok) {
          throw new Error(res1.status);
        }

        // Update Redux state
        dispatch(CartSliceAction.add(updatedItem));
      } else {
        // New item in cart
        let obj = { ...item, amount: 1, value: item.quantity };
        let res1 = await fetch(
          "https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart.json",
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res1.ok) {
          throw new Error(res1.status);
        }

        let data = await res1.json();
        console.log("While Posting", data.name);
        dispatch(
          CartSliceAction.add({
            ...obj,
            id: data.name,
          })
        );
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
    /*let Index = listItem.findIndex((el) => el.nameV === item.nameV);
    try {
      if (index !== -1) {
        console.log("exisiting item", index);
        const exisitingItem = Cart[index];
        console.log("exisiting item", exisitingItem);
        const updatedItem = {
          ...exisitingItem,
          amount: +exisitingItem.amount + 1, // Increment amount
        };
        console.log(Cart[index], "From indexing");
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart/${exisitingItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res1.ok) {
          throw new Error("Error while updating");
        }
        let data = await res1.json();
        dispatch(CartSliceAction.add(updatedItem));
        console.log("Hii", data);
      } else {
        let obj = { ...item, amount: 1, value: +item.quantity };

        console.log("not exisiting item", index);
        let res1 = await fetch(
          "https://cafe-project-27f9a-default-rtdb.firebaseio.com/cart.json",
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res1.ok) {
          throw new Error("Error while posting");
        }
        let data = await res1.json();
        dispatch(
          CartSliceAction.add({
            ...obj,
            id: data.name,
          })
        );
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }*/
    try {
      let quant = listItem[Index].quantity;
      if (quant === 1) {
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/data/${listItem[Index].id}.json`,
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
        dispatch(ListSliceActions.deduce(item));
        console.log(data);
      } else {
        let obj = {
          ...listItem[Index],
          quantity: listItem[Index].quantity - 1,
        };
        let res1 = await fetch(
          `https://cafe-project-27f9a-default-rtdb.firebaseio.com/data/${listItem[Index].id}.json`,
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

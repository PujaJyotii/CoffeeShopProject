import React, { useEffect, useState } from "react";
import Headings from "./Heading/Headings";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Details from "./Component/Details";
import About from "./Component/About";

import { useDispatch } from "react-redux";
import { ListSliceActions } from "./Redux/ListSlice";
import Cart from "./Cart/Cart";

function App() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  useEffect(() => {
    async function getVal() {
      let res1 = await fetch(
        "https://cafe-project-27f9a-default-rtdb.firebaseio.com/data.json"
      );
      let data = await res1.json();
      let arr = [];
      for (let key in data) {
        arr.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(ListSliceActions.get(arr));
    }
    getVal();
  }, [dispatch]);

  return (
    <div>
      {show && <Cart onShow={showHandler} onHide={hideHandler} />}
      <Headings onShow={showHandler} onHide={hideHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

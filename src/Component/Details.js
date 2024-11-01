import { Card } from "react-bootstrap";
import classes from "./Details.module.css";
import { useState } from "react";

const coffees = [
  {
    name: "Espresso",
    description: {
      taste: "Rich, bold, and full-bodied with a slight bitterness.",
      aroma:
        "Intense, concentrated coffee fragrance with chocolate and nutty undertones.",
      benefits:
        "High in antioxidants, helps improve mental focus and alertness due to concentrated caffeine content.",
    },
  },
  {
    name: "Latte",
    description: {
      taste: "Smooth, creamy, and mildly sweet with a subtle coffee flavor.",
      aroma: "Mild, with notes of warm milk and a hint of espresso.",
      benefits:
        "Good for calming the stomach due to milk content, and still provides caffeine for gentle energy without the intensity of espresso.",
    },
  },
  {
    name: "Cappuccino",
    description: {
      taste:
        "Bold espresso flavor balanced by a creamy, airy texture from steamed milk foam.",
      aroma: "Rich espresso aroma complemented by a creamy milk scent.",
      benefits:
        "Boosts energy and mental clarity, while milk adds a source of calcium and protein.",
    },
  },
  {
    name: "Americano",
    description: {
      taste:
        "Smooth, slightly bitter with a lighter, less intense espresso flavor.",
      aroma:
        "Classic coffee aroma with hints of roasted beans and slight acidity.",
      benefits:
        "Low-calorie drink that provides hydration along with a caffeine boost, helping with focus and alertness.",
    },
  },
  {
    name: "Mocha",
    description: {
      taste:
        "Chocolatey, sweet, and rich, combining espresso with a hint of cocoa.",
      aroma: "Inviting blend of coffee and chocolate with warm, cozy notes.",
      benefits:
        "Contains antioxidants from cocoa, along with the energizing effects of caffeine, making it a delightful dessert-like coffee.",
    },
  },
  {
    name: "Cold Brew",
    description: {
      taste:
        "Smooth, mildly sweet, and less acidic than traditional iced coffee.",
      aroma: "Mild coffee fragrance with a refreshing coolness.",
      benefits:
        "Lower acidity is gentler on the stomach, while still providing caffeine for energy. Its smooth taste makes it ideal for hot weather.",
    },
  },
  {
    name: "Macchiato",
    description: {
      taste:
        "Strong, intense espresso flavor with a small amount of milk to soften the bitterness.",
      aroma: "Bold coffee aroma with a hint of warm milk.",
      benefits:
        "Quick energy boost with less milk, making it lower in calories but still smooth enough for those sensitive to pure espresso.",
    },
  },
  {
    name: "Flat White",
    description: {
      taste:
        "Smooth and velvety with a strong coffee taste balanced by a creamy texture.",
      aroma: "Subtle espresso aroma combined with steamed milk.",
      benefits:
        "Provides a balanced caffeine boost without the bitterness of straight espresso, and milk adds a creamy texture that soothes the stomach.",
    },
  },
];

function Details() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const handler = (name) => {
    if (selectedCoffee && selectedCoffee.name === name) {
      setSelectedCoffee(null); // Deselect if the same coffee is clicked again
    } else {
      const coffee = coffees.find((item) => item.name === name);
      setSelectedCoffee(coffee);
    }
  };
  return (
    <>
      <Card className={classes.card}>
        <Card.Header style={{ textAlign: "center", fontWeight: "bolder" }}>
          Specials
        </Card.Header>
        <Card.Body>
          <ul>
            {coffees.map((item) => (
              <li key={item.name}>
                <Card
                  className={classes.innercard}
                  onClick={() => handler(item.name)}
                >
                  {item.name}
                  {selectedCoffee && item.name === selectedCoffee.name && (
                    <>
                      <div>{item.description.aroma}</div>
                      <div>{item.description.benefits}</div>
                      <div>{item.description.taste}</div>
                    </>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export default Details;

import { Card } from "react-bootstrap";
import classes from "./About.module.css";

function About() {
  return (
    <>
      <Card className={classes.card}>
        <Card.Header>Coffeee</Card.Header>
        <Card.Body>
          <Card.Title>I come from.......</Card.Title>
          <Card.Text>
            Coffee is cultivated through a meticulous process that begins with
            planting coffee seeds in shaded nurseries. These seeds eventually
            grow into coffee plants, which are transplanted to fields with
            favorable climate and altitude—typically in tropical regions near
            the equator where temperatures are mild and rainfall is consistent.
            The plants take around three to four years to mature and produce
            coffee cherries, which house the coffee beans. Once ripened, usually
            turning a bright red or yellow color, the cherries are hand-picked
            to ensure the highest quality. After harvesting, they undergo a
            process of either wet or dry processing to separate the beans from
            the fruit. Wet processing involves washing the cherries and removing
            the outer layers, while dry processing involves sun-drying the
            cherries before removal. The beans are then fermented, washed, and
            sun-dried until they reach the right moisture content. Finally, they
            are milled, graded, and roasted to develop their unique flavors,
            ready to be brewed into a beloved cup of coffee. In a coffee café,
            the coffee-making process begins with freshly roasted beans,
            carefully ground to the appropriate consistency for the brewing
            method. For an espresso-based drink, a barista typically uses a
            high-quality espresso machine, where the ground coffee is tightly
            packed into a portafilter and hot water is forced through it at high
            pressure. This process extracts rich flavors, resulting in a
            concentrated shot of espresso. Depending on the order, the espresso
            might be served alone or combined with steamed milk for drinks like
            lattes or cappuccinos. For other brewing methods, like pour-over or
            French press, the barista carefully measures the coffee grounds and
            water temperature, allowing the coffee to steep for a precise
            duration. Each method brings out unique flavors and aromas from the
            coffee beans, tailored to the preferences of café customers.
            Finally, the barista often adds finishing touches, such as latte
            art, syrups, or spices, to enhance the experience, serving a freshly
            made cup that highlights the complex flavors and aromas of the
            coffee.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default About;

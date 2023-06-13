import React from "react"
import { Card } from "react-bootstrap"
import styles from "./cardBalance.module.css"
import CoinBuyer from "../../../../CoinBuyer/CoinBuyer";

const CardBuy = () =>{

return (
<Card className={`max-w-xs mx-auto ${styles.container}`}decoration="top" decorationColor="indigo">
        <CoinBuyer />
</Card>
)}

export default CardBuy
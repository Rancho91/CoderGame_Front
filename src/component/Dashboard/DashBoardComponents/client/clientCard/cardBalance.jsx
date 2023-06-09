import React from "react"
import { Card } from "react-bootstrap"
import styles from "./cardBalance.module.css"

const CardBalance = ({balance}) =>{

return (
<Card className={`max-w-xs mx-auto ${styles.container}`}decoration="top" decorationColor="indigo">
    <h3 className={styles.title}>Coins</h3>
    <p className={styles.balance}>{balance?balance:0}</p>
  </Card>
)}

export default CardBalance
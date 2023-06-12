import React from "react"
import { Card, Text, Metric } from "@tremor/react"

const CardBalance = ({balance}) =>{

return (
<Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
    <Text>Balance</Text>
    <Metric>{balance?balance:0}</Metric>
  </Card>
)}

export default CardBalance
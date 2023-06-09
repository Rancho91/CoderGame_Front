import React from "react"
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text, Title, Badge } from "@tremor/react";

const ClientTransaction = ({transaction}) =>{
 
console.log(transaction)

    return (
        <Card>
        <Title>List of Swiss Federal Councillours</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Videogame</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {transaction?.map((item) => (
              <TableRow>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Text>{item.amount}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.VideogameId}</Text>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">
                  </Badge>
                </TableCell>
              </TableRow>) 
             )} 
          </TableBody>
        </Table>
      </Card>
    )
}

export default ClientTransaction
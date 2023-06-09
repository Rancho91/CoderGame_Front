import React, { useEffect, useState } from "react"
import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text, Title, Badge } from "@tremor/react";
import { useAuth0 } from "@auth0/auth0-react";

const ClientVideogames = ({favorites}) =>{
 


    return (
        <Card>
        <Title>List of Swiss Federal Councillours</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>id</TableHeaderCell>
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Link Descarga</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((item) => (
              <TableRow key={item.Videogame.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Text>{item.Videogame.id}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.Videogame.image}</Text>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">
                    {item.buy}
                  </Badge>
                </TableCell>
              </TableRow>)
            )}
          </TableBody>
        </Table>
      </Card>
    )

}

export default ClientVideogames
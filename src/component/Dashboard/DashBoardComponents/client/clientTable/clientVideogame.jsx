import React, { useEffect, useState } from "react"
import { Grid, Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text, Title, Badge } from "@tremor/react";
import styles from "./table.module.css"
const ClientVideogames = ({favorites}) =>{
 


    return (
        <Card>
        <Title>List of Swiss Federal Councillours</Title>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableHeaderCell >Name</TableHeaderCell>
              <TableHeaderCell >id</TableHeaderCell>
              <TableHeaderCell >Image</TableHeaderCell>
              <TableHeaderCell >Link Descarga</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites?.map((item) => (
              <TableRow key={item.Videogame.name} scope="row">
                <TableCell className={styles.cell}>{item.Videogame.name}</TableCell>
                <TableCell>
                  <Text >{item.Videogame.id}</Text>
                </TableCell>
                <TableCell>
                <img
                  className="img-fluid"
                  src={item.Videogame.image}
                  alt=""
                  style={{ maxWidth: "150px", height: "auto" }} />
                </TableCell>

              </TableRow>)
            )}
          </TableBody>
        </Table>
      </Card>
    )

}

export default ClientVideogames
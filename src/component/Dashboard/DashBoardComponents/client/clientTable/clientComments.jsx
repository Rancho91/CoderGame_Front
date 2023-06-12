import { Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Text, Title, Badge } from "@tremor/react";

const ClientComments = ({comments}) =>{


    return (
        <Card>
        <Title>List of Swiss Federal Councillours</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Game</TableHeaderCell>
              <TableHeaderCell>message</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.Videogame.name}</TableCell>
                <TableCell>
                  <Text>{item.message}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.date}</Text>
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

export default ClientComments 
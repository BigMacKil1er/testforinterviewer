import { TableCell, TableRow } from "@mui/material";
import { itemObj } from "../../../app/types";
import { theme } from "../../../app/styles/theme";

interface ITableItemProps {
    item: itemObj
}

export const TableItem:React.FC<ITableItemProps> = ({item}) => {
    const colorText = {color: theme.palette.primary.contrastText}
    return (
    <TableRow key={item.id}>
        <TableCell sx={colorText}>{item.id}</TableCell>
        <TableCell sx={colorText} align="right">{item.product}</TableCell>
        <TableCell sx={colorText} align="right">{item.price}</TableCell>
        <TableCell sx={colorText} align="right">{item.brand ? item.brand: 'Нет данных'}</TableCell>
    </TableRow>
    );
};
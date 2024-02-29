import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useGetDataMutation } from "../../entities/api/some";
import { useDispatch, useSelector } from "react-redux";
import { setIds } from "../../app/store/data/Ids";
import { RootState } from "../../app/store";
import { setItems } from "../../app/store/data/items";
import { itemObj } from "../../app/types";
export const LayoutBasePage = () => {
    const dispatch = useDispatch()
    const ids = useSelector((state:RootState)=> state.ids.result)
    const items = useSelector((state:RootState)=> state.items.result)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [getData] = useGetDataMutation()
    const limit = 50
    const ofset = page * limit
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    
    function limitingItems() {
        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        return items?.slice(startIndex, endIndex)
    }

    const limitedItems = limitingItems()
    console.log('render');
    
    async function getItems() {
        if (ids && ids.length > 0) {
            try {
                const response = await getData(
                    {
                        "action": "get_items",
                        "params": {"ids": ids}
                    }
                ).unwrap()
                const uniqueResponse = deleteDouble(response.result)
                dispatch(setItems({result: [...items, ...uniqueResponse.result]}))
            } catch (error) {
                console.log(error)
            }
        }
    }

    function deleteDouble(items:itemObj[]) {
        const map = new Map()
        for (const item of items) {
            map.set(item.id, item)
        }
        const uniqueItems = {
            result: Array.from(map.values())
        }
        return uniqueItems
    }

    async function getIds() {
        try {
            const response = await getData({
                "action": "get_ids",
                "params": {"offset": ofset, "limit": limit}
            }).unwrap()
            dispatch(setIds(response))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getIds()
    },[])
    useEffect(()=>{
        getItems()
    },[ids])
    return (
        <Grid >
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Brand</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {limitedItems?.map(item => 
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell align="right">{item.product}</TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="right">{item.brand ? item.brand: 'Нет данных'}</TableCell>
                        </TableRow>)}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={ids ? ids.length : 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Container>
        </Grid>
    );
};
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetDataMutation } from "../../entities/api/some";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setItems } from "../../app/store/data/items";
import { itemObj } from "../../app/types";
import { useDebounce } from "use-debounce";
export const LayoutBasePage = () => {
    const dispatch = useDispatch()
    const ids = useSelector((state:RootState)=> state.ids.result)
    const items = useSelector((state:RootState)=> state.items.result)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [getData] = useGetDataMutation()
    const limit = 100
    const ofset = page * limit
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(() => newPage);
      };
    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    
    const limitedItems = useMemo(()=>{
        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        return items?.slice(startIndex, endIndex)   
    }, [items, rowsPerPage, page])

    console.log('render');
    
    async function getItems(ids: string[]) {
        console.log('getItems');
        
        if (ids && ids.length > 0) {
            try {
                const response = await getData(
                    {
                        "action": "get_items",
                        "params": {"ids": ids}
                    }
                ).unwrap()
                const uniqueResponse = deleteDouble(response.result)
                return uniqueResponse
            } catch (error) {
                console.log(error)
            }
        }
    }

    const [selectValue, setSelectValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    function handleChange(event: SelectChangeEvent) {
        setSelectValue(event.target.value)
        setTimeout(()=> inputRef.current && inputRef.current.focus())
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
        console.log('getIds');
        
        try {
            const response = await getData({
                "action": "get_ids",
                params: {ofset: ofset, limit: limit}
            }).unwrap()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function getProductIds(product: string, selectedField:string) {
        try {
            const response = await getData({
                "action": "filter",
                "params": {[selectedField]: selectedField === 'price' && product ? parseInt(product) : product}
            }).unwrap()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getIds().then(res => {
            const responseItems = getItems(res.result)
            return responseItems
        }).then(res => {
            res && dispatch(setItems({result: [...items, ...res.result]}))
        })
    },[])


    const [inputValue, setInputValue] = useState('')
    const [inputValueDebounce] = useDebounce(inputValue, 1000)

    useEffect(()=>{
        inputValueDebounce && getProductIds(inputValueDebounce, selectValue).then(res => {
            let result
            setPage(0)
            if (res.result.length > 99) {
                result = res.result.slice(0, 99)
                return getItems(result)
            }
            return getItems(res.result)
            
        }).then(res=> res && dispatch(setItems(res)))
    },[inputValueDebounce])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setInputValue(value)
    }
    return (
        <Grid >
            <Container>
                <TableContainer component={Paper}>
                    <Toolbar>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                            >
                            Товары
                        </Typography>
                        
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, flexDirection:'row', gap: '10px' }}>
                                <InputLabel sx={{width: '70px'}} id="demo-simple-select-label">Фильтр:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    sx={{width: '100%'}}
                                    onChange={handleChange}
                                >
                                    <MenuItem value=''>Нет</MenuItem>
                                    <MenuItem value='price'>Цена</MenuItem>
                                    <MenuItem value='product'>Название</MenuItem>
                                    <MenuItem value='brand'>Бренд</MenuItem>
                                </Select>
                                {selectValue && <TextField inputRef={inputRef} id="standard-basic" label={selectValue} variant="standard" onChange={handleInputChange} />}
                        </FormControl>
                            
                        
                    </Toolbar>
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
                    count={items ? items.length : 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Container>
        </Grid>
    );
};
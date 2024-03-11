import { Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography, styled} from "@mui/material";
import Paper from '@mui/material/Paper';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getApiAllDataSlice, useGetDataMutation } from "../../entities/api/some";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setItems } from "../../app/store/data/items";
import { itemObj } from "../../app/types";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDebounce } from "use-debounce";
import { apiSlice } from "../../app/api/apiSlice";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const LayoutBasePage = () => {
    const dispatch = useDispatch()
    const ids = useSelector((state:RootState)=> state.ids.result)
    const items = useSelector((state:RootState)=> state.items.result)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [getData] = useGetDataMutation()
    const [getItemsFunc, {isLoading}] = apiSlice.useGetAllDataMutation()
    const limit = 100
    const ofset = page * limit
    const handleChangePage = (_event: unknown, newPage: number) => {
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
    
    function dataReset() {
        dispatch(setItems({result: []}))
        setDontHaveData(false)
    }

    async function getItems(ids: string[]) {
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
        dataReset()
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
    
    const [dontHaveData, setDontHaveData] = useState(false)

    useEffect(()=>{
        console.log('data', dontHaveData);
    },[dontHaveData])
    async function getProductIds(product: string, selectedField:string) {
        dataReset()
        try {
            const response = await getData({
                "action": "filter",
                "params": {[selectedField]: selectedField === 'price' && product ? parseInt(product) : product}
            }).unwrap()
            if (response.result.length === 0) {
                console.log(response.result.length);
                setDontHaveData(prev => !prev)
                console.log(dontHaveData);
                
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        // getIds().then(res => {
        //     const responseItems = getItems(res.result)
        //     return responseItems
        // }).then(res => {
        //     res && dispatch(setItems({result: [...items, ...res.result]}))
        // })
        // const some = getAllData({
        //     "action": "get_ids",
        //     params: {offset: ofset, limit: limit}
        // })
        // console.log(some.data);
        getItemsFunc(
            {
            "action": "get_ids",
            params: {offset: 0, limit: 1000}
            }
        )
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

    function handleDeleteClick() {
        setInputValue('')
        setSelectValue('')
        getItemsFunc({
            "action": "get_ids",
            params: {offset: 0, limit: 1000}
            })
        dispatch(setItems({result: []}))
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
                                    value={selectValue}
                                    onChange={handleChange}
                                >
                                    <MenuItem value=''>Нет</MenuItem>
                                    <MenuItem value='price'>Цена</MenuItem>
                                    <MenuItem value='product'>Название</MenuItem>
                                    <MenuItem value='brand'>Бренд</MenuItem>
                                </Select>
                                {selectValue && <>
                                    <TextField inputRef={inputRef} id="standard-basic" label={selectValue} variant="standard" onChange={handleInputChange} />
                                </>}
                                
                                
                        </FormControl>
                        
                        {inputValueDebounce && <Button variant="outlined" onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
                                        {inputValueDebounce}
                                    </Button>}
                        
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
                        {dontHaveData && 
                        <TableRow>
                            <TableCell>
                                <Stack>
                                    <Item>No results, repeat the request</Item>
                                </Stack>
                            </TableCell>
                        </TableRow>}
                 
                        {limitedItems.length === 0 && !dontHaveData &&
                        <>
                            <TableRow>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                                <TableCell><Skeleton sx={{display: 'flex', maxWidth: '100%'}} variant="rounded"  height={20} /></TableCell>
                            </TableRow>
                        </>}
                        
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
                    rowsPerPageOptions={[50, 100]}
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
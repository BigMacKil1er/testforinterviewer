import { Button, FormControl, InputLabel, MenuItem, Select, 
     SelectChangeEvent, 
     TextField, Toolbar, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { IParamsFilter, apiSlice, field } from "../../../app/api/apiSlice";
import { setItems } from "../../../app/store/data/items";
import { theme } from "../../../app/styles/theme";
import { setQueryStatus } from "../../../app/store/data/queryStatus";

interface ITableControlProps {
    setPage: React.Dispatch<React.SetStateAction<number>>
    setDontHaveData: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableControl:React.FC<ITableControlProps> = ({setPage, setDontHaveData}) => {
    const dispatch = useDispatch()
    const [selectValue, setSelectValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState('')
    const [inputValueDebounce] = useDebounce(inputValue, 1000)
    const [getItemsMulti] = apiSlice.useGetAllDataMutation()
    const [getItems] = apiSlice.useGetItemsMutation()
    
    function handleSelectChange(event: SelectChangeEvent) {
        setSelectValue(event.target.value)
        setTimeout(()=> inputRef.current && inputRef.current.focus())
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setInputValue(value)
    }

    async function handleDeleteClick() {
        dispatch(setItems({result: []}))
        setInputValue('')
        setSelectValue('')
        setDontHaveData(false)
        dispatch(setQueryStatus(false))
        try {
            await getItemsMulti({
            "action": "get_ids",
            params: {offset: 0, limit: 1000}
            })
        } catch (error) {
            console.log(error);
        }
    }

    function dataReset() {
        dispatch(setItems({result: []}))    
        setDontHaveData(false)
        setPage(0)
    }

    async function getFilteredItems(product: string, selectedField:field) {
        dataReset()
        try {
            const response = await getItems({
                "action": "filter",
                "params": { [selectedField]: selectedField === 'price' && product ? parseInt(product) : product } as unknown as IParamsFilter
            }).unwrap()
            response.result.length === 0 && setDontHaveData(true)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        inputValueDebounce && getFilteredItems(inputValueDebounce, selectValue as field)
    },[inputValueDebounce])
    
    return (
        <Toolbar sx={{flexDirection: { xs: 'column', sm: 'row' }}}>
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
                        color="secondary"
                        sx={{width: '100%', color: theme.palette.primary.contrastText}}
                        value={selectValue}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value=''>Нет</MenuItem>
                        <MenuItem value='price'>Цена</MenuItem>
                        <MenuItem value='product'>Название</MenuItem>
                        <MenuItem value='brand'>Бренд</MenuItem>
                    </Select>
                    {selectValue &&
                        <TextField inputRef={inputRef} id="standard-basic" label={selectValue} variant="standard" onChange={handleInputChange} />
                    }
                    
                    
            </FormControl>
            
            {inputValueDebounce && 
                <Button variant="outlined" onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
                    {inputValueDebounce}
                </Button>}
            
        </Toolbar>
    );
};
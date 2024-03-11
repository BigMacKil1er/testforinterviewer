import { Paper, TableContainer, TablePagination } from "@mui/material";
import { TableProducts } from "./TableProducts";
import { TableControl } from "./TableControl";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useMemo, useState } from "react";
import { theme } from "../../../app/styles/theme";

export const TableMain = () => {
    const items = useSelector((state:RootState)=> state.items.result)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [dontHaveData, setDontHaveData] = useState(false)
    const limitedItems = useMemo(()=>{
        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        return items?.slice(startIndex, endIndex)   
    }, [items, rowsPerPage, page])

    function handleChangePage(_event: unknown, newPage: number){
        setPage(() => newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    return (
        <>
            <TableContainer component={Paper} sx={{backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText}}>
                <TableControl setPage={setPage} setDontHaveData={setDontHaveData}/>
                <TableProducts limitedItems={limitedItems} dontHaveData={dontHaveData}/>
            </TableContainer>
            <TablePagination
                    color="secondary"
                    sx={{color: theme.palette.primary.light, '& .MuiTablePagination-selectIcon': {
                        color: theme.palette.primary.light
                    }}}
                    rowsPerPageOptions={[50, 100]}
                    component="div"
                    count={items ? items.length : 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
        </>
    );
};
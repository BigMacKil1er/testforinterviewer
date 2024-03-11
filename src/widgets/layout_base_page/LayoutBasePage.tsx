import { Container, Grid} from "@mui/material";
import { TableMain } from "../../entities/ui/table/TableMain";
import { useEffect } from "react";
import { apiSlice } from "../../app/api/apiSlice";

export const LayoutBasePage = () => {
    const [getItemsFunc] = apiSlice.useGetAllDataMutation()
    useEffect(()=>{
        getItemsFunc(
            {
            "action": "get_ids",
            params: {offset: 0, limit: 1000}
            }
        )
    },[])
    return (
        <Grid sx={{overflowY: 'auto'}}>
            <Container>
                <TableMain />
            </Container>
        </Grid>
    );
};
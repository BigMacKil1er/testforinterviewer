import { Container, Grid} from "@mui/material";
import { TableMain } from "../../entities/ui/table/TableMain";
import { useEffect } from "react";
import { apiSlice } from "../../app/api/apiSlice";

export const LayoutBasePage = () => {
    const [getItemsFunc] = apiSlice.useGetAllDataMutation()
    async function doQuery(){
        try {
            await getItemsFunc(
                {
                "action": "get_ids",
                params: {offset: 0, limit: 1000}
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        doQuery()
    },[])
    return (
        <Grid sx={{overflowY: 'auto', paddingBottom: '50px'}}>
            <Container>
                <TableMain />
            </Container>
        </Grid>
    );
};
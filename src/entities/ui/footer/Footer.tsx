import { AppBar, Box, Grid, Link, Toolbar, Typography } from "@mui/material";
import { theme } from "../../../app/styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
export const Footer = () => {
    const items = useSelector((state:RootState)=> state.items.result)
    return (
        <Grid>
            <AppBar sx={{backgroundColor: theme.palette.primary.main, top: 'auto', bottom: 0}} component="nav" position={items.length > 49 ? "sticky" : 'fixed'}>
                <Toolbar>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{ flexGrow: 1}}>
                            Test Task Valantis
                    </Typography>
                    <Box sx={{display: 'flex' ,gap: '20px'}}>
                            <Link sx={{ color: '#fff' }} href='https://github.com/ValantisJewelry/TestTaskValantis'>
                                Задание
                            </Link>
                            <Link sx={{ color: '#fff' }} href='https://hh.ru/resume/efbb57a9ff0c1b67890039ed1f794361554967'>
                                Резюме
                            </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};
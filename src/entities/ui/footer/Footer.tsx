import { AppBar, Box, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../../../app/styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
export const Footer = () => {
    const items = useSelector((state:RootState)=> state.items.result)
    return (
        <Grid>
            <AppBar sx={{backgroundColor: theme.palette.primary.main, top: 'auto', bottom: 0}} component="nav" position={items.length > 49 ? "sticky" : 'fixed'}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            Test Task Valantis
                    </Typography>
                    <Box>
                            <Link sx={{ color: '#fff' }} href='https://github.com/ValantisJewelry/TestTaskValantis'>
                                Задание
                            </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};
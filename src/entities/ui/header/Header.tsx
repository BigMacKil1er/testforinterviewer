import { AppBar, Box, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../../../app/styles/theme";
export const Header = () => {
    return (
        <Grid>
            <AppBar sx={{backgroundColor: theme.palette.primary.main}} component="nav" position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            TEST TASK
                    </Typography>
                    <Box>
                            <Link sx={{ color: theme.palette.primary.contrastText }} href='https://github.com/BigMacKil1er/testforinterviewer'>
                                GitHub
                            </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};
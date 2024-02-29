import { AppBar, Box, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
export const Header = () => {
    return (
        <Grid>
            <AppBar component="nav" position="static">
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
                            <Link sx={{ color: '#fff' }}>
                                GitHub
                            </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};
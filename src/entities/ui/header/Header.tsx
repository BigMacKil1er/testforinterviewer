import { AppBar, Box, Grid, Link, Toolbar, Typography } from "@mui/material";
import { theme } from "../../../app/styles/theme";
export const Header = () => {
    return (
        <Grid>
            <AppBar sx={{backgroundColor: theme.palette.primary.main}} component="nav" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
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
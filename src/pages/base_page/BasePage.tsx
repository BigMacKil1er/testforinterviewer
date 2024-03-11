import { Grid } from "@mui/material";
import { Header } from "../../entities/ui/header/Header";
import { Footer } from "../../entities/ui/footer/Footer";
import { LayoutBasePage } from "../../widgets/layout_base_page/LayoutBasePage";
import { theme } from "../../app/styles/theme";

export const BasePage = () => {
    return (
        <Grid container direction='column' justifyContent="flex-start" spacing={{ mobile: 1, tablet: 2, laptop: 3 }} sx={{gap: '20px',backgroundColor: theme.palette.primary.dark, height: '100vh', flexWrap: 'nowrap'}} >
            <Header />
            <LayoutBasePage/>
            <Footer />
        </Grid>
    );
};
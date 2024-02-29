import { Grid } from "@mui/material";
import { Header } from "../../entities/ui/header/Header";
import { Footer } from "../../entities/ui/footer/Footer";
import { LayoutBasePage } from "../../widgets/layout_base_page/LayoutBasePage";

export const BasePage = () => {
    return (
        <Grid container direction='column' justifyContent="space-between" spacing={{ mobile: 1, tablet: 2, laptop: 3 }} style={{ minHeight: '100vh' }}>
            <Header />
            <LayoutBasePage/>
            <Footer />
        </Grid>
    );
};
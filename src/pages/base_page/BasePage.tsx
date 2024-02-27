import { Grid } from "@mui/material";
import { Header } from "../../entities/ui/header/Header";
import { Footer } from "../../entities/ui/footer/Footer";
import { LayoutBasePage } from "../../widgets/layout_base_page/LayoutBasePage";

export const BasePage = () => {
    return (
        <Grid>
            <Header />
            <LayoutBasePage />
            <Footer />
        </Grid>
    );
};
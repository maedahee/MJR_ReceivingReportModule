/* eslint-disable react/jsx-no-undef */
import { Breadcrumbs } from "@mui/material";

const _breadcrumb = () => {
    return(
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
        <Link
            underline="hover"
            color="inherit"
            href="/ReceivingReport"
        >
            Receiving Report
        </Link>
            <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
        </Breadcrumbs>
    );
};
export default _breadcrumb;
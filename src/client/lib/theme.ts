/* Libraries */
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#e63741'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 850,
            lg: 1280,
            xl: 1920
        }
    }
});

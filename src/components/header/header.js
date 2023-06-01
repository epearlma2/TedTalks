import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/core/Menu";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { useNavigate } from "react-router-dom";

const pages = [
    { name: "Search", path: "/" },
    { name: "My Library", path: "/library" },
    { name: "Notes", path: "/notespage" },
];

export function Header() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const openNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const closeNavMenu = (page) => {
        setAnchorElNav(null);
        if (page) {
            navigate(page.path);
        }
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: '-webkit-linear-gradient(#ffabc8, #b0245b)',
                color: 'black'
            }}
        >
            <Container maxWidth="xl" className="logo">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={openNavMenu}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img

                            src="https://logodix.com/logo/822921.png"
                            alt="TedEd Logo"
                            style={{ height: 100, width: 200, marginTop: -30 }}
                        />
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => closeNavMenu(page)}
                                sx={{ my: 2, color: "inherit", display: "block" }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

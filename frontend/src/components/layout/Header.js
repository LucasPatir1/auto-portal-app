import React from "react";
import { Route } from "react-router-dom";
import SearchBox from "../../ui/components/SearchBox";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "@mui/material/Link";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const [anchorCategoryEl, setAnchorCategoryEl] = React.useState(null);
  const openCategory = Boolean(anchorCategoryEl);

  const handleCategoryClick = (event) => {
    setAnchorCategoryEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCategoryEl(null);
  };

  return (
    <Stack sx={{ bgcolor: "#f8f9fa", p: 1 }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: { md: "row", sm: "column", xs: "column" },
        }}
      >
        <Link
          href="/"
          underline="none"
          color="text.muted"
          sx={{ my: { sm: 1, xs: 1 } }}
        >
          <ShoppingBasketIcon sx={{ mr: 1 }} />
          IGadgetShop
        </Link>
        <Route render={({ history }) => <SearchBox history={history} />} />
        <Button
          sx={{
            color: "text.muted",
            "&:focus": {
              outline: "none",
              color: "inherit",
            },
            "&:hover": {
              bgcolor: "transparent",
              color: "#000",
            },
            my: { sm: 1, xs: 1 },
          }}
          id="basic-button"
          aria-controls={openCategory ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCategory ? "true" : undefined}
          onClick={handleCategoryClick}
        >
          Категория
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorCategoryEl}
          open={openCategory}
          onClose={handleCategoryClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleCategoryClose}>Ноутбуки</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Телефоны</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Разное</MenuItem>
        </Menu>
        <Link
          href="/cart"
          underline="none"
          color="text.muted"
          sx={{ my: { sm: 1, xs: 1 } }}
        >
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Корзина
        </Link>
        <HeaderMenu />
      </Container>
    </Stack>
  );
};

export default Header;

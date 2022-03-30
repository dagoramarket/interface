import {
  faShoppingCart, faUser, faWallet
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../Navbar";
import NavDropdown from "../../Navbar/NavDropdown";
import DropdownItem from "../../Navbar/NavDropdown/DropdownItem";
import NavItem from "../../Navbar/NavItem";
import NavLogo from "../../Navbar/NavLogo";


type Props =  {
  categories: string[];
}

export default function Navigation({ categories }: Props): JSX.Element {
  return (
    <Navbar>
      <NavLogo href="/">Dagora Market</NavLogo>
      <NavDropdown title="Categories">
        {categories.map((category, i) => (
          <DropdownItem key={i}>{category}</DropdownItem>
        ))}
      </NavDropdown>
      <NavItem href="/account" icon={faUser}>Account</NavItem>
      <NavItem icon={faWallet}>Wallet</NavItem>
      <NavItem icon={faShoppingCart}>Cart</NavItem>
    </Navbar>
  );
}

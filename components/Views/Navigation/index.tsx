import Navbar from "@/components/Navbar";
import NavDropdown from "@/components/Navbar/NavDropdown";
import DropdownItem from "@/components/Navbar/NavDropdown/DropdownItem";
import NavItem from "@/components/Navbar/NavItem";
import NavLogo from "@/components/Navbar/NavLogo";
import {
  faShoppingCart, faUser, faWallet
} from "@fortawesome/free-solid-svg-icons";


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

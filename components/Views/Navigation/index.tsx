import Navbar from "@/components/Navbar";
import NavDropdown from "@/components/Navbar/NavDropdown";
import DropdownItem from "@/components/Navbar/NavDropdown/DropdownItem";
import NavItem from "@/components/Navbar/NavItem";
import NavLogo from "@/components/Navbar/NavLogo";
import { useMarketContext } from "@/libs/marketContext";
import {
  faMap,
  faShoppingCart,
  faUser,
  faWallet
} from "@fortawesome/free-solid-svg-icons";

export default function Navigation(): JSX.Element {
  const { categories } = useMarketContext();
  return (
    <Navbar>
      <NavLogo href="/">Dagora Market</NavLogo>
      <NavItem href="/explore" icon={faMap}>Explore</NavItem>
      <NavDropdown title="Categories">
        {categories.map((category, i) => (
          <DropdownItem key={i}>{category}</DropdownItem>
        ))}
      </NavDropdown>
      <NavItem href="/account" icon={faUser}>
        Account
      </NavItem>
      <NavItem icon={faWallet}>Wallet</NavItem>
      <NavItem icon={faShoppingCart}>Cart</NavItem>
    </Navbar>
  );
}

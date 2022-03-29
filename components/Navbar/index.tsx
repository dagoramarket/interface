// create navbar react component

import { NavItem } from "./NavItem";
import { NavLogo } from "./NavLogo";
import {
  faShoppingCart,
  faWallet,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";

export function Navbar(): JSX.Element {
  return (
    <nav className="shadow-lg text-white bg-slate-700 w-full flex px-6 lg:px-48  py-5 text-2xl">
      <ul className="flex-0 flex justify-start">
        <NavLogo href="/">DAGORA MARKET</NavLogo>
      </ul>
      <ul className="flex-auto gap-5 flex justify-end">
        <NavItem>Categories</NavItem>
        <NavItem>
          <FontAwesomeIcon size="lg" icon={faUser} />
        </NavItem>
        <NavItem href="/wallet">
          <FontAwesomeIcon size="lg" icon={faWallet} />
        </NavItem>
        <NavItem href="/cart">
          <FontAwesomeIcon size="lg" icon={faShoppingCart} />
        </NavItem>
      </ul>
    </nav>
  );
}

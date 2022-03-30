import Link from "next/link";
import { NavbarBrand } from "react-bootstrap";

type Props =  {
  children: string | JSX.Element | JSX.Element[];
  href?: string;
}

export default function NavLogo({ href, children }: Props): JSX.Element {
  return <NavbarBrand href={href ? href : "#"}>{children}</NavbarBrand>;
}

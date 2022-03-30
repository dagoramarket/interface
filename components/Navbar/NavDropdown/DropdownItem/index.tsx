import { NavDropdown } from "react-bootstrap";

type Props =  {
  children: string | JSX.Element | JSX.Element[];
  href?: string;
}

export default function DropdownItem({ children, href }: Props): JSX.Element {
  return (
    <NavDropdown.Item href={href ? href : "#"}>{children}</NavDropdown.Item>
  );
}

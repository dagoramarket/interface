//create a NavDropdown functional component
import { NavDropdown as BSDropdown } from "react-bootstrap";
type Props =  {
  children: string | JSX.Element | JSX.Element[];
  title: string;
}

export default function NavDropdown({ children, title }: Props): JSX.Element {
  return (
    <BSDropdown
      menuVariant="dark"
      title={title}
      id="basic-nav-dropdown"
      align={"start"}
    >
      {children}
    </BSDropdown>
  );
}

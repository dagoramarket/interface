// create navbar react component

import { Container, Nav, Navbar as NavBarBootstrap } from "react-bootstrap";

type Props = {
  children: JSX.Element[];
};

export default function Navbar({ children }: Props): JSX.Element {
  const title = children.filter((child) => child.type.name == "NavLogo")[0];
  const items = children.filter((child) => child.type.name != "NavLogo");
  return (
    <NavBarBootstrap bg="dark" variant="dark" className="shadow mb-4" expand="lg" >
      <Container>
        {title}
        <NavBarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavBarBootstrap.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          <Nav>{items}</Nav>
        </NavBarBootstrap.Collapse>
      </Container>
    </NavBarBootstrap>
  );
}

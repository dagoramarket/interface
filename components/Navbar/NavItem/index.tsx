import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Nav } from "react-bootstrap";

type Props =  {
  children: string | JSX.Element | JSX.Element[];
  href?: string;
  icon?: IconDefinition;
  onClick?: () => void;
}

export default function NavItem({ href, children, icon, onClick }: Props): JSX.Element {
  return (
    <Nav.Link
      href={href ? href : "#"}
      className="d-flex justify-content-center align-items-center"
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon size="lg" icon={icon} />}
      <span className="d-lg-none ml-3">{children}</span>
    </Nav.Link>
  );
}

import Link from "next/link";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  href?: string;
  onClick?: () => void;
}

export function NavItem({ href, children }: Props): JSX.Element {
  return (
    <li>
      <Link href={href ? href : "#"} passHref>
        <a>{children}</a>
      </Link>
    </li>
  );
}

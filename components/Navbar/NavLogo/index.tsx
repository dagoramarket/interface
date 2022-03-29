import Link from "next/link";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  href: string;
}

export function NavLogo({ href, children }: Props): JSX.Element {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}

import type { AnchorHTMLAttributes, ReactNode } from 'react';

type NativeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

export function NativeLink({ href, children, ...props }: NativeLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

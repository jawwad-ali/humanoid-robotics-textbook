/// <reference types="react" />

declare module '@docusaurus/Link' {
  import type { ComponentProps } from 'react';
  export default function Link(props: ComponentProps<'a'> & { to: string }): JSX.Element;
}

declare module '@theme/Layout' {
  export default function Layout(props: {
    title?: string;
    description?: string;
    children: React.ReactNode;
  }): JSX.Element;
}

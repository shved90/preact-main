import { ComponentChildren } from 'preact';

interface HyperLinkProps {
    children: ComponentChildren
    href: string
    props?: any
}

const Hyperlink = ({ children, href, ...props }: HyperLinkProps) => {
    return (
        <a href={href} {...props} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    )
}


export { Hyperlink }
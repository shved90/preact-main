import { ComponentChildren } from 'preact';

interface HyperLinkProps {
    children: ComponentChildren
    href: string
    props?: any
}

const Hyperlink = ({ children, href, ...props }: HyperLinkProps) => {
    console.log(children, props)
    return (
        <a href={href} {...props} target="_blank" rel="noopener noreferrer">
            {children} 123123
        </a>
    )
}


export { Hyperlink }
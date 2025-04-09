
import { Post } from '../../gql/graphql'
import { useLocation } from 'preact-iso'
import { useRef, useEffect } from 'preact/hooks'

type SideNavProps = {
    data?: Post[]
}

const SideNav = ({ data }: SideNavProps) => {

    const nav = useRef<HTMLElement | null>(null)
    const { path } = useLocation()

    useEffect(() => {
        if (!nav.current) return // Prevent errors if ref is not assigned

        const navLinks = Array.from(nav.current.getElementsByTagName('a'))

        navLinks.map(link =>
            link.classList.toggle('activeNavLink', link.pathname === path)
        )
    }, [path]) // Runs when path changes
    

    


    const extraWide = '2xl:fixed 2xl:left 2xl:h-screen 2xl:w-[25.1%]'
    const linkStyling = 'bg-dark-500 hover:bg-dark-300 h-full w-full flex text-center justify-center items-center'
    const activeLinkStyling = 'bg-dark-300'
    return (
        <nav ref={nav} id="mainNav" class={`${extraWide} grid grid-rows-4 divide-y-2 divide-dark-300 h-screen border-solid border-r-2 border-dark-300`}>
            <a href="/" class={`${linkStyling} text-green`}>Home</a>
            <a href="/posts" class={`${linkStyling} text-blue`}>Blog</a>
            <a href="/resume" class={`${linkStyling} text-orange`}>Resume</a>
            <a href="/contact" class={`${linkStyling} text-purple`}>Contact</a>
        </nav>
    )
}

export { SideNav }
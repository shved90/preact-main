import { useLocation } from 'preact-iso'
import { useRef, useEffect, useState } from 'preact/hooks'

const SideNav = () => {

    const nav = useRef<HTMLElement | null>(null)
    const { path } = useLocation()

    const linkColors = {
        green: {
            hover: 'hover:bg-green/30',
            active: '!bg-green/50'
        },
        orange: {
            hover: 'hover:bg-orange/30',
            active: '!bg-orange/50'
        },
        blue: {
            hover: 'hover:bg-blue/30',
            active: '!bg-blue/50'
        },
        purple: {
            hover: 'hover:bg-purple/30',
            active: '!bg-purple/50'
        }
    }

    const [navLinks, setNavLinks] = useState([
        { href: '/', label: 'Home', color: linkColors.green, isActive: true },
        { href: '/blog', label: 'Blog', color: linkColors.orange, isActive: false },
        { href: '/resume', label: 'Resume', color: linkColors.blue, isActive: false },
        { href: '/contact', label: 'Contact', color: linkColors.purple, isActive: false },
    ])

    useEffect(() => {
        setNavLinks(prevLinks =>
            prevLinks.map(link => ({
                ...link,
                isActive: link.href === path,
            }))
        )
    }, [path])

    const mobile = `grid divide-y-2 bg-dark-500 divide-dark-300 border-solid border-r-2 border-dark-300 grid-cols-2`
    const desktop = `md:grid-flow-col md:grid-rows-1 md:grid-cols-4 min-h-full`
    const extraWide = `2xl:grid-flow-row 2xl:fixed 2xl:left-0 2xl:h-screen 2xl:w-[25%] 2xl:grid-cols-1 2xl:grid-rows-4`
    const navLinkStyles = {
        mobile: `text-white h-full w-full flex text-center justify-center items-center`,
        desktop: `min-h-20`,
        extraWide: ``
    }
    
    return (
        <nav ref={nav} id="mainNav" class={`${mobile} ${desktop} ${extraWide}`}>
            {navLinks.map(({ href, label, color, isActive }) => (
                <a href={href} class={`${navLinkStyles.mobile} ${navLinkStyles.desktop} ${navLinkStyles.extraWide} ${color.hover} ${isActive ? color.active : ''}`}>{label}</a>
            ))
            }
        </nav>
    )
}

export { SideNav }
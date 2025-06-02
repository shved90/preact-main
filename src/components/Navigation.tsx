import { useLocation } from 'preact-iso'
import { useRef, useEffect, useState } from 'preact/hooks'
import { ThemeColors } from '../utils/ThemeColor'

const Navigation = () => {

    const nav = useRef<HTMLElement | null>(null)
    const { path } = useLocation()

    const [navLinks, setNavLinks] = useState([
        { href: '/', label: 'Home', color: ThemeColors.green.background, isActive: true },
        { href: '/blog', label: 'Blog', color: ThemeColors.blue.background, isActive: false },
        { href: '/resume', label: 'Resume', color: ThemeColors.orange.background, isActive: false },
        { href: '/contact', label: 'Contact', color: ThemeColors.purple.background, isActive: false },
    ])

    useEffect(() => {
        setNavLinks(prevLinks =>
            prevLinks.map(link => ({
                ...link,
                isActive: link.href === path || path.startsWith(`${link.href}/`),
            }))
        )
    }, [path])

    const navStyles = {
        mobile: `grid divide-x-2 divide-y-2 border-solid grid-cols-2`,
        desktop: `md:grid-flow-col md:grid-rows-1 md:grid-cols-4 md:min-h-full`,
        extraWide: `xl:grid-flow-row xl:fixed xl:left-0 xl:h-screen xl:w-[25%] xl:grid-cols-1 xl:grid-rows-4 xl:border-r-2 xl:divide-x-0`,
        light: ``,
        dark: `dark:bg-dark-500 dark:divide-dark-300 dark:border-dark-300`
    }

    const navLinkStyles = {
        mobile: `h-full w-full flex text-center justify-center items-center last:border-b-2`,
        desktop: `min-h-20`,
        extraWide: `xl:last:border-b-0`,
        light: ``,
        dark: `dark:border-dark-300 dark:text-white`
    }

    const collectiveStyles = {
        nav: Object.values(navStyles).join(' ').trim(),
        links: Object.values(navLinkStyles).join(' ').trim()
    };

    return (
        <nav ref={nav} id="mainNav" class={collectiveStyles.nav}>
            {navLinks.map(({ href, label, color, isActive }) => (
                <a href={href} class={`${collectiveStyles.links} ${color.hover} ${isActive ? color.active : ''}`}>{label}</a>
            ))
            }
        </nav>
    )
}

export { Navigation }
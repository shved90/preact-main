import { useLocation } from 'preact-iso'
import { useRef, useEffect, useState } from 'preact/hooks'
import { ThemeColors } from '../utils/ThemeColor'

const Navigation = () => {

    const nav = useRef<HTMLElement | null>(null)
    const { path } = useLocation()

    const [navLinks, setNavLinks] = useState([
        { href: '/', label: 'Home', color: ThemeColors.green.background, isActive: true },
        { href: '/projects', label: 'Projects', color: ThemeColors.purple.background, isActive: false },
        { href: '/resume', label: 'Resume', color: ThemeColors.orange.background, isActive: false },
        { href: '/blog', label: 'Blog', color: ThemeColors.blue.background, isActive: false },
        { href: '/contact', label: 'Contact', color: ThemeColors.teal.background, isActive: false },
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
        mobile: `grid divide-x-2 divide-y-2 border-solid grid-cols-12 auto-cols-auto`,
        desktop: `md:grid-flow-col md:grid-rows-1 md:grid-cols-5 md:min-h-full`,
        extraWide: `xl:grid-flow-row xl:fixed xl:left-0 xl:h-screen xl:w-[25%] xl:grid-cols-1 xl:grid-rows-5 xl:border-r-2 xl:divide-x-0`,
        light: `bg-background-primary`,
        dark: `dark:bg-background-secondary dark:divide-border-primary dark:border-border-primary`
    }

    const navLinkStyles = {
        mobile: `h-full w-full flex text-center justify-center items-center last:border-b-2 col-span-4 nth-[4]:col-span-6 nth-[5]:col-span-6`,
        desktop: `min-h-20 md:col-span-1 md:nth-[4]:col-span-1 md:nth-[5]:col-span-1`,
        extraWide: `xl:last:border-b-0`,
        light: `border-border-secondary text-text-primary `,
        dark: `dark:border-border-primary dark:text-text-primary`,
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
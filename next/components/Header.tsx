import Link from "next/link";

const links = [
    {
        'href': '/tags',
        'label': 'Tags'
    },
    {
        'href': '/test',
        'label': 'Test'
    },
];

const Header = () => {
    return (<>
        <nav className="flex flex-row justify-between h-24 items-center p-10 space-x-10">
            <div>
                <Link href="/">
                    <a>
                        chrcit.com
                    </a>
                </Link>
            </div>
            <ul className="flex flex-row flex-grow space-x-5">
                {links.map(link => (
                    <li key={link.href}>
                        <Link href={link.href}>
                            <a>
                                {link.label}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </>)
}

export default Header;
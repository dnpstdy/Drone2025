'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Temp', href: '/tempLog' },
        { label: 'Config', href: '/' },
        { label: 'Logs', href: '/viewLog' },
    ];

    return (
        <div className="">
            <nav className="">
                <ul className="flex flex-row justify-center my-10 gap-24">
                    {navItems.map((item) => (
                        <li
                            key={item.href}
                            className={`mx-2 px-3 py-1 rounded ${
                                pathname === item.href ? 'unmuted' : 'unselected'
                            }`}
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

import Link from 'next/link'


const Navbar = () => {

    return (
                <div className="bg-white/15 fixed top-0 left-0 w-full z-50">
                <nav className="py-10 px-16">
                    <ul className="flex flex-row justify-end gap-8">
                    <li className="text-[#D7D7D7] font-semibold hover-underline-animation right">
                        <Link href="/">View Config</Link>
                    </li>
                    <li className="text-[#D7D7D7] font-semibold rounded-[15px] hover-underline-animation right">
                        <Link href="/tempLog">Temperature Log</Link>
                    </li>
                    <li className="text-[#D7D7D7] font-semibold rounded-[15px] hover-underline-animation right">
                        <Link href="/viewLog">View Logs</Link>
                    </li>
                    </ul>
                </nav>
                </div>
    );
};

export default Navbar;
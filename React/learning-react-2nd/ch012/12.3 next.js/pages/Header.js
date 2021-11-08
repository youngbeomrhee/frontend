import Link from 'next/link';

const linkStyle = {
    marginRight: 15,
    color: 'salmon'
};

export default function Header() {
    return (
        <div>
            <Link href='/'>
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href='Pets'>
                <a style={linkStyle}>Pets</a>
            </Link>
        </div>
    );
}
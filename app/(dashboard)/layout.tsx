import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="h-full w-[200px] border-r border-black/10 absolute">
        <h2 className="text-2xl px-2 py-6 border-b">Mood</h2>
        <ul>
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              <li className="px-2 py-6 text-lg border-b border-black/10">
                {link.label}
              </li>
            </Link>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout

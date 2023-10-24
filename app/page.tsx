import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  let { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full mx-auto max-w-[600px]">
        <h1 className="text-6xl mb-4">The Journal App</h1>
        <p className="text-2xl text-white/60 mb-4">
          The journal app provides you space to record your journal and analyse
          the mood.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

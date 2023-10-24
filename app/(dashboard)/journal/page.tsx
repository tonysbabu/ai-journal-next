import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: { analysis: true },
  })
  await analyze(
    `Today I was able to get a book I was dying to get for a while but I got a flat tyre while going to buy the book and waited for 2 hours in sun to get the tyres changed`
  )

  return entries
}

const Journal = async () => {
  const entries = await getEntries()
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journal</h1>
      <Question />
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard key={entry.id} entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Journal

import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  return await prisma.journalEntry.findUnique({
    where: {
      userId: user.id,
      id: id,
    },
    include: {
      analysis: true,
    },
  })
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage

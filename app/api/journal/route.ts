import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'My first Journal',
    },
  })

  const analysis = await analyze(entry.content)

  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}

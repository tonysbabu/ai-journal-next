import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  const user = await getUserByClerkId()
  const { content } = await req.json()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: {
      content,
    },
  })
  const analysis = await analyze(content)

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: { ...analysis },
  })

  return NextResponse.json({
    data: { ...updatedEntry, analysis },
  })
}

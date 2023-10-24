import { qa } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const user = await getUserByClerkId()
  const { question } = await req.json()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  console.log('answer POST', answer)

  return NextResponse.json({ data: answer })
}

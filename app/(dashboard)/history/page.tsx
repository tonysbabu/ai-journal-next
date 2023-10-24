import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkId()

  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((acc, current) => acc + current.sentimentScore, 0)
  const avg = analyses.length ? Math.round(sum / analyses.length) : 0

  return { avg, analyses }
}

const History = async () => {
  const { analyses, avg } = await getData()
  return (
    <div className="h-full w-full">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${avg}`}</h1>
      </div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History

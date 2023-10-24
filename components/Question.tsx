'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('form submit')
    const answer = await askQuestion(value)
    console.log('answer ', answer)

    setAnswer(answer)
    setIsLoading(false)
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="w-full px-2 py-6">
      <form onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          placeholder="Ask your question"
          className="px-2 py-3 rounded w-[700px] mr-5 border-black/10"
          onChange={onChange}
        />
        <button
          disabled={isLoading}
          className="bg-blue-400 text-white px-4 py-4 rounded"
          type="submit"
        >
          Ask
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {!isLoading && answer && <div>{answer}</div>}
    </div>
  )
}

export default Question

'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry?.analysis)
  const { subject, summary, mood, negative, color } = analysis

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updatedEntry = await updateEntry(entry.id, _value)
      setAnalysis(updatedEntry.analysis)
      setIsLoading(false)
    },
  })
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading....</div>}
        <textarea
          className="h-full w-full text-xl p-8"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            <li className="flex items-center justify-between border-b border-t border-black/10 px-2 py-6">
              <span className="text-lg semi-bold">Subject</span>
              <span>{subject}</span>
            </li>
            <li className="flex items-center justify-between border-b border-t border-black/10 px-2 py-6">
              <span className="text-lg semi-bold">Summary</span>
              <span>{summary}</span>
            </li>
            <li className="flex items-center justify-between border-b border-t border-black/10 px-2 py-6">
              <span className="text-lg semi-bold">Mood</span>
              <span>{mood}</span>
            </li>
            <li className="flex items-center justify-between border-b border-t border-black/10 px-2 py-6">
              <span className="text-lg semi-bold">Negative</span>
              <span>{negative ? 'True' : 'False'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor

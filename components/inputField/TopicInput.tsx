import React from 'react'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'

interface TopicInputProps {
  setTopic: (topic: string) => void;
  selectDifficultyLevel: (level: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ setTopic, selectDifficultyLevel }) => {
  return (
    <div className="mt-10 w-full flex flex-col items-center space-y-6">
      <h2 className="text-lg md:text-xl font-semibold text-center">
        Start Building Your Personalized AI Generated Material
      </h2>

      {/* Topic Input */}
      <Textarea 
        placeholder="Enter the topic you want to learn"
        className="w-full max-w-xl min-h-[100px] rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-sm focus:ring-2 focus:ring-neutral-500"
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* Difficulty Selection */}
      <div className="w-full max-w-xl space-y-2">
        <h2 className="text-lg font-semibold">Select the difficulty level</h2>
        <Select onValueChange={selectDifficultyLevel}>
          <SelectTrigger className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-sm">
            <SelectValue placeholder="Difficulty Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TopicInput

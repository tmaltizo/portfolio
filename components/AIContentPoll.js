import BasePoll from './BasePoll'

const POLL_ID = 'ai-content-poll-v1'
const QUESTION = "What's your biggest concern about AI-generated content like this?"

const OPTIONS = [
  { id: 'quality', label: 'Quality and authenticity issues' },
  { id: 'slop', label: 'Too much "AI slop" flooding the internet' },
  { id: 'jobs', label: 'Job displacement for human creators' },
  { id: 'excited', label: 'Excited about the creative possibilities' },
  { id: 'havent', label: 'Haven\'t really thought about it' },
]

export default function AIContentPoll() {
  return <BasePoll pollId={POLL_ID} question={QUESTION} options={OPTIONS} />
}

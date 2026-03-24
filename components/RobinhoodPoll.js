import BasePoll from './BasePoll'

const POLL_ID = 'rh-gold-poll-v1'
const QUESTION = 'Do you think the 3% flat rate is sustainable long-term?'

const OPTIONS = [
  { id: 'yes', label: 'Yes — Robinhood can afford it' },
  { id: 'maybe', label: 'Maybe — but expect tweaks within 2 years' },
  { id: 'no', label: 'No — it\'s a loss-leader that will get nerfed' },
  { id: 'unsure', label: 'Not sure yet' },
]

export default function RobinhoodPoll() {
  return <BasePoll pollId={POLL_ID} question={QUESTION} options={OPTIONS} />
}

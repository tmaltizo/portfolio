import BasePoll from './BasePoll'

const POLL_ID = 'chase-sapphire-poll-v1'
const QUESTION = 'What\'s your main reason for considering (or avoiding) the Chase Sapphire Preferred?'

const OPTIONS = [
  { id: 'travel', label: 'The travel protections and insurance' },
  { id: 'transfers', label: 'Ultimate Rewards transfer partners' },
  { id: 'dining', label: '3x on dining and streaming' },
  { id: 'fee', label: 'The $95 annual fee is too high' },
  { id: 'complex', label: 'Points system is too complicated' },
  { id: 'already', label: 'I already have it and love it' },
]

export default function ChaseSapphirePoll() {
  return <BasePoll pollId={POLL_ID} question={QUESTION} options={OPTIONS} />
}

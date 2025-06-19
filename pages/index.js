import Link from 'next/link'
import tokens from '../tokens.json'

const sortedTokens = [...tokens].sort((a, b) => b.jackpot - a.jackpot)

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏆 Leaderboard - GIFJACK.FUN</h1>
      <Link href='/create'>➕ Criar novo MemeToken</Link>
      <ul>
        {sortedTokens.map((token, idx) => (
          <li key={idx}>
            <Link href={`/token/${token.id}`}>
              <strong>{token.name}</strong> - {token.jackpot} SOL ({token.buys} buys)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
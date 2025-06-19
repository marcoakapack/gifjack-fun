import tokens from '../../tokens.json'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function TokenPage() {
  const router = useRouter()
  const { id } = router.query
  const token = tokens.find(t => t.id === id)
  const [message, setMessage] = useState('')

  if (!token) return <p>Token não encontrado.</p>

  async function buyToken() {
    const res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: token.id })
    })
    if (res.ok) {
      setMessage('Compra concluída! 💸 Atualize para ver o novo jackpot.')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{token.name}</h1>
      <img src={token.gif} width='300' alt={token.name} /><br />
      <p>{token.description}</p>
      <p>🎰 Jackpot: {token.jackpot} SOL</p>
      <p>💥 Compras: {token.buys}</p>
      <button onClick={buyToken}>Buy (0.1 SOL)</button>
      <p>{message}</p>
    </div>
  )
}
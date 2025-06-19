import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Create() {
  const [name, setName] = useState('')
  const [gif, setGif] = useState('')
  const [desc, setDesc] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch('/api/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, gif, description: desc })
    })
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>Criar MemeToken</h1>
      <input placeholder='$TOKEN' value={name} onChange={e => setName(e.target.value)} /><br />
      <input placeholder='Link do GIF' value={gif} onChange={e => setGif(e.target.value)} /><br />
      <textarea placeholder='Descrição' value={desc} onChange={e => setDesc(e.target.value)} /><br />
      <button type='submit'>Criar</button>
    </form>
  )
}
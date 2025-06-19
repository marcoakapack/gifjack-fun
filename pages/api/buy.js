import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'tokens.json')

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const token = data.find(t => t.id === req.body.id)
    if (token) {
      token.jackpot = (parseFloat(token.jackpot) + 0.1).toFixed(2)
      token.buys += 1
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      return res.status(200).json({ success: true })
    } else {
      return res.status(404).json({ error: 'Token not found' })
    }
  } else {
    res.status(405).end()
  }
}
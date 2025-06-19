import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'tokens.json')

export default function handler(req, res) {
  if (req.method === 'POST') {
    const token = {
      ...req.body,
      id: req.body.name.toLowerCase().replace(/\$/g, ''),
      jackpot: 0,
      buys: 0
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    data.push(token)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return res.status(200).json({ success: true })
  } else {
    res.status(405).end()
  }
}
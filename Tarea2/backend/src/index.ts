import cors from 'cors'
import express, { type Request, type Response } from 'express'
import os from 'node:os'
import { news } from './news.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)
const instanceId = process.env.INSTANCE_ID ?? 'local-instance'
const hostname = os.hostname()

app.disable('x-powered-by')
app.use(cors({ exposedHeaders: ['X-App-Instance', 'X-Container-Hostname'] }))
app.use(express.json())

app.use((_request, response, next) => {
  response.setHeader('X-App-Instance', instanceId)
  response.setHeader('X-Container-Hostname', hostname)
  response.setHeader('Cache-Control', 'no-store')
  next()
})

const requestMeta = () => ({
  servedBy: instanceId,
  hostname,
  timestamp: new Date().toISOString()
})

app.get('/health', (_request: Request, response: Response) => {
  response.json({ status: 'ok', ...requestMeta() })
})

app.get('/api/instance', (_request: Request, response: Response) => {
  response.json(requestMeta())
})

app.get('/api/news', (_request: Request, response: Response) => {
  const summaries = news.map(({ content: _content, ...article }) => article)
  response.json({ data: summaries, meta: requestMeta() })
})

app.get('/api/news/:slug', (request: Request, response: Response) => {
  const article = news.find((item) => item.slug === request.params.slug)

  if (!article) {
    response.status(404).json({ message: 'Noticia no encontrada', meta: requestMeta() })
    return
  }

  response.json({ data: article, meta: requestMeta() })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API ${instanceId} disponible en el puerto ${port}`)
})

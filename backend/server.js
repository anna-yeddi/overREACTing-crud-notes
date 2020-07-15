const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const app = new Koa()

app.use(cors())
app.use(koaBody({ json: true }))

const notes = [
  {
    content:
      "We need to sync the comms with the wider stakeholder community. Do we need to crystallize a plan for what's our go to market strategy?",
    id: 7070,
  },
  {
    content:
      "Do I have consent to record this meeting? We need to leverage our synergies. Who's the goto on this job with the way forward?",
    id: 7007,
  },
]
let nextId = 101

const router = new Router()

router.get('/notes', async (ctx, next) => {
  ctx.response.body = notes
})

router.post('/notes', async (ctx, next) => {
  notes.push({ ...ctx.request.body, id: nextId++ })
  ctx.response.status = 204
})

router.delete('/notes/:id', async (ctx, next) => {
  const noteId = Number(ctx.params.id)
  const index = notes.findIndex((o) => o.id === noteId)
  if (index !== -1) {
    notes.splice(index, 1)
  }
  ctx.response.status = 204
})

app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 7777
const server = http.createServer(app.callback())
server.listen(port, () => console.log('server started'))

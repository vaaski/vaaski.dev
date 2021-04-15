import got from "got"
import querystring from "querystring"

export interface FunctionsEvent {
  body: string
  path: string
  httpMethod: string
  queryStringParameters: Record<string, string>
  multiValueQueryStringParameters: Record<string, string>
  headers: Record<string, string>
  multiValueHeaders: Record<string, string>
  isBase64Encoded: boolean
}
export type Handler = (event: FunctionsEvent) => Promise<{ statusCode: number; body?: string }>

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_TO
const telegram = m => `https://api.telegram.org/bot${token}/${m}`

const send = async text => {
  const url = new URL(telegram("sendMessage"))

  const searchParams = {
    text,
    chat_id,
    disable_web_page_preview: true,
    parse_mode: "HTML",
    disable_notification: true,
  }

  Object.entries(searchParams).forEach(p => {
    url.searchParams.set(...p)
  })

  await got(url.toString(), { method: "POST" })
}

export const handler: Handler = async event => {
  console.log(event.body)
  const payload = querystring.parse(event.body)

  if (payload) {
    await send(JSON.stringify(payload, null, 2))
    return { statusCode: 200 }
  }

  return {
    statusCode: 404,
  }
}

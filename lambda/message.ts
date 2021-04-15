import got from "got"

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
export type Handler = (
  event: FunctionsEvent
) => Promise<{
  statusCode: number
  body?: string
  headers?: Record<string, string>
}>

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_TO
const telegram = (m: string) => `https://api.telegram.org/bot${token}/${m}`
const corsOrigins = ["https://vaaski.dev", "http://localhost:8080", "https://next.vaaski.dev"]
const cors = (headers: Record<string, string>) => {
  const origin = headers["origin"]

  if (corsOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
    }
  }

  return { "Access-Control-Allow-Origin": corsOrigins[0] }
}

const send = async (text: string) => {
  const url = new URL(telegram("sendMessage"))

  const searchParams = { text, chat_id }

  Object.entries(searchParams).forEach(p => {
    url.searchParams.set(...p)
  })

  await got(url.toString(), { method: "POST" })
}

export const handler: Handler = async event => {
  if (event.httpMethod.toLowerCase() !== "post") return { statusCode: 404 }
  const headers = { ...cors(event.headers) }

  const payload = JSON.parse(event.body) as Record<string, string>
  const message = Object.entries(payload)
    .map(([type, val]) => `${type}: ${val}`)
    .join("\n")

  if (payload) {
    await send(message)

    return {
      statusCode: 200,
      headers,
    }
  }

  return {
    statusCode: 404,
    headers,
  }
}

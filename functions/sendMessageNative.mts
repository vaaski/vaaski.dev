import type { Context } from "@netlify/functions"

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_TO
if (!token || !chat_id) throw new Error("missing env vars")

const telegramURL = (m: string) => `https://api.telegram.org/bot${token}/${m}`

export default async (req: Request, context: Context) => {
  if (req.method.toLowerCase() !== "post") {
    return new Response("Invalid request", { status: 405 })
  }

  console.log(req)
  const url = new URL(telegramURL("sendMessage"))
  const payload = await req.formData()

  payload.append("method", "native")
  const text = [...payload.entries()].map(([type, val]) => `${type}: ${val}`).join("\n")

  console.log(payload)
  console.log(text)
  if (payload && text) {
    const searchParams = { text, chat_id }
    for (const param of Object.entries(searchParams)) {
      url.searchParams.set(...param)
    }

    await fetch(url.toString(), { method: "POST" })
    return Response.redirect("/", 302)
  }

  return new Response("Invalid request", { status: 400 })
}

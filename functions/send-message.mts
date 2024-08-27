import { verifySolution } from "altcha-lib"

const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.TELEGRAM_TO
const hmacKey = process.env.HMAC_KEY
if (!token || !chat_id || !hmacKey) throw new Error("missing env vars")

const telegramURL = (m: string) => `https://api.telegram.org/bot${token}/${m}`

export default async (request: Request) => {
	if (request.method.toLowerCase() !== "post") {
		return new Response("Invalid request", { status: 400 })
	}

	const url = new URL(telegramURL("sendMessage"))
	const payload: Record<string, string> = await request.json()

	const text = Object.entries(payload)
		.filter(([type]) => type !== "captcha")
		.map(([type, value]) => `${type}: ${value}`)
		.join("\n")

	const ok = await verifySolution(payload.captcha, hmacKey)
	if (!ok) return new Response("Invalid captcha", { status: 403 })

	if (payload && text) {
		const searchParameters = { text, chat_id }
		for (const parameter of Object.entries(searchParameters)) {
			url.searchParams.set(...parameter)
		}

		await fetch(url.toString(), { method: "POST" })
		return new Response("Message sent", { status: 200 })
	}

	return new Response("Invalid request", { status: 400 })
}

import type { Context } from "@netlify/functions"
import { createChallenge } from "altcha-lib"

const hmacKey = process.env.HMAC_KEY
if (!hmacKey) throw new Error("missing env var")

export default async (req: Request, context: Context) => {
	// Create a new challenge and send it to the client:
	const challenge = await createChallenge({
		hmacKey,
		maxNumber: 100000, // the maximum random number
	})

	console.log(challenge)
	return new Response(JSON.stringify(challenge), {
		headers: {
			"Content-Type": "application/json",
		},
	})
}

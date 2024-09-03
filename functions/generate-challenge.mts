import { createChallenge } from "altcha-lib"

const hmacKey = process.env.HMAC_KEY
if (!hmacKey) throw new Error("missing env var")

export default async () => {
	const challenge = await createChallenge({
		hmacKey,
		maxNumber: 100_000,
	})

	return new Response(JSON.stringify(challenge), {
		headers: {
			"Content-Type": "application/json",
		},
	})
}

export default (t: number): Promise<void> =>
	new Promise((r) => setTimeout(r, t))

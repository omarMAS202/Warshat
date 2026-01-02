export function createFakeJwt(payload: Record<string, unknown>) {
  const header = { alg: "HS256", typ: "JWT" }
  const enc = (obj: unknown) => btoa(JSON.stringify(obj))
  const h = enc(header)
  const p = enc(payload)
  const s = btoa("secret:" + h + "." + p)
  return `${h}.${p}.${s}`
}

export function decodeFakeJwt(token: string) {
  const parts = token.split(".")
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch {
    return null
  }
}

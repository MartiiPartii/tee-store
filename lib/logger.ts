type LogMeta = Record<string, unknown>

function prismaExtras(err: unknown): LogMeta {
    if (typeof err !== "object" || err === null) return {}
    const o = err as Record<string, unknown>
    const out: LogMeta = {}
    if ("code" in o) out.prismaCode = o.code
    if ("meta" in o) out.prismaMeta = o.meta
    if ("clientVersion" in o) out.clientVersion = o.clientVersion
    return out
}

/** Server-side errors: always log message; stack only outside production. */
export function logServerError(context: string, err: unknown, meta?: LogMeta) {
    const time = new Date().toISOString()
    const extra = { ...meta, ...prismaExtras(err) }
    const metaStr = Object.keys(extra).length ? ` ${JSON.stringify(extra)}` : ""
    console.error(`[tee-store] ${time} ERROR | ${context}${metaStr}`)
    if (err instanceof Error) {
        console.error(`  → ${err.name}: ${err.message}`)
        if (process.env.NODE_ENV !== "production" && err.stack) {
            console.error(err.stack)
        }
    } else {
        console.error("  →", err)
    }
}

export function logServerWarn(context: string, message: string, meta?: LogMeta) {
    const time = new Date().toISOString()
    const metaStr = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ""
    console.warn(`[tee-store] ${time} WARN | ${context} | ${message}${metaStr}`)
}

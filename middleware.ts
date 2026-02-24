// OpenNext (Cloudflare) requires a `middleware` export — it does not yet support
// the Next.js 16 `proxy.ts` convention. This file bridges the two: logic lives
// in `proxy.ts` (Next.js 16 convention), re-exported here as `middleware` for
// OpenNext compatibility. Remove this file once OpenNext supports `proxy.ts`.
export const runtime = 'edge';
export { proxy as middleware, config } from './proxy';

/**
 * Cloudflare Worker entry point.
 * Based on vinext deploy template (app router).
 */
import { handleImageOptimization } from 'vinext/server/image-optimization';
import handler from 'vinext/server/app-router-entry';

interface Fetcher {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
}

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

function hasFileExtension(pathname: string): boolean {
  const segment = pathname.split('/').pop() ?? '';
  return segment.includes('.');
}

function docsAssetCandidates(pathname: string): string[] {
  if (pathname === '/docs' || pathname === '/docs/') {
    return ['/docs.html', '/docs/index.html'];
  }

  const docsPath = pathname.replace(/^\/docs/, '') || '/';
  const base = `/docs${docsPath}`;

  if (hasFileExtension(pathname)) {
    return [base];
  }

  if (pathname.endsWith('/')) {
    return [`${base}index.html`, `${base}`];
  }

  return [`${base}.html`, `${base}/index.html`, `${base}`];
}

async function tryServeDocsAsset(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/docs')) return null;

  for (const candidatePath of docsAssetCandidates(url.pathname)) {
    const candidateUrl = new URL(candidatePath, url.origin);
    const response = await env.ASSETS.fetch(new Request(candidateUrl, request));
    if (response.status !== 404) return response;
  }

  return null;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Image optimization via Cloudflare Images binding
    if (url.pathname === '/_vinext/image') {
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES
            .input(body)
            .transform(width > 0 ? { width } : {})
            .output({ format, quality });
          return result.response();
        },
      });
    }

    const docsResponse = await tryServeDocsAsset(request, env);
    if (docsResponse) return docsResponse;

    // Delegate everything else to vinext
    return handler.fetch(request);
  },
};

export default worker;

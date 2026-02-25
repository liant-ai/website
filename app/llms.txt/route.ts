import { source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const lines: string[] = [];
  lines.push('# defuse');
  lines.push('');
  lines.push('> Composable terminal platform for AI-assisted development');
  lines.push('');
  lines.push('## Docs');
  lines.push('');
  for (const page of source.getPages()) {
    lines.push(
      `- [${page.data.title}](${page.url}.mdx): ${page.data.description}`,
    );
  }
  lines.push('');
  lines.push('## Full docs');
  lines.push('');
  lines.push(
    '- [Complete documentation](/llms-full.txt): All pages as a single markdown file',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Signal': 'agentic=yes, search=yes, training=no',
    },
  });
}

import React from 'react';
import type { Props } from '@theme/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import { PageActions } from '@site/src/components/PageActions';

function toBlobUrl(editUrl?: string | null): string | undefined {
  if (!editUrl) return undefined;
  if (editUrl.includes('github.com') && editUrl.includes('/edit/')) {
    return editUrl.replace('/edit/', '/blob/');
  }
  return editUrl;
}

function toRawUrl(editUrl?: string | null): string | undefined {
  if (!editUrl) return undefined;
  const githubEdit = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/(edit|blob)\/([^/]+)\/(.+)/;
  const match = editUrl.match(githubEdit);
  if (!match) return undefined;
  const [, owner, repo, , branch, filePath] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

function toSectionLabel(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([^/]+)/);
  if (!match) return null;
  const segment = match[1];
  if (segment === 'getting-started') return 'Getting Started';
  if (segment === 'concepts') return 'Concepts';
  if (segment === 'reference') return 'Reference';
  return null;
}

export default function DocItemContent(props: Props) {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const location = useLocation();
  const githubUrl = toBlobUrl(metadata.editUrl);
  const markdownUrl = toRawUrl(metadata.editUrl);
  const syntheticTitle = !frontMatter.hide_title && typeof contentTitle === 'undefined' ? metadata.title : null;
  const description = metadata.description?.trim();
  const sectionLabel = toSectionLabel(location.pathname);
  const shouldShowSection = Boolean(sectionLabel && metadata.permalink !== '/docs');

  return (
    <div className="theme-doc-markdown markdown">
      {shouldShowSection && <p className="doc-section-kicker">{sectionLabel}</p>}
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          {description && <p className="doc-page-description">{description}</p>}
        </header>
      )}
      <PageActions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      <MDXContent>{props.children}</MDXContent>
    </div>
  );
}

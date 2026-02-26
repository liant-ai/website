import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { useActiveVersion, useDocById } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocPaginator';
import type { PropNavigationLink } from '@docusaurus/plugin-content-docs';

function findDocIdByLink(version: ReturnType<typeof useActiveVersion>, link?: PropNavigationLink): string | undefined {
  if (!version || !link) return undefined;

  const byPermalink = version.docs.find(
    (doc) =>
      doc.path === link.permalink ||
      doc.path.endsWith(link.permalink) ||
      link.permalink.endsWith(doc.path)
  );
  if (byPermalink) return byPermalink.id;
  return undefined;
}

function NavLink({
  link,
  subLabel,
  isNext,
  description,
}: {
  link: PropNavigationLink;
  subLabel: React.ReactNode;
  isNext?: boolean;
  description?: string;
}) {
  return (
    <Link
      className={clsx('pagination-nav__link', isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev')}
      to={link.permalink}
    >
      <div className="pagination-nav__sublabel">{subLabel}</div>
      <div className="pagination-nav__label">{link.title}</div>
      {description && <div className="pagination-nav__desc">{description}</div>}
    </Link>
  );
}

export default function DocPaginator(props: Props) {
  const { className, previous, next } = props;
  const activeVersion = useActiveVersion(undefined);

  const previousId = findDocIdByLink(activeVersion, previous);
  const nextId = findDocIdByLink(activeVersion, next);
  const previousDoc = useDocById(previousId);
  const nextDoc = useDocById(nextId);

  return (
    <nav
      className={clsx(className, 'pagination-nav')}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}
    >
      {previous && (
        <NavLink
          link={previous}
          description={previousDoc?.description}
          subLabel={
            <Translate id="theme.docs.paginator.previous" description="The label used to navigate to the previous doc">
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <NavLink
          link={next}
          description={nextDoc?.description}
          subLabel={
            <Translate id="theme.docs.paginator.next" description="The label used to navigate to the next doc">
              Next
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}

import { join } from 'path';
import { readdirSync } from 'fs';
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import type { MarkdownRenderingResult } from '@nx-nextjs/markdown';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@nx-nextjs/markdown';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube: dynamic(async () => {
    const components = await import(
      '@nx-nextjs/shared/mdx-elements/youtube/youtube'
    );
    return components.Youtube;
  }),
  // a: CustomLink,
};

const POSTS_PATH = join(process.cwd(), process.env.articleMarkdownPath);

export function Article({ frontMatter, html }) {
  return (
    <div className="md:container md:mx-auto">
      <article>
        <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">
          {frontMatter.title}
        </h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr />

      <MDXRemote {...html} components={mdxElements} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<MarkdownRenderingResult> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );
  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Article;

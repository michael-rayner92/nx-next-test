import type { MarkdownDocument } from './types';
import { join } from 'path';
import { readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export const getParsedFileContentBySlug = (
  fileName: string,
  postsPath: string
): MarkdownDocument => {
  const postFilePath = join(postsPath, `${fileName}.mdx`);
  const fileContent = readFileSync(postFilePath);

  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
};

export const renderMarkdown = async (markdownContent: string) => {
  return serialize(markdownContent || '');
};

import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const articlesDir = path.join(process.cwd(), "src", "content", "articles");

export async function getMDXContent(slug: string): Promise<MDXRemoteSerializeResult | null> {
  try {
    const filePath = path.join(articlesDir, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const source = fs.readFileSync(filePath, "utf8");
    return await serialize(source, { parseFrontmatter: false });
  } catch {
    return null;
  }
}

import type { Route } from "next";
import { createElement } from "react";

import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

import { icons } from "lucide-react";

import { docs, people } from "@/.source";

import {
  LogoBafang,
  LogoBosch,
  LogoShimano,
  LogoYamaha,
} from "@/components/shared/icons";

const LLM_MDX_SUFFIX = ".md";

export const peopleSource = loader(createMDXSource(people), {
  baseUrl: "/people",
  icon: resolveIcon,
});

export type PersonPage = InferPageType<typeof peopleSource>;

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon: resolveIcon,
});

export type DocsPage = InferPageType<typeof docsSource>;

export function getDocsMdxPath(page: DocsPage): Route<`/docs-llm/${string}`> {
  return `/docs-llm/${page.slugs.join("/")}${LLM_MDX_SUFFIX}`;
}

const CUSTOM_ICON_MAP = {
  LogoBosch,
  LogoShimano,
  LogoBafang,
  LogoYamaha,
};

function resolveIcon(icon?: string) {
  if (!icon) return;
  const CustomIcon = CUSTOM_ICON_MAP[icon as keyof typeof CUSTOM_ICON_MAP];
  if (CustomIcon) return createElement(CustomIcon);

  const LucideIcon = icons[icon as keyof typeof icons];
  if (!LucideIcon) {
    console.warn(`[icon-resolver] Unknown icon detected: ${icon}.`);
    return;
  }
  return createElement(LucideIcon);
}

export function getDocsMdxSlug(page: DocsPage): Array<string> {
  const slugs = [...page.slugs]; // make a copy, messes with the build otherwise

  // add md extension
  const last = slugs.pop();
  slugs.push(`${last}${LLM_MDX_SUFFIX}`);

  return slugs;
}

export function getDocsPageFromMdxUrl(
  slug: Array<string>,
): DocsPage | undefined {
  const slugs = [...slug];
  if (slugs.length > 0) {
    const s = slugs.pop();
    if (s) slugs.push(s.replace(LLM_MDX_SUFFIX, ""));
  }
  return docsSource.getPage(slugs);
}

export async function getDocsLLMText(page: DocsPage) {
  const processed = await page.data.getText("processed");
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}

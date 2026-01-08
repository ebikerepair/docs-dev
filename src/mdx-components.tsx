import * as CalloutGBComponents from "@/components/mdx/CalloutGB";
import { ImageZoomWithCaption } from "@/components/mdx/ImageZoomWithCaption";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";

import type { MDXComponents } from "mdx/types";

import { Mermaid } from "@/components/mdx/Mermaid";
import * as ShowcaseComponents from "@/components/mdx/Showcase";


export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,

    // fumadocs extensions
    img: (props) => (
      <ImageZoomWithCaption {...(props as unknown as ImageZoomProps)} />
    ),
    ImageZoomWithCaption,
    ...TabsComponents,

    // custom components
    Mermaid,
    ...ShowcaseComponents,
    ...CalloutGBComponents,

    // passthrough and overrides
    ...components,
  };
}

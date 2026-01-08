"use client";

import type { ReactNode } from "react";
import { cloneElement } from "react";

import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";

import type { UncontrolledProps } from "react-medium-image-zoom";

type ImageZoomWithCaptionProps = ImageZoomProps & { caption?: ReactNode };

export function ImageZoomWithCaption({
  caption,
  rmiz,
  ...props
}: ImageZoomWithCaptionProps) {
  const inferredCaption =
    caption ?? (typeof props.alt === "string" ? props.alt : undefined);
  const ZoomContent = rmiz?.ZoomContent;

  const zoomContentWithCaption: UncontrolledProps["ZoomContent"] = (data) => {
    const baseImg = data.img as React.ReactElement | null;

    const fallbackContent = () => {
      if (!baseImg) return null;
      const { props: imgProps } = baseImg;
      return cloneElement(baseImg, {
        className: `${imgProps.className ?? ""} max-w-full h-auto`,
        style: {
          ...(imgProps.style ?? {}),
          position: "static",
          transform: "none",
        },
      });
    };

    const content = ZoomContent ? ZoomContent(data) : fallbackContent();

    if (!inferredCaption) return content;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        {content ?? data.img}
        {data.buttonUnzoom}
        <p className="pointer-events-none z-10 max-w-[90vw] text-center text-sm text-black dark:text-white drop-shadow-md">
          {inferredCaption}
        </p>
      </div>
    );
  };

  return (
    <ImageZoom
      {...props}
      rmiz={{
        ...rmiz,
        ZoomContent: zoomContentWithCaption,
      }}
    />
  );
}

"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";

import type { UncontrolledProps } from "react-medium-image-zoom";

type ImageZoomWithCaptionProps = ImageZoomProps & { caption?: ReactNode };
type ZoomImageProps = {
  className?: string;
  style?: CSSProperties;
};

export function ImageZoomWithCaption({
  caption,
  rmiz,
  ...props
}: ImageZoomWithCaptionProps) {
  const inferredCaption =
    caption ?? (typeof props.alt === "string" ? props.alt : undefined);
  const ZoomContent = rmiz?.ZoomContent;

  const zoomContentWithCaption: UncontrolledProps["ZoomContent"] = (data) => {
    const baseImg = data.img as ReactElement<ZoomImageProps> | null;

    const fallbackContent = () => {
      if (!baseImg || !isValidElement(baseImg)) return null;
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
    const resolvedContent = content ?? data.img ?? <span />;

    if (!inferredCaption) return resolvedContent;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        {resolvedContent}
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

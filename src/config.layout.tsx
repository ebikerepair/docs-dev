import type { LinkItemType } from "fumadocs-ui/layouts/shared";

import { FileTextIcon, HandHeartIcon, HandshakeIcon } from "lucide-react";

export const linkItems: Array<LinkItemType> = [
  // main navigation
  {
    icon: <FileTextIcon />,
    text: "Documentation",
    url: "/docs",
  },
  {
    icon: <HandshakeIcon />,
    text: "About us",
    url: "/about",
  },
  {
    icon: <HandHeartIcon />,
    text: "Sponsors",
    url: "/funding",
  },
];

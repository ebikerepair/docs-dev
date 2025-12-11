export const SITE_NAME = "EBR Docs";

export const GITHUB_URL = "https://github.com/ebikerepair";
export const INSTAGRAM_URL = "https://www.instagram.com/ebikerepair.eu";

export const DOCS_GITHUB_OWNER = "ebikerepair";
export const DOCS_GITHUB_REPO = "docs-dev";
export const DOCS_GITHUB_BRANCH = "main";

export const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST || "localhost:3000";
export const SITE_PROTOCOL = `http${process.env.NODE_ENV === "production" ? "s" : ""}:`;
export const SITE_BASE_URL = `${SITE_PROTOCOL}//${SITE_HOST}`;

export const IS_LIVE =
  process.env.NODE_ENV === "production" && !SITE_HOST.includes("localhost");

export const PLAUSIBLE_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || false;

export const METADATA_KEYWORDS_DEFAULT = [
  "EBR",
  "EBR Docs",
  "EBR Wiki",
  "EBR KB",
  "E-Bike Repair",
  "EBike Repair",
  "MTB",
  "EMTB",
  "E-MTB",
  "Pedelec",
  "S-Pedelec",
  "Speed Bike",
  "Fast Bike",
  "Speed E-Bike",
  "Speed EBike",
  "Fast E-Bike",
  "Fast EBike",
  "E-Bike Tuning",
  "EBike Tuning",
  "OSS",
  "OSHW",
  "Open Source",
  "Open Source Hardware",
  "Open Source Software",
  "Umbaukit",
  "Umbaukits",
  "Umbau-Kit",
  "Umbau-Kits",
  "Umbau Kit",
  "Umbau Kits",
  "Converison-Kit",
  "Converison-Kits",
  "Converison Kit",
  "Converison Kits",
];
export const METADATA_KEYWORDS_DEFAULT_DOCS = [
  "Documentation",
  "Docs",
  "User Guide",
  "Documentation",
  "Anleitung",
];

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  year: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  palette: string[];
  capabilities: string[];
  challenge: string;
  solution: string;
  approach: string;
  websitePreview: {
    heroTitle: string;
    heroSubtitle: string;
    navigation: string[];
    statement: string;
    highlightMetric?: string;
    highlightLabel?: string;
    taglineBottom?: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  tags: string[];
}

export interface ProcessPhase {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
}

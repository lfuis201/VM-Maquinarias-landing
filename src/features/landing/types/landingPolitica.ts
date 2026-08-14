export interface PolicySection {
  title: string;
  content: string;
}

export interface LandingPoliticaConfig {
  id?: number;
  title?: string;
  lastUpdated?: string;
  introText?: string;
  sections?: PolicySection[];
  createdAt?: string;
  updatedAt?: string;
}

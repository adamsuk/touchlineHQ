// Core club information
export interface ClubSocials {
  github: string;
  twitter: string;
  linkedin: string;
}

export interface AboutItem {
  icon: string;
  title: string;
  text: string;
}

export interface Club {
  name: string;
  tagline: string;
  description: string;
  email: string;
  domain: string;
  socials: ClubSocials;
  primaryColor?: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: AboutItem[];
}

// Feature listing
export interface Feature {
  title: string;
  description: string;
  details: string[];
}

// Open source repository
export interface Repo {
  name: string;
  description: string;
  url: string;
  tech: string[];
  features: string[];
}

// Contact information
export interface Contact {
  email: string;
  social: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  message: string;
}

// Live feed types (from fulltimeFeeds)
export interface LiveFixture {
  id: string;
  date: string;
  time: string;
  home_team: string;
  away_team: string;
  venue: string;
  division: string;
  league: string;
  team: string;
  home_away: 'home' | 'away';
  opponent: string;
}

export interface LiveResult extends LiveFixture {
  home_score: number | null;
  away_score: number | null;
  goals_for: number | null;
  goals_against: number | null;
}

export interface ClubFeed {
  club: string;
  generated: string;
  fixtures: LiveFixture[];
  results: LiveResult[];
}

export interface LiveTeam {
  name: string;
  slug: string;
  league: string;
}

export interface TeamFeed {
  team: string;
  league: string;
  generated: string;
  fixtures: Omit<LiveFixture, 'team' | 'home_away' | 'opponent'>[];
  results: Omit<LiveResult, 'team' | 'home_away' | 'opponent' | 'goals_for' | 'goals_against'>[];
}

// Main app data
export interface AppData {
  club: Club;
  features: Feature[];
  repos: Repo[];
  contact: Contact;
  clubFeed: ClubFeed | null;
  liveTeams: LiveTeam[];
}
import type { AppData, Club, Feature, Repo, Contact, ClubFeed, LiveTeam, TeamFeed } from './types';

const BASE = 'data/';
const FEEDS_BASE = 'https://raw.githubusercontent.com/touchlineHQ/fulltimeFeeds/main/feeds/';
const CALENDARS_BASE = 'https://raw.githubusercontent.com/touchlineHQ/fulltimeFeeds/main/calendars/';
const INDEX_URL = `${FEEDS_BASE}index.json`;
const CLUBS_API_URL = 'https://api.github.com/repos/touchlineHQ/fulltimeFeeds/contents/feeds/clubs';

export interface FeedTeamEntry {
  name: string;
  slug: string;
  league: string;
}

/** Fetch the list of available club feed slugs from the clubs directory. */
export async function loadClubSlugs(): Promise<string[]> {
  try {
    const res = await fetch(CLUBS_API_URL);
    if (!res.ok) return [];
    const files = await res.json() as { name: string }[];
    return files
      .filter(f => f.name.endsWith('.json'))
      .map(f => f.name.replace('.json', ''))
      .sort();
  } catch {
    return [];
  }
}

/** Fetch the full feed index — every team across all leagues. */
export async function loadAllFeedTeams(): Promise<FeedTeamEntry[]> {
  try {
    const res = await fetch(INDEX_URL);
    if (!res.ok) return [];
    const data = await res.json() as { leagues: { slug: string; teams: { name: string; slug: string }[] }[] };
    const teams: FeedTeamEntry[] = [];
    for (const league of data.leagues) {
      for (const team of league.teams) {
        teams.push({ name: team.name, slug: team.slug, league: league.slug });
      }
    }
    return teams;
  } catch {
    return [];
  }
}

export function teamFeedUrl(league: string, slug: string): string {
  return `${FEEDS_BASE}${league}/teams/${slug}.json`;
}

export function teamCalendarUrl(league: string, slug: string): string {
  return `${CALENDARS_BASE}${league}/${slug}.ics`;
}

export async function loadTeamFeed(league: string, slug: string): Promise<TeamFeed | null> {
  try {
    const res = await fetch(teamFeedUrl(league, slug));
    if (!res.ok) return null;
    return res.json() as Promise<TeamFeed>;
  } catch {
    return null;
  }
}

async function load<T>(file: string): Promise<T> {
  const res = await fetch(BASE + file);
  if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function loadClubFeed(feedSlug: string): Promise<ClubFeed | null> {
  try {
    const res = await fetch(`${FEEDS_BASE}clubs/${feedSlug}.json`);
    if (!res.ok) return null;
    return res.json() as Promise<ClubFeed>;
  } catch {
    return null;
  }
}

/** Load all static data for the marketing site */
export async function loadAllData(): Promise<AppData> {
  const [club, features, repos, contact] = await Promise.all([
    load<Club>('club.json'),
    load<Feature[]>('features.json'),
    load<Repo[]>('repos.json'),
    load<Contact>('contact.json'),
  ]);

  // No feeds loaded by default; they are loaded on demand in the demo
  return {
    club,
    features,
    repos,
    contact,
    clubFeed: null,
    liveTeams: [],
  };
}
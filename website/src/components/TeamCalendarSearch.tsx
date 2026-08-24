import { useEffect, useMemo, useState } from 'react';
import {
  Select, Loader, Alert, Stack, Title, Group, Button, Paper, Text, Badge, Code,
} from '@mantine/core';
import {
  IconAlertCircle, IconSearch, IconDownload, IconBrandGoogle, IconCopy, IconCheck, IconCalendarPlus,
} from '@tabler/icons-react';
import {
  loadAllFeedTeams, loadTeamFeed, teamCalendarUrl, googleCalendarSubscribeUrl,
} from '../data';
import type { FeedTeamEntry } from '../data';
import type { TeamFeed } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

const optionValue = (t: FeedTeamEntry) => `${t.league}\0${t.slug}`;

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export function TeamCalendarSearch() {
  const [teams, setTeams] = useState<FeedTeamEntry[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [feed, setFeed] = useState<TeamFeed | null>(null);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    loadAllFeedTeams()
      .then(loaded => {
        setTeams([...loaded].sort((a, b) => a.name.localeCompare(b.name)));
        setLoadingTeams(false);
      })
      .catch(err => {
        console.error('Failed to load team list:', err);
        setError('Unable to load the team list. Please try again later.');
        setLoadingTeams(false);
      });
  }, []);

  const selectedEntry = useMemo(
    () => teams.find(t => optionValue(t) === selected) ?? null,
    [teams, selected]
  );

  useEffect(() => {
    setCopied(false);
    setCopyFailed(false);
    if (!selectedEntry) {
      setFeed(null);
      setLoadingFeed(false);
      return;
    }

    setLoadingFeed(true);
    setError(null);
    let isCurrent = true;
    loadTeamFeed(selectedEntry.league, selectedEntry.slug)
      .then(loaded => {
        if (!isCurrent) return;
        if (loaded === null) {
          setError(`Unable to load fixtures for ${selectedEntry.name}. The feed may be temporarily unavailable.`);
          setFeed(null);
        } else {
          setFeed(loaded);
        }
        setLoadingFeed(false);
      })
      .catch(err => {
        if (!isCurrent) return;
        console.error('Failed to load team feed:', err);
        setError(`Unable to load fixtures for ${selectedEntry.name}. The feed may be temporarily unavailable.`);
        setFeed(null);
        setLoadingFeed(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [selectedEntry]);

  const nextFixtures = useMemo(() => {
    if (!feed) return [];
    return [...feed.fixtures]
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, 3);
  }, [feed]);

  const options = useMemo(
    () => teams.map(t => ({
      value: optionValue(t),
      label: t.leagueName ? `${t.name} — ${t.leagueName}` : t.name,
    })),
    [teams]
  );

  const copyUrl = async () => {
    if (!selectedEntry) return;
    const ok = await copyTextToClipboard(teamCalendarUrl(selectedEntry.league, selectedEntry.slug));
    if (!ok) {
      setCopyFailed(true);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack gap="md">
      <Select
        label="Search for your team"
        placeholder="Type team name (e.g., 'East Leake', 'West Bridgford')"
        data={options}
        value={selected}
        onChange={setSelected}
        searchable
        clearable
        limit={50}
        nothingFoundMessage="No team found"
        leftSection={<IconSearch size={16} />}
        disabled={loadingTeams}
        size="md"
      />

      {loadingTeams && <Loader size="sm" />}
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" title="Error">
          {error}
        </Alert>
      )}
      {loadingFeed && <Loader size="sm" />}

      {selectedEntry && !loadingFeed && (
        <Stack gap="lg">
          <Group justify="space-between" wrap="wrap" gap="md">
            <Stack gap={4}>
              <Title order={3}>{selectedEntry.name}</Title>
              {selectedEntry.leagueName && (
                <Text size="sm" c="dimmed">{selectedEntry.leagueName}</Text>
              )}
            </Stack>
            {feed?.generated && (
              <Text size="xs" c="dimmed">
                Updated {new Date(feed.generated).toLocaleDateString('en-GB')}
              </Text>
            )}
          </Group>

          <Group gap="sm" wrap="wrap">
            <Button
              component="a"
              href={teamCalendarUrl(selectedEntry.league, selectedEntry.slug)}
              download
              leftSection={<IconDownload size={18} />}
              color="green.6"
              radius="xl"
            >
              Download .ics
            </Button>
            <Button
              component="a"
              href={googleCalendarSubscribeUrl(selectedEntry.league, selectedEntry.slug)}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGoogle size={18} />}
              variant="light"
              color="green.6"
              c="green.9"
              style={{
                '--button-bg': 'var(--mantine-color-green-1)',
                '--button-hover': 'var(--mantine-color-green-0)',
              }}
              radius="xl"
            >
              Add to Google Calendar
            </Button>
            <Button
              onClick={copyUrl}
              leftSection={copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              variant="outline"
              color="green.6"
              radius="xl"
            >
              {copied ? 'Copied!' : 'Copy feed URL'}
            </Button>
          </Group>

          {copyFailed && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" title="Copy failed">
              Couldn't access your clipboard — please select and copy the URL below manually.
            </Alert>
          )}

          <Text size="xs" c="dimmed">
            Subscribe with this URL in any calendar app:{' '}
            <Code>{teamCalendarUrl(selectedEntry.league, selectedEntry.slug)}</Code>
          </Text>

          <Stack gap="xs">
            <Group gap="xs">
              <IconCalendarPlus size={16} color="var(--mantine-color-green-6)" />
              <Text fw={600} size="sm">Next fixtures</Text>
            </Group>
            {nextFixtures.length === 0 ? (
              <Text size="sm" c="dimmed">No upcoming fixtures published yet.</Text>
            ) : (
              nextFixtures.map(f => (
                <Paper key={f.id} p="sm" withBorder radius="md">
                  <Group justify="space-between" wrap="wrap" gap="xs" mb={4}>
                    <Badge variant="light" size="xs">{f.division}</Badge>
                    <Text size="xs" c="dimmed">{formatDate(f.date)} · {f.time}</Text>
                  </Group>
                  <Text fw={700} size="sm" ta="center">
                    {f.home_team} vs {f.away_team}
                  </Text>
                  <Text size="xs" c="dimmed" ta="center">{f.venue}</Text>
                </Paper>
              ))
            )}
          </Stack>
        </Stack>
      )}

      {!selectedEntry && !loadingTeams && !error && (
        <Alert icon={<IconSearch size={16} />} color="blue" title="Find your team">
          Search for your team above, then download the calendar file or subscribe to get every fixture added automatically to Google Calendar, Apple Calendar or Outlook.
        </Alert>
      )}
    </Stack>
  );
}

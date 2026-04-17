import { useState, useEffect } from 'react';
import { Select, Loader, Alert, Stack, Title } from '@mantine/core';
import { IconAlertCircle, IconSearch } from '@tabler/icons-react';
import { loadClubSlugs, loadClubFeed } from '../data';
import type { ClubFeed } from '../types';
import { ClubFixturesDisplay } from './ClubFixturesDisplay';

export function DemoSearch() {
  const [clubSlugs, setClubSlugs] = useState<{ value: string; label: string }[]>([]);
  const [loadingSlugs, setLoadingSlugs] = useState(true);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [clubFeed, setClubFeed] = useState<ClubFeed | null>(null);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load list of available club slugs
  useEffect(() => {
    loadClubSlugs()
      .then(slugs => {
        const options = slugs.map(slug => ({
          value: slug,
          label: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        }));
        setClubSlugs(options);
        setLoadingSlugs(false);
      })
      .catch(err => {
        console.error('Failed to load club slugs:', err);
        setError('Unable to load club list. Please try again later.');
        setLoadingSlugs(false);
      });
  }, []);

  // Load club feed when a club is selected
  useEffect(() => {
    if (!selectedClub) {
      setClubFeed(null);
      return;
    }

    setLoadingFeed(true);
    setError(null);
    loadClubFeed(selectedClub)
      .then(feed => {
        setClubFeed(feed);
        setLoadingFeed(false);
      })
      .catch(err => {
        console.error('Failed to load club feed:', err);
        setError(`Unable to load fixtures for ${selectedClub}. The club may have no fixtures or the feed is temporarily unavailable.`);
        setLoadingFeed(false);
        setClubFeed(null);
      });
  }, [selectedClub]);

  return (
    <Stack gap="md">
      <Select
        label="Search for a grassroots football club"
        placeholder="Type club name (e.g., 'east-leake', 'ac-united')"
        data={clubSlugs}
        value={selectedClub}
        onChange={setSelectedClub}
        searchable
        clearable
        nothingFoundMessage="No club found"
        leftSection={<IconSearch size={16} />}
        disabled={loadingSlugs}
        size="md"
      />

      {loadingSlugs && <Loader size="sm" />}
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" title="Error">
          {error}
        </Alert>
      )}

      {loadingFeed && <Loader size="sm" />}

      {clubFeed && !loadingFeed && (
        <div>
          <Title order={3} mb="md">Fixtures & Results for {clubFeed.club}</Title>
          <ClubFixturesDisplay feed={clubFeed} />
        </div>
      )}

      {!selectedClub && !loadingSlugs && !error && (
        <Alert icon={<IconSearch size={16} />} color="blue" title="Try it out">
           Select a club from the dropdown to see live fixtures and results powered by our fulltimeCalendar integration.
          <br />
          <strong>Example clubs:</strong> east-leake, ac-united, atfa-brinsley, etc.
        </Alert>
      )}
    </Stack>
  );
}
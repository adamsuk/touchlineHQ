import { Title, Text, Button, Group, SimpleGrid, Paper, ThemeIcon, Stack, Container, Anchor, List } from '@mantine/core';
import { IconCheck, IconBrandGithub, IconCalendar, IconRocket, IconCode, IconMail } from '@tabler/icons-react';
import type { AppData } from '../types';
import { tablerIcon } from '../utils/icons';
import { DemoSearch } from '../components/DemoSearch';

interface Props { data: AppData }

export function HomePage({ data }: Props) {
  const { club, features, repos, contact, clubFeed, liveTeams } = data;

  return (
    <Stack gap="xl">
      {/* Hero Section */}
      <Paper p="xl" radius="md" withBorder>
        <Container size="lg">
          <Group justify="space-between" align="center" wrap="wrap" gap="xl">
            <Stack gap="md" style={{ flex: 1, minWidth: 300 }}>
              <div>
                <Title order={1} c="var(--mantine-primary-color-filled)">{club.name}</Title>
                <Text size="lg" c="dimmed">{club.tagline}</Text>
              </div>
              <Text size="md">{club.description}</Text>
              <Group>
                <Button 
                  component="a" 
                  href={`mailto:${contact.email}`}
                  leftSection={<IconMail size={16} />}
                  size="md"
                >
                  {club.hero.cta}
                </Button>
                <Button 
                  component="a" 
                  href="#demo"
                  variant="outline"
                  leftSection={<IconCalendar size={16} />}
                  size="md"
                >
                  See Live Demo
                </Button>
              </Group>
            </Stack>
            <Stack gap="xs" align="center">
              <IconRocket size={120} stroke={1.5} color="var(--mantine-primary-color-filled)" />
              <Text size="sm" c="dimmed" ta="center">Whitelabel websites for grassroots football</Text>
            </Stack>
          </Group>
        </Container>
      </Paper>

      {/* Features Section */}
      <div id="features">
        <Title order={2} mb="md" ta="center">What We Offer</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {features.map((feature, i) => (
            <Paper key={i} p="md" radius="md" withBorder h="100%">
              <Stack gap="sm">
                <Title order={3} size="h4">{feature.title}</Title>
                <Text c="dimmed">{feature.description}</Text>
                <List spacing="xs" size="sm">
                  {feature.details.map((detail, idx) => (
                    <List.Item key={idx} icon={<IconCheck size={12} />}>
                      {detail}
                    </List.Item>
                  ))}
                </List>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </div>

      {/* Integration Demo */}
      <div id="demo">
        <Title order={2} mb="md" ta="center">Live Integration Demo</Title>
        <Paper p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Text ta="center" c="dimmed">
              Search for a grassroots football club to see live fixtures & results powered by our fulltimeCalendar scraper.
            </Text>
            <DemoSearch />
            {clubFeed && (
              <Text size="sm" c="dimmed" ta="center">
                Showing data for <strong>{clubFeed.club}</strong>. Last updated: {new Date(clubFeed.generated).toLocaleDateString('en-GB')}
              </Text>
            )}
          </Stack>
        </Paper>
      </div>

      {/* Open Source Section */}
      <div id="opensource">
        <Title order={2} mb="md" ta="center">Open Source Foundation</Title>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {repos.map((repo, i) => (
            <Paper key={i} p="md" radius="md" withBorder>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Title order={3} size="h4">{repo.name}</Title>
                  <IconBrandGithub size={20} />
                </Group>
                <Text c="dimmed">{repo.description}</Text>
                <Group gap="xs" wrap="wrap">
                  {repo.tech.map((tech) => (
                    <Button key={tech} variant="light" size="xs" radius="xl">{tech}</Button>
                  ))}
                </Group>
                <List spacing="xs" size="sm">
                  {repo.features.map((feature, idx) => (
                    <List.Item key={idx} icon={<IconCode size={12} />}>
                      {feature}
                    </List.Item>
                  ))}
                </List>
                <Button 
                  component="a" 
                  href={repo.url}
                  target="_blank"
                  variant="outline"
                  fullWidth
                  mt="sm"
                >
                  View on GitHub
                </Button>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Title order={2} mb="md" ta="center">Get In Touch</Title>
        <Paper p="xl" radius="md" withBorder>
          <Stack gap="md" align="center">
            <Text size="lg" ta="center">{contact.message}</Text>
            <Button 
              component="a" 
              href={`mailto:${contact.email}`}
              leftSection={<IconMail size={20} />}
              size="lg"
            >
              Email {contact.email}
            </Button>
            <Group gap="md">
              {contact.social.github && (
                <Anchor href={contact.social.github} target="_blank" size="sm">
                  GitHub
                </Anchor>
              )}
              {contact.social.twitter && contact.social.twitter !== '#' && (
                <Anchor href={contact.social.twitter} target="_blank" size="sm">
                  Twitter
                </Anchor>
              )}
              {contact.social.linkedin && contact.social.linkedin !== '#' && (
                <Anchor href={contact.social.linkedin} target="_blank" size="sm">
                  LinkedIn
                </Anchor>
              )}
            </Group>
          </Stack>
        </Paper>
      </div>
    </Stack>
  );
}

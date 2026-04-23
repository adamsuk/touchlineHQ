import { Title, Text, Button, Group, SimpleGrid, Paper, ThemeIcon, Stack, Container, Anchor, List, Box, Flex, Badge } from '@mantine/core';
import { IconCheck, IconBrandGithub, IconCalendar, IconCode, IconMail, IconBrandGoogle, IconCloud, IconDeviceDesktop, IconUsers, IconShield, IconCreditCard, IconBrandOpenSource } from '@tabler/icons-react';
import type { AppData } from '../types';
import { DemoSearch } from '../components/DemoSearch';
import { TreasurerTool } from '../components/TreasurerTool';

interface Props { data: AppData }

export const HomePage = ({ data }: Props) => {
  const { club, features, repos, contact, clubFeed } = data;

  return (
    <Stack>
      {/* Hero Section */}
      <Box 
        style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f7fdf9 0%, #e6f9ee 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
          <Flex 
            align="center" 
            justify="space-between" 
            direction={{ base: 'column', sm: 'row' }}
            wrap="wrap" 
            gap={{ base: 'lg', sm: 'xl' }} 
            style={{ 
              minHeight: 'calc(100vh - 70px)', 
              padding: '2rem 0',
              paddingTop: '1.5rem',
            }}
          >
            <Stack gap={{ base: 'md', sm: 'xl' }} style={{ flex: 1, minWidth: 300, maxWidth: 600 }}>
              <div>
                <Title 
                  order={1} 
                  size={{ base: '2rem', sm: '3rem', md: '3.5rem' }} 
                  lh={1.1} 
                  mb="md"
                >
                  {club.hero.title}
                </Title>
                <Text size={{ base: 'md', sm: 'xl' }} c="dimmed" mb="xl">
                  {club.hero.subtitle}
                </Text>
              </div>
              <Group 
                orientation={{ base: 'vertical', sm: 'horizontal' }} 
                w={{ base: '100%', sm: 'auto' }}
              >
                <Button 
                  component="a" 
                  href={`mailto:${contact.email}?subject=Book%20a%20TouchlineHQ%20Demo`}
                  leftSection={<IconCalendar size={20} />}
                  size="lg"
                  radius="xl"
                  color="green.6"
                  fullWidth={{ base: true, sm: false }}
                >
                  {club.hero.cta}
                </Button>
                <Button 
                  component="a" 
                  href="#demo"
                  variant="outline"
                  leftSection={<IconDeviceDesktop size={20} />}
                  size="lg"
                  radius="xl"
                  color="green.6"
                  fullWidth={{ base: true, sm: false }}
                >
                  View Sample Club
                </Button>
              </Group>
              <Group gap={{ base: 'md', sm: 'xl' }} mt="xl">
                <Stack gap={4}>
                   <Text fw={700} size="lg">100%</Text>
                  <Text size="sm" c="dimmed">Customizable</Text>
                </Stack>
                <Stack gap={4}>
                   <Text fw={700} size="lg">Live</Text>
                  <Text size="sm" c="dimmed">Fixtures & Results</Text>
                </Stack>
                <Stack gap={4}>
                   <Text fw={700} size="lg">GDPR</Text>
                  <Text size="sm" c="dimmed">Compliant</Text>
                </Stack>
              </Group>
            </Stack>
            <Box 
              style={{ flex: 1, minWidth: 280, position: 'relative' }}
              w={{ base: '100%', sm: 'auto' }}
            >
              <Box
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7fdf9 100%)',
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  transform: 'rotate(3deg)',
                }}
              >
                <Stack gap="md">
                  <Group>
                    <IconDeviceDesktop size={32} color="var(--mantine-color-green-6)" />
                    <Title order={3}>Club Dashboard</Title>
                  </Group>
                  <Text c="dimmed">
                    Modern club website with team management, fixtures, results, and player profiles.
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    <Button variant="light" size="xs" radius="xl" leftSection={<IconUsers size={12} />}>Teams</Button>
                    <Button variant="light" size="xs" radius="xl" leftSection={<IconCalendar size={12} />}>Fixtures</Button>
                    <Button variant="light" size="xs" radius="xl" leftSection={<IconCloud size={12} />}>Cloud Hosted</Button>
                  </Group>
                </Stack>
              </Box>
              <Box
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '-10%',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7fdf9 100%)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  transform: 'rotate(-5deg)',
                  width: '70%',
                  zIndex: -1,
                  display: { base: 'none', sm: 'block' },
                }}
              >
                <Stack gap="sm">
                  <Group>
                    <IconBrandGoogle size={24} color="var(--mantine-color-green-6)" />
                    <Text fw={600}>Google Calendar Sync</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Automatic fixture sync with Google Calendar.
                  </Text>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </Container>
        {/* Background pattern */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.01) 0%, transparent 50%)',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Features Section */}
       <Box id="features" py="xl" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f7fdf9 100%)', borderRadius: 'lg' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div>
               <Text size="sm" fw={600} c="green.8" tt="uppercase" ta="center" mb="xs">Platform Features</Text>
               <Title order={2} ta="center" mb="md">Built for Grassroots Clubs</Title>
              <Text size="lg" c="dimmed" ta="center" maw={800} mx="auto">
                Everything your club needs to manage teams, fixtures, and communications—all in one secure platform.
              </Text>
            </div>
             <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {features.map((feature, i) => (
                 <Paper 
                   key={i} 
                   p="xl" 
                   radius="lg" 
                   withBorder
                   style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}
                   h="100%"
                 >
                  <Stack gap="md">
                    <Group>
                       <ThemeIcon size={48} radius="lg" variant="light" color="green.5">
                         {i === 0 && <IconUsers size={24} />}
                         {i === 1 && <IconCalendar size={24} />}
                         {i === 2 && <IconDeviceDesktop size={24} />}
                         {i === 3 && <IconShield size={24} />}
                         {i === 4 && <IconCreditCard size={24} />}
                         {i === 5 && <IconBrandOpenSource size={24} />}
                       </ThemeIcon>
                      <Title order={3} size="h4">{feature.title}</Title>
                    </Group>
                    <Text c="dimmed">{feature.description}</Text>
                    <List spacing="xs" size="sm">
                      {feature.details.map((detail, idx) => (
                          <List.Item key={idx} icon={<IconCheck size={14} color="var(--mantine-color-green-5)" />}>
                          {detail}
                        </List.Item>
                      ))}
                    </List>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Treasurer's Tool */}
       <Box id="treasurer" py="xl" style={{ background: 'linear-gradient(135deg, #1a2332 0%, #273347 100%)', borderRadius: 'lg' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div>
              <Text size="sm" fw={600} c="green.8" tt="uppercase" ta="center" mb="xs">Financial Tools</Text>
              <Title order={2} ta="center" mb="md" c="white">Traceable Payments for Treasurers</Title>
              <Text size="lg" c="gray.4" ta="center" maw={800} mx="auto">
                Generate payment links with FAN references for instant bank reconciliation—no personal data stored.
              </Text>
            </div>
            <TreasurerTool />
          </Stack>
        </Container>
      </Box>

      {/* Integration Demo */}
       <Box id="demo" py="xl" style={{ background: 'linear-gradient(135deg, #f7fdf9 0%, #e6f9ee 100%)', borderRadius: 'lg' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div>
               <Text size="sm" fw={600} c="green.8" tt="uppercase" ta="center" mb="xs">Live Demo</Text>
               <Title order={2} ta="center" mb="md">See it in action</Title>
              <Text size="lg" c="dimmed" ta="center" maw={800} mx="auto">
                Search for any grassroots football club to see live fixtures, results, and standings powered by our real-time data integration.
              </Text>
            </div>
            <Paper p="xl" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
              <Stack gap="lg">
                <DemoSearch />
                {clubFeed && (
                  <Text size="sm" c="dimmed" ta="center">
                    Showing data for <strong>{clubFeed.club}</strong>. Last updated: {new Date(clubFeed.generated).toLocaleDateString('en-GB')}
                  </Text>
                )}
              </Stack>
            </Paper>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mt="xl">
               <Paper p="md" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
                <Stack gap="xs" align="center">
                  <ThemeIcon size={48} radius="lg" variant="light" color="green.5">
                    <IconCalendar size={24} />
                  </ThemeIcon>
                  <Text fw={600} ta="center">Live Fixtures</Text>
                  <Text size="sm" c="dimmed" ta="center">Automatic updates from FA Full-Time</Text>
                </Stack>
              </Paper>
               <Paper p="md" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
                <Stack gap="xs" align="center">
                  <ThemeIcon size={48} radius="lg" variant="light" color="green.5">
                    <IconUsers size={24} />
                  </ThemeIcon>
                  <Text fw={600} ta="center">Multi‑Team Support</Text>
                  <Text size="sm" c="dimmed" ta="center">Manage all club teams in one place</Text>
                </Stack>
              </Paper>
               <Paper p="md" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
                <Stack gap="xs" align="center">
                  <ThemeIcon size={48} radius="lg" variant="light" color="green.5">
                    <IconBrandGoogle size={24} />
                  </ThemeIcon>
                  <Text fw={600} ta="center">Calendar Sync</Text>
                  <Text size="sm" c="dimmed" ta="center">Google Calendar & iCal integration</Text>
                </Stack>
              </Paper>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Open Source Section */}
       <Box id="opensource" py="xl" style={{ background: 'transparent', borderRadius: 'lg' }}>
        <Container size="lg">
          <Stack gap="xl">
            <div>
               <Text size="sm" fw={600} c="green.8" tt="uppercase" ta="center" mb="xs">Open Source</Text>
               <Title order={2} ta="center" mb="md">Built on transparent foundations</Title>
              <Text size="lg" c="dimmed" ta="center" maw={800} mx="auto">
                Our platform is built on open-source projects that you can inspect, contribute to, and even self-host.
              </Text>
            </div>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {repos.map((repo, i) => (
                <Paper 
                  key={i} 
                  p="xl" 
                  radius="lg" 
                  withBorder
                  styles={{
                    root: {
                      borderColor: 'var(--mantine-color-gray-2)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 'var(--mantine-shadow-lg)',
                      }
                    }
                  }}
                >
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Group>
                       <ThemeIcon size={48} radius="lg" variant="light" color="green.5">
                          <IconBrandGithub size={24} />
                        </ThemeIcon>
                        <Title order={3} size="h4">{repo.name}</Title>
                      </Group>
                      <IconBrandGithub size={24} />
                    </Group>
                    <Text c="dimmed">{repo.description}</Text>
                    <Group gap="xs" wrap="wrap">
                      {repo.tech.map((tech) => (
                        <Button key={tech} variant="light" size="xs" radius="xl" color="green.5">{tech}</Button>
                      ))}
                    </Group>
                    <List spacing="xs" size="sm">
                      {repo.features.map((feature, idx) => (
                        <List.Item key={idx} icon={<IconCode size={14} color="var(--mantine-color-green-6)" />}>
                          {feature}
                        </List.Item>
                      ))}
                    </List>
                    <Button 
                      component="a" 
                      href={repo.url}
                      target="_blank"
                      variant="outline"
                      color="green.6"
                      fullWidth
                      mt="sm"
                      radius="lg"
                    >
                      View on GitHub
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
       <Box id="contact" py="xl" style={{ background: 'linear-gradient(135deg, #1a2332 0%, #273347 100%)', borderRadius: 'lg' }}>
        <Container size="lg">
          <Stack gap="xl" align="center">
            <div>
              <Text size="sm" fw={600} c="green.5" tt="uppercase" ta="center" mb="xs">Contact</Text>
              <Title order={2} ta="center" mb="md" c="white">Ready to get started?</Title>
              <Text size="lg" c="gray.4" ta="center" maw={800} mx="auto">
                Get in touch to discuss how touchlineHQ can transform your club's online presence.
              </Text>
            </div>
            <Paper p="xl" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <Stack gap="lg" align="center">
                <Text size="xl" ta="center" c="white">{contact.message}</Text>
                <Button 
                  component="a" 
                  href={`mailto:${contact.email}`}
                  leftSection={<IconMail size={24} />}
                  size="lg"
                  radius="xl"
                  color="green.6"
                  variant="filled"
                >
                  Email {contact.email}
                </Button>
                <Group gap="lg" mt="md">
                  {contact.social.github && (
                    <Anchor href={contact.social.github} target="_blank" c="gray.3" size="md" underline="never">
                      GitHub
                    </Anchor>
                  )}
                  {contact.social.twitter && contact.social.twitter !== '#' && (
                    <Anchor href={contact.social.twitter} target="_blank" c="gray.3" size="md" underline="never">
                      Twitter
                    </Anchor>
                  )}
                  {contact.social.linkedin && contact.social.linkedin !== '#' && (
                    <Anchor href={contact.social.linkedin} target="_blank" c="gray.3" size="md" underline="never">
                      LinkedIn
                    </Anchor>
                  )}
                </Group>
              </Stack>
            </Paper>
             <Stack gap="xs" align="center">
               <Group gap="md">
                 <Text size="sm" c="gray.4">touchlinehq.co.uk</Text>
                 <Badge color="green" variant="light" size="sm">Made in the UK</Badge>
               </Group>
               <Text size="sm" c="gray.5">
                 © {new Date().getFullYear()} touchlineHQ. All rights reserved.
               </Text>
             </Stack>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
}

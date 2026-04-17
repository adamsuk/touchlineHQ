import { Group, Text, ActionIcon, Anchor, Button, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconList, IconCode, IconCalendar, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import type { Club } from '../types';

interface Props {
  club: Club;
}

export function SiteHeader({ club }: Props) {
  const [opened, { toggle, close }] = useDisclosure(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    close();
  };

  const navItems = [
    { id: 'features', label: 'Features', icon: <IconList size={18} /> },
    { id: 'demo', label: 'Live Demo', icon: <IconCalendar size={18} /> },
    { id: 'opensource', label: 'Open Source', icon: <IconCode size={18} /> },
    { id: 'contact', label: 'Contact', icon: <IconMail size={18} /> },
  ];

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        {/* Logo / Brand */}
        <Stack gap={0}>
          <Text
            component={Link}
            to="/"
            fw={700}
            size="lg"
            c="var(--mantine-primary-color-filled)"
            style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            {club.name}
          </Text>
          <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>Grassroots, Streamlined.</Text>
        </Stack>

        {/* Desktop Navigation Links */}
        <Group gap="md" wrap="nowrap" visibleFrom="sm">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="subtle"
              size="compact-sm"
              leftSection={item.icon}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </Group>

        {/* Desktop Social Links & CTA */}
        <Group gap="xs" wrap="nowrap" visibleFrom="sm">
          {club.socials.github && club.socials.github !== '#' && (
            <ActionIcon
              component="a"
              href={club.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              aria-label="GitHub"
            >
              <IconBrandGithub size={20} />
            </ActionIcon>
          )}
          {club.socials.twitter && club.socials.twitter !== '#' && (
            <ActionIcon
              component="a"
              href={club.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              aria-label="Twitter"
            >
              <IconBrandTwitter size={20} />
            </ActionIcon>
          )}
          {club.socials.linkedin && club.socials.linkedin !== '#' && (
            <ActionIcon
              component="a"
              href={club.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={20} />
            </ActionIcon>
          )}
          <Button
            component="a"
            href={`mailto:${club.email}`}
            variant="light"
            size="compact-sm"
            leftSection={<IconMail size={14} />}
          >
            Get in touch
          </Button>
        </Group>

        {/* Mobile Menu Button */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        position="right"
        hiddenFrom="sm"
        padding="lg"
        size="sm"
      >
        <Stack gap="md">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="subtle"
              justify="start"
              size="lg"
              leftSection={item.icon}
              onClick={() => scrollToSection(item.id)}
              fullWidth
            >
              {item.label}
            </Button>
          ))}
          <Stack gap="xs" mt="lg">
            <Text size="sm" fw={600} c="dimmed">Social Links</Text>
            <Group gap="xs">
              {club.socials.github && club.socials.github !== '#' && (
                <ActionIcon
                  component="a"
                  href={club.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  aria-label="GitHub"
                >
                  <IconBrandGithub size={20} />
                </ActionIcon>
              )}
              {club.socials.twitter && club.socials.twitter !== '#' && (
                <ActionIcon
                  component="a"
                  href={club.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  aria-label="Twitter"
                >
                  <IconBrandTwitter size={20} />
                </ActionIcon>
              )}
              {club.socials.linkedin && club.socials.linkedin !== '#' && (
                <ActionIcon
                  component="a"
                  href={club.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  size="lg"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin size={20} />
                </ActionIcon>
              )}
            </Group>
            <Button
              component="a"
              href={`mailto:${club.email}`}
              variant="filled"
              size="lg"
              leftSection={<IconMail size={18} />}
              fullWidth
              mt="md"
            >
              Get in touch
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
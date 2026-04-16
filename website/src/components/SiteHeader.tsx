import { Group, Text, ActionIcon, Anchor, Button } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconList, IconCode, IconCalendar, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import type { Club } from '../types';

interface Props {
  club: Club;
}

export function SiteHeader({ club }: Props) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      {/* Logo / Brand */}
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

      {/* Navigation Links (anchor scroll) */}
      <Group gap="md" wrap="nowrap" visibleFrom="sm">
        <Button
          variant="subtle"
          size="compact-sm"
          leftSection={<IconList size={14} />}
          onClick={() => scrollToSection('features')}
        >
          Features
        </Button>
        <Button
          variant="subtle"
          size="compact-sm"
          leftSection={<IconCalendar size={14} />}
          onClick={() => scrollToSection('demo')}
        >
          Live Demo
        </Button>
        <Button
          variant="subtle"
          size="compact-sm"
          leftSection={<IconCode size={14} />}
          onClick={() => scrollToSection('opensource')}
        >
          Open Source
        </Button>
        <Button
          variant="subtle"
          size="compact-sm"
          leftSection={<IconMail size={14} />}
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </Button>
      </Group>

      {/* Social Links */}
      <Group gap="xs" wrap="nowrap">
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
    </Group>
  );
}
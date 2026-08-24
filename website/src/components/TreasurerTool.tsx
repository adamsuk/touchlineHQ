import { useState } from 'react';
import {
  Paper, Title, Text, Stack, Group, Button, TextInput,
  Select, Alert, Divider, Badge, Code, Box, SimpleGrid, Loader,
} from '@mantine/core';
import {
  IconCreditCard, IconReceipt, IconCopy, IconCheck,
  IconShield, IconAlertCircle, IconExternalLink,
} from '@tabler/icons-react';
import { copyTextToClipboard } from '../utils/clipboard';

const paymentTypes = [
  { value: 'SUBS', label: 'Subscription Fees' },
  { value: 'TOUR', label: 'Tournament Fees' },
  { value: 'KIT', label: 'Kit Payment' },
  { value: 'EVENT', label: 'Event Ticket' },
  { value: 'OTHER', label: 'Other' },
];

const intervalOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'yearly', label: 'Yearly' },
];

export const TreasurerTool = () => {
  const [team, setTeam] = useState('');
  const [fan, setFan] = useState('');
  const [paymentType, setPaymentType] = useState('SUBS');
  const [amountGbp, setAmountGbp] = useState('');
  const [intervalUnit, setIntervalUnit] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedRef, setGeneratedRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isAmountValid = () => {
    const n = parseFloat(amountGbp);
    return !isNaN(n) && n > 0;
  };

  const canGenerate = team.trim() && fan.trim() && isAmountValid();

  const handleGenerateLink = async () => {
    if (!canGenerate) return;

    setIsLoading(true);
    setError('');
    setGeneratedLink('');
    setGeneratedRef('');
    setCopyError(false);

    try {
      const amount = parseFloat(amountGbp);
      const res = await fetch('/api/gocardless/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: team.trim(),
          fan: fan.trim(),
          paymentType,
          amountInPence: Math.round(amount * 100),
          intervalUnit,
          description: `${team.trim().toUpperCase()} ${paymentType} - FAN ${fan.trim()}`,
        }),
      });

      const data = await res.json() as { authorisation_url?: string; reference?: string; error?: string };

      if (!res.ok || !data.authorisation_url) {
        setError(data.error || 'Failed to generate payment link. Please try again.');
        return;
      }

      setGeneratedLink(data.authorisation_url);
      setGeneratedRef(data.reference || '');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    setCopyError(false);
    const ok = await copyTextToClipboard(generatedLink);
    if (!ok) {
      setCopyError(true);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper p="xl" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
      <Stack gap="lg">
        <Group>
          <IconCreditCard size={32} color="var(--mantine-color-green-5)" />
          <Title order={2} size="h3" c="green.8">Treasurer's Tool</Title>
        </Group>

        <Text c="dimmed">
          Generate a player-specific Direct Debit link. When the player completes payment, their
          mandate is set up and their subscription created automatically — with the FAN reference
          embedded so reconciliation is instant.
        </Text>

        <Alert icon={<IconShield size={16} />} color="green" variant="light" radius="md">
          <Text size="sm">
            <strong>GDPR Compliant:</strong> No personal data stored. Payment references use only
            FAN numbers. Links are single-use and expire once the player completes payment.
          </Text>
        </Alert>

        <Divider />

        <Stack gap="md">
          <Title order={3} size="h4">Generate Payment Link</Title>

          <Group grow align="flex-start">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Team Name</Text>
              <TextInput
                placeholder="e.g., U14, SENIORS"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                radius="md"
              />
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={500}>FAN Number</Text>
              <TextInput
                placeholder="e.g., 882931"
                value={fan}
                onChange={(e) => setFan(e.target.value)}
                radius="md"
              />
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={500}>Payment Type</Text>
              <Select
                data={paymentTypes}
                value={paymentType}
                onChange={(v) => setPaymentType(v || 'SUBS')}
                radius="md"
              />
            </Stack>
          </Group>

          <Group grow align="flex-start">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Amount (£)</Text>
              <TextInput
                placeholder="e.g., 25.00"
                value={amountGbp}
                onChange={(e) => setAmountGbp(e.target.value)}
                radius="md"
                leftSection={<Text size="sm" c="dimmed">£</Text>}
              />
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={500}>Interval</Text>
              <Select
                data={intervalOptions}
                value={intervalUnit}
                onChange={(v) => setIntervalUnit((v as 'monthly' | 'weekly' | 'yearly') || 'monthly')}
                radius="md"
              />
            </Stack>

            {/* Spacer to keep layout balanced */}
            <div />
          </Group>

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" radius="md">
              <Text size="sm">{error}</Text>
            </Alert>
          )}

          <Button
            onClick={handleGenerateLink}
            disabled={!canGenerate || isLoading}
            color="green.6"
            size="lg"
            radius="lg"
            leftSection={isLoading ? <Loader size={16} color="white" /> : <IconReceipt size={20} />}
            fullWidth
          >
            {isLoading ? 'Generating...' : 'Generate Payment Link'}
          </Button>
        </Stack>

        {generatedLink && (
          <Stack gap="md" mt="lg">
            <Divider />
            <Title order={3} size="h4">Player Payment Link</Title>

            <Paper p="md" radius="md" withBorder style={{ background: 'var(--mantine-color-gray-0)' }}>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Badge color="green" variant="light">Reference</Badge>
                  <Code fw={700}>{generatedRef}</Code>
                </Group>
                <Box style={{ wordBreak: 'break-all' }}>
                  <Text size="sm" c="dimmed">GoCardless Payment Link:</Text>
                  <Text size="sm" fw={500}>{generatedLink}</Text>
                </Box>
              </Stack>
            </Paper>

            <Group>
              <Button
                onClick={copyToClipboard}
                variant="light"
                color="gray"
                leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              <Button
                component="a"
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                color="green.6"
                leftSection={<IconExternalLink size={16} />}
              >
                Open Payment Page
              </Button>
            </Group>

            {copyError && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" radius="md">
                <Text size="sm">
                  Couldn't access your clipboard — please select and copy the payment link above manually.
                </Text>
              </Alert>
            )}

            <Alert icon={<IconReceipt size={16} />} color="blue" variant="light" radius="md">
              <Text size="sm">
                <strong>Send this link to the player or parent.</strong> When they complete the
                Direct Debit setup, their mandate and{' '}
                {intervalUnit} subscription will be created automatically. Bank statements will
                show <Code>{generatedRef}</Code> as the reference.
              </Text>
            </Alert>
          </Stack>
        )}

        <Divider />

        <Stack gap="xs">
          <Title order={4} size="h5">Why Traceable Payments Matter</Title>
          <Text size="sm" c="dimmed">
            Grassroots clubs handle thousands in payments each season. Without proper references,
            treasurers spend hours matching payments to players. Our system ensures every payment
            is instantly identifiable by FAN number — no data stored, no manual chasing.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt="md">
            <Paper p="md" radius="md" withBorder>
              <Text fw={700} size="sm" ta="center">FA-Compliant</Text>
              <Text size="xs" c="dimmed" ta="center">Uses official FA Number system</Text>
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Text fw={700} size="sm" ta="center">No Data Storage</Text>
              <Text size="xs" c="dimmed" ta="center">We never see payment amounts or personal details</Text>
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Text fw={700} size="sm" ta="center">Instant Reconciliation</Text>
              <Text size="xs" c="dimmed" ta="center">Bank statements match references automatically</Text>
            </Paper>
          </SimpleGrid>
        </Stack>
      </Stack>
    </Paper>
  );
}

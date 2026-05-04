import { useState } from 'react';
import { 
  Paper, Title, Text, Stack, Group, Button, TextInput, 
  Select, Alert, Divider, SimpleGrid
} from '@mantine/core';
import { IconCreditCard, IconReceipt, IconShield } from '@tabler/icons-react';

export const TreasurerTool = () => {
  const [team, setTeam] = useState('');
  const [fan, setFan] = useState('');
  const [paymentType, setPaymentType] = useState('SUBS');

  const paymentTypes = [
    { value: 'SUBS', label: 'Subscription Fees' },
    { value: 'TOUR', label: 'Tournament Fees' },
    { value: 'KIT', label: 'Kit Payment' },
    { value: 'EVENT', label: 'Event Ticket' },
    { value: 'OTHER', label: 'Other' },
  ];

  const getReference = () => {
    if (!team || !fan || !paymentType) return {};
    return { team: team.toLowerCase().replace(/\s+/g, ''), fan, type: paymentType };
  };

  const generateLink = async () => {
    const ref = getReference();
    if (!ref) return;
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ref),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Paper p="xl" radius="lg" withBorder style={{ borderColor: 'var(--mantine-color-gray-2)', background: 'white' }}>
      <Stack gap="lg">
        <Group>
           <IconCreditCard size={32} color="var(--mantine-color-green-5)" />
          <Title order={2} size="h3" c="green.8">Treasurer's Tool</Title>
        </Group>
        
        <Text c="dimmed">
          Generate traceable payment links where the FAN (FA Number) is the mandatory reference. 
          TouchlineHQ never touches the money—we simply provide traceable links so Treasurers can reconcile bank statements instantly.
        </Text>

        <Alert icon={<IconShield size={16} />} color="green" variant="light" radius="md">
          <Text size="sm">
            <strong>GDPR Compliant:</strong> No personal data stored. Payment references use only FAN numbers.
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
                onChange={(value) => setPaymentType(value || 'SUBS')}
                radius="md"
              />
            </Stack>
          </Group>

          <Button 
            onClick={generateLink}
            disabled={!team || !fan}
            color="green.6"
            size="lg"
            radius="lg"
            leftSection={<IconReceipt size={20} />}
            fullWidth
          >
            Generate Traceable Payment Link
          </Button>
        </Stack>

        <Divider />
        
        <Stack gap="xs">
          <Title order={4} size="h5">Why Traceable Payments Matter</Title>
          <Text size="sm" c="dimmed">
            Grassroots clubs handle thousands in payments each season. Without proper references, treasurers spend hours 
            matching payments to players. Our system ensures every payment is instantly identifiable by FAN number.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt="md">
            <Paper p="md" radius="md" withBorder>
              <Text fw={700} size="sm" ta="center">FA‑Compliant</Text>
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

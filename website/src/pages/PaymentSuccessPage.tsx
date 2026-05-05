import { useEffect, useState } from 'react';
import {
  Container, Stack, Title, Text, Paper, Group,
  Button, Alert, Badge, ThemeIcon,
} from '@mantine/core';
import { IconCheck, IconAlertTriangle, IconReceipt } from '@tabler/icons-react';

function parseHashParams(): URLSearchParams {
  const hash = window.location.hash;
  const queryStart = hash.indexOf('?');
  if (queryStart === -1) return new URLSearchParams();
  return new URLSearchParams(hash.slice(queryStart + 1));
}

export function PaymentSuccessPage() {
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    setParams(parseHashParams());
  }, []);

  const mandateId = params.get('mandate');
  const subscriptionId = params.get('subscription');
  const reference = params.get('ref');
  const warning = params.get('warning');

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl" align="center">
        <ThemeIcon size={80} radius="xl" color="green.5" variant="light">
          <IconCheck size={48} />
        </ThemeIcon>

        <div>
          <Title order={1} ta="center" c="green.8">Payment Setup Complete</Title>
          <Text size="lg" c="dimmed" ta="center" mt="sm">
            Your Direct Debit mandate has been authorised.
          </Text>
        </div>

        {warning === 'subscription_failed' && (
          <Alert icon={<IconAlertTriangle size={16} />} color="yellow" variant="light" radius="md" w="100%">
            <Text size="sm">
              Your mandate was authorised successfully, but there was an issue setting up the recurring
              subscription automatically. Your treasurer has been notified and will activate it shortly.
              Your reference is <strong>{reference}</strong>.
            </Text>
          </Alert>
        )}

        {!warning && subscriptionId && (
          <Alert icon={<IconReceipt size={16} />} color="green" variant="light" radius="md" w="100%">
            <Text size="sm">
              Your recurring subscription has been created. Payments will be collected automatically
              each month and will appear on your bank statement with reference{' '}
              <strong>{reference}</strong>.
            </Text>
          </Alert>
        )}

        <Paper p="xl" radius="lg" withBorder style={{ width: '100%' }}>
          <Stack gap="md">
            {reference && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Payment Reference</Text>
                <Badge size="lg" variant="light" color="green">{reference}</Badge>
              </Group>
            )}
            {mandateId && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Mandate ID</Text>
                <Text size="sm" fw={500} ff="monospace">{mandateId}</Text>
              </Group>
            )}
            {subscriptionId && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Subscription ID</Text>
                <Text size="sm" fw={500} ff="monospace">{subscriptionId}</Text>
              </Group>
            )}
          </Stack>
        </Paper>

        <Button component="a" href="/" color="green.6" size="lg" radius="xl">
          Return to Home
        </Button>
      </Stack>
    </Container>
  );
}

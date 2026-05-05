import { Container, Stack, Title, Text, Button, ThemeIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export const PaymentCancelledPage = () => (
  <Container size="sm" py="xl">
    <Stack gap="xl" align="center">
      <ThemeIcon size={80} radius="xl" color="gray" variant="light">
        <IconX size={48} />
      </ThemeIcon>

      <div>
        <Title order={1} ta="center" c="dimmed">Payment Not Completed</Title>
        <Text size="lg" c="dimmed" ta="center" mt="sm">
          You cancelled the payment process. No mandate or payment has been set up.
        </Text>
      </div>

      <Text size="sm" c="dimmed" ta="center">
        If you'd like to set up your subscription, contact your club treasurer for a new payment link.
      </Text>

      <Button component="a" href="/" color="green.6" size="lg" radius="xl">
        Return to Home
      </Button>
    </Stack>
  </Container>
);

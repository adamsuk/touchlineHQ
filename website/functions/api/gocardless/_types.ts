export interface Env {
  GC_ACCESS_TOKEN: string;
  GC_ENVIRONMENT: 'sandbox' | 'live';
}

export interface GCBillingRequest {
  id: string;
  status: string;
  mandate_request?: {
    scheme: string;
    description?: string;
  };
  metadata: Record<string, string>;
  links?: {
    mandate?: string;
    customer?: string;
  };
}

export interface GCBillingRequestFlow {
  id: string;
  authorisation_url: string;
  redirect_uri: string;
  exit_uri: string;
}

export interface GCSubscription {
  id: string;
  status: string;
  amount: number;
  currency: string;
  interval_unit: 'monthly' | 'weekly' | 'yearly';
  name: string;
  links: {
    mandate: string;
  };
}

export interface CreateLinkBody {
  team: string;
  fan: string;
  paymentType: string;
  amountInPence: number;
  intervalUnit: 'monthly' | 'weekly' | 'yearly';
  description: string;
}

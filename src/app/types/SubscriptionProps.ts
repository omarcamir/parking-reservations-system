export type SubscriptionProps = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: { plate: string; brand?: string; model?: string; color?: string }[];
  startsAt: string;
  expiresAt: string;
  currentCheckins?: { ticketId: string; zoneId: string; checkinAt: string }[];
};
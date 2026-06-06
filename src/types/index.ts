export interface Guest {
  id: string;
  invite_slug: string;
  first_name: string;
  last_name: string;
  attending: boolean;
  guest_count: number;
  responded_at: string | null;
  created_at: string;
}

export interface GuestFormData {
  first_name: string;
  last_name: string;
  invite_slug?: string;
}

export interface RSVPData {
  first_name: string;
  last_name: string;
  attending: boolean;
  guest_count: number;
}

export interface Analytics {
  total: number;
  attending: number;
  not_attending: number;
  pending: number;
}

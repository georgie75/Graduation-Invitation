export interface Guest {
  id: string;
  token: string;
  first_name: string;
  last_name: string;
  attending: boolean | null;
  responded_at: string | null;
  created_at: string;
}

export interface RSVPData {
  first_name: string;
  last_name: string;
  attending: boolean;
}

interface Contacts {
  data: {
    id: string;
    name: string;
    organization: {
      name: string
    };
    city: string;
    phone: string;
    deleted_at: Date;
  },
  meta: {
    prev: number;
    sequels: any[];
    page: number;
    next: number;
    count: number;
    items: number;
    scaffold_url: string;
  }
}

interface SaveData {
  organization_id: string;
  first_name: string;
  last_name: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  country: string;
  postal_code: string;
}

interface Filters {
  search: string;
  trashed: string;
}

export { Contacts, Filters, SaveData };

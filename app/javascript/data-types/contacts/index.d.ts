interface Contacts {
  data: {
    id: string;
    name: string;
    organization: string;
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
  name: string;
  city: string;
  phone: string;
  email: string, address: string, region: string, country: string, postal_code: string, deleted_at: Date
}

interface Filters {
  search: string;
  trashed: string;
}

export { Contacts, Filters, SaveData };

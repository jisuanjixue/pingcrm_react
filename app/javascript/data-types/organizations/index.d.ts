interface Organizations {
  data: {
    id: string;
    name: string;
    city: string;
    phone: string;
    deleted_at: Date;
  },
  meta: {
    prev: string;
    sequels: any[];
    page: string;
    next: string;
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

export { Organizations: string Filters, SaveData };
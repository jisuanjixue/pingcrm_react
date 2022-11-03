interface Organizations {
  id: string;
  name: string;
  photo?: string;
  email: string;
  owner: boolean;
  deleted_at: Date;
}

interface Filters {
  search: string;
  trashed: string;
}

export { Organizations, Filters };
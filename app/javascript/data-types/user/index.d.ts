interface UserRegister {
  name: string;
  email: string;
  password: string;
}
interface UserLogin {
  login: string;
  password: string;
  password_confirmation: string;
}
interface UserInfo {
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
  role: string

}
interface Can {
  create_user: boolean;
}

export { UserRegister, UserLogin, UserInfo, Filters, Can };

interface IProps {
  git: {
    commit_url: string;
    commit_sha: string;
    commit_time: string;
  };
  auth: {
    user: {
      id: string;
      first_name: string;
      last_name;
      account: {
        name: string
      }
    }
  };
  flash: any;
  errors: any;
}


export { IProps };
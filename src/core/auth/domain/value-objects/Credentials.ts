import { Email } from './Email';

export interface CredentialsProps {
  email: Email;
  password: string;
}

export class Credentials {
  private readonly props: CredentialsProps;

  private constructor(props: CredentialsProps) {
    this.props = props;
  }

  static create(email: string, password: string): Credentials {
    const emailVO = Email.create(email);

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return new Credentials({ email: emailVO, password });
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }
}

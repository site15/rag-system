import { Login, LoginForm, required, TextInput } from "react-admin";

export const CustomLoginPage = () => (
  <Login>
    <LoginForm>
      <TextInput
        autoFocus
        source="apiKey"
        label="API Key"
        autoComplete="api-key"
        type="password"
        validate={required()}
      />
    </LoginForm>
  </Login>
);

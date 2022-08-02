import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Textfield } from "@/components/Textfield";
import { oAuthLogin, logout } from "@/services/backend";

const LoginForm = () => {
  return (
    <Card css={{ height: "120px" }}>
      <Textfield />
      <Button
        label="Login"
        colorVariant="primary"
        fillingVariant="contained"
        onClick={() => oAuthLogin("github")}
      />
      <Button
        label="Logout"
        colorVariant="primary"
        fillingVariant="contained"
        onClick={() => logout()}
      />
    </Card>
  );
};

export default LoginForm;

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Textfield } from "@/components/Textfield";
import { oAuthLogin, logout } from "@/services/backend";

const LoginForm = () => {
  return (
    <Card css={{ height: "120px" }}>
      <Textfield />
      <Button
        colorVariant="primary"
        fillingVariant="contained"
        onClick={() => oAuthLogin("github")}>
        Login
      </Button>
      <Button
        colorVariant="primary"
        fillingVariant="contained"
        onClick={() => logout()}>
        Logout
      </Button>
    </Card>
  );
};

export default LoginForm;

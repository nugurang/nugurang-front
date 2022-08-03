import { Container } from "@/components/Container";
import Link from "next/link";
import { Button, ButtonGroup } from "@/components/Button";

const Sandbox = () => {
  return (
    <Container fixedWidth>
      <Link href="/">GO TO ROOT</Link>
      <ButtonGroup>
        <Button label="Reset" colorVariant="error" fillingVariant="contained" />
        <Button
          label="Submit"
          colorVariant="primary"
          fillingVariant="contained"
        />
      </ButtonGroup>
    </Container>
  );
};

export default Sandbox;

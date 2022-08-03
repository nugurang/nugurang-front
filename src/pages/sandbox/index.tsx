import { Container } from "@/compositions/Container";
import Link from "next/link";
import { Button, ButtonGroup } from "@/components/Button";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { useContext } from "react";

const Sandbox = () => {
  const windowSize = useContext(WindowSizeContext);
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

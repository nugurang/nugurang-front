import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";
import Link from "next/link";

const Menu = () => {
  return (
    <>
      <Container fixedWidth={true}>
        <Section>
          <SectionHead title="메뉴"></SectionHead>
          <SectionBody>Hello World!</SectionBody>
        </Section>
      </Container>
      <Container backgroundColor="transparent" fixedWidth={true}>
        <FloatingBottomBar float={true} margin={{ bottom: 8 }}>
          <ButtonGroup>
            <Button
              label=""
              colorVariant="error"
              icon={{
                prefix: "fas",
                name: "arrow-left",
              }}
              fillingVariant="contained"
            />
          </ButtonGroup>
        </FloatingBottomBar>
      </Container>
    </>
  );
};

export default Menu;

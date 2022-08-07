import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";

const Menu = () => {
  return (
    <>
      <Container fixedWidth={true}>
        <Section>
          <SectionHead title="메뉴"></SectionHead>
          <SectionBody>Hello World!</SectionBody>
        </Section>
        <ButtonGroup>
          <Button
            label="로그아웃"
            colorVariant="error"
            icon={{
              prefix: "fas",
              name: "key",
            }}
            fillingVariant="contained"
          />
        </ButtonGroup>
      </Container>
      <FloatingBottomBar float={true}>
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
    </>
  );
};

export default Menu;

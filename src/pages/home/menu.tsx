import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";
import { oAuthLogin, login, logout } from "@/services/backend";
import { WithAuthServerSideProps } from "@/hocs/WithAuthServerSideProps";

export const getServerSideProps = WithAuthServerSideProps();

const Menu = () => {
  return (
    <>
      <Container>
        <Section>
          <SectionHead title="메뉴"></SectionHead>
          <SectionBody>Hello World!</SectionBody>
        </Section>
        <ButtonGroup>
          <Button
            label="oAuthLogin"
            icon={{
              prefix: "fas",
              name: "key",
            }}
            fillingVariant="contained"
            onClick={() => oAuthLogin("github")}
          />
          <Button
            label="로그인"
            icon={{
              prefix: "fas",
              name: "key",
            }}
            fillingVariant="contained"
            onClick={() => login("github")}
          />
          <Button
            label="로그아웃"
            colorVariant="error"
            icon={{
              prefix: "fas",
              name: "key",
            }}
            fillingVariant="contained"
            onClick={() => logout()}
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

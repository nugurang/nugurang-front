import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";
import { oAuthLogin, login, logout } from "@/utilities/backend";
import { WithAuthServerSideProps } from "@/hocs/WithAuthServerSideProps";
import { getCurrentUser } from "@/services/user";

export const getServerSideProps = WithAuthServerSideProps(
  async ({ context }) => {
    const getCurrentUserResult = await getCurrentUser(context);
    if (getCurrentUserResult.data === undefined) {
      return {
        redirect: {
          destination: "/signin/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        currentUser: getCurrentUserResult.data,
      },
    };
  },
);

const Menu = ({ currentUser }) => {
  return (
    <>
      <Container>
        <Section>
          <SectionHead title="메뉴"></SectionHead>
          <SectionBody>Hello, {currentUser.name}!</SectionBody>
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

import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { useCallback, useContext, useMemo } from "react";
import { WindowMinWidth } from "@/components/constants";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const windowSize = useContext(WindowSizeContext);

  const needsCompactButton = useMemo(
    () => windowSize.width <= WindowMinWidth.mobile,
    [windowSize.width, WindowMinWidth.mobile],
  );
  const handleMenuButton = useCallback(() => {
    router.push("/home/menu");
  }, []);

  return (
    <>
      <Container>
        <Section>
          <SectionHead title="홈"></SectionHead>
          <SectionBody>Hello World!</SectionBody>
        </Section>
      </Container>
      <FloatingBottomBar float={true}>
        <ButtonGroup direction="horizontal">
          <Button
            label="보드"
            colorVariant="primary"
            compact={needsCompactButton}
            icon={{
              prefix: "fas",
              name: "chalkboard-user",
            }}
            iconPosition="top"
            fillingVariant="contained"
          />
          <Button
            label="팀"
            colorVariant="primary"
            compact={needsCompactButton}
            icon={{
              prefix: "fas",
              name: "users",
            }}
            iconPosition="top"
            fillingVariant="contained"
          />
          <Button
            label="빠른 매칭"
            colorVariant="primary"
            compact={needsCompactButton}
            icon={{
              prefix: "fas",
              name: "fire-flame-curved",
            }}
            iconPosition="top"
            fillingVariant="contained"
          />
          <Button
            label={`coming\nsoon`}
            colorVariant="greyscale"
            compact={needsCompactButton}
            icon={{
              prefix: "fas",
              name: "screwdriver-wrench",
            }}
            iconPosition="top"
            fillingVariant="contained"
          />
          <Button
            label="메뉴"
            colorVariant="primary"
            compact={needsCompactButton}
            icon={{
              prefix: "fas",
              name: "bars",
            }}
            iconPosition="top"
            fillingVariant="contained"
            onClick={handleMenuButton}
          />
        </ButtonGroup>
      </FloatingBottomBar>
    </>
  );
};

export default Home;

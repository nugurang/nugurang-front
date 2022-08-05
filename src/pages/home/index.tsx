import { Button, ButtonGroup } from "@/components/Button";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { Section, SectionHead, SectionBody } from "@/compositions/Section";
import Link from "next/link";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { useContext, useMemo } from "react";
import { WindowMinWidth } from "@/components/constants";

const Home = () => {
  const windowSize = useContext(WindowSizeContext);
  const needsCompactButton = useMemo(
    () => windowSize.width <= WindowMinWidth.mobile,
    [windowSize.width, WindowMinWidth.mobile],
  );
  return (
    <>
      <Container fixedWidth={true}>
        <Section>
          <SectionHead title="홈"></SectionHead>
          <SectionBody>Hello World!</SectionBody>
        </Section>
      </Container>
      <Container backgroundColor="transparent" fixedWidth={true}>
        <FloatingBottomBar float={true} margin={{ bottom: 8 }}>
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
            />
          </ButtonGroup>
        </FloatingBottomBar>
      </Container>
    </>
  );
};

export default Home;

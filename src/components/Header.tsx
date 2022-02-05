import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import Span from '@/src/components/base/Span';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const height = '64px';

type User = {
  name: string;
  imageUrl?: string;
}

interface ComponentProps extends CommonProps {
  callbackUrl?: string;
  user?: User;
}

interface StyledProps extends CommonProps {}

// Header가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled(Div)`
  ${(props: any) => `
    height: ${height};
  `}
`;

const StyledHeaderWrap = styled.header<StyledProps>`
  ${(props: StyledProps) => `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${props.theme.palette.primary.main};
    color: ${props.theme.palette.primary.text};
    height: ${height};
    z-index: 20;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledLogoTextWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    color: ${props.theme.palette.primary.text};
    font-size: 24px;
    margin-left: 8px;
  `}
`;

const StyledLeftsideWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
  `}
`;

const StyledRightsideWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
  `}
`;

const Logo: NextPage = () => {
  return (
    <StyledLogoTextWrap>nugurang</StyledLogoTextWrap>
  );
};

const Header: NextPage<ComponentProps> = ({ user, callbackUrl }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      <StyledDivDummy />
      <StyledHeaderWrap>
        <WidthLimiter>
          <StyledLeftsideWrap>
            <Logo />
          </StyledLeftsideWrap>
          <StyledRightsideWrap>
            {
              !user && <>
                <Button
                  palette='primary'
                  onClick={() => router.push({
                    pathname: '/login',
                    query: { callbackUrl },
                  })}
                >
                  { t('login') }
                </Button>
              </>
            }
          </StyledRightsideWrap>
        </WidthLimiter>
      </StyledHeaderWrap>
    </>
  );
};

export default Header;

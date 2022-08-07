import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss, onClickCss } from "@/components/css";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
  isFontAwesomeIconProps,
} from "@/components/Icon";
import { makeMargin, makePadding } from "@/components/type";

const wrapCss = ({ margin, theme }) =>
  cx(
    baseCss,
    css`
      display: flex;
      align-items: center;
      ${margin
        ? `margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;`
        : ""}
    `,
  );

const iconWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      font-size: 20px;
      margin-right: 8px;
    `,
  );

const iconButtonCss = ({ theme }) =>
  cx(
    baseCss,
    onClickCss,
    css`
      border: 0px solid #000;
      border-radius: 50%;
      padding: 4px;

      background-color: ${theme.colors.translucent.light};
      border: 2px solid transparent;
      &:hover {
        background-color: ${theme.colors.translucent.main};
        border: 2px solid transparent;
      }
    `,
  );

const titleCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      display: block;
      font-size: 20px;
      font-weight: 700;
    `,
  );

const IconBody = ({ icon }) => (
  <>
    <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
  </>
);

interface ComponentProps {
  children?: React.ReactNode;
  icon?: FontAwesomeIconProps;
  title?: string;
  onClickIcon?: () => void;
}
const SectionHead = ({
  children,
  icon,
  title,
  onClickIcon,
}: ComponentProps) => {
  const theme = useTheme();
  const margin = {
    x: 16,
  };

  return (
    <div
      className={wrapCss({
        margin: makeMargin(margin),
        theme,
      })}>
      {isFontAwesomeIconProps(icon) && (
        <span className={iconWrapCss({ theme })}>
          {onClickIcon && (
            <>
              <button
                className={iconButtonCss({ theme })}
                onClick={onClickIcon}>
                <IconBody icon={icon} />
              </button>
            </>
          )}
          {!onClickIcon && (
            <>
              <IconBody icon={icon} />
            </>
          )}
        </span>
      )}
      <span className={titleCss({ theme })}>{title}</span>
      {children}
    </div>
  );
};

export default SectionHead;

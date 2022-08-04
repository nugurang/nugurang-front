import { useMemo, useRef, useState } from "react";
import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Textfield } from "@/components/Textfield";
import { useElementSize } from "@/hooks/utilities";
import { baseCss } from "@/components/css";
import useIsomorphicLayoutEffect from "@/hooks/utilities/useIsomorphicLayoutEffect";

const wrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      padding: 16px;
    `,
  );

const formItemWrapCss = ({ smallWidthMode, theme }) =>
  cx(
    baseCss,
    css`
      ${smallWidthMode ? "display: block;" : "display: flex;"}
      &:not(:first-of-type) {
        margin-top: 16px;
      }
    `,
  );

const formItemLabelWrapCss = ({
  maxLabelWidth,
  minLabelWidth,
  smallWidthMode,
  theme,
}) =>
  cx(
    baseCss,
    css`
      margin-left: 4px;
      ${minLabelWidth ? `min-width: ${minLabelWidth}px;` : ""}
      ${maxLabelWidth ? `max-width: ${maxLabelWidth}px;` : ""}
      ${smallWidthMode
        ? `
          display: block;
          padding-bottom: 8px;
        `
        : `
          display: inline-block;
          padding: 8px 0;
        `}
    `,
  );

const formItemLabelCss = ({ required, theme }) =>
  cx(
    baseCss,
    css`
      ${required &&
      `
        &::before {
          display: inline-block;
          content: "";
          height: 4px;
          width: 4px;
          margin-right: 2px;
          vertical-align: top;
          background-color: #ff0000;
          border-radius: 50%;
        }
      `}
    `,
  );

const formItemInputWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      display: inline-block;
      width: 100%;
    `,
  );

export type InputFormItemTypeProps = "textfield";
export interface InputFormItemOptionProps {
  value: string;
  label?: string;
  enable?: boolean;
}
export interface InputFormItemDTOProps {
  id: string;
  value: string;
}
export interface InputFormItemProps {
  id: string;
  value: string;
  type: InputFormItemTypeProps;
  label?: string;
  sublabel?: string;
  placeholder?: string;
  required?: boolean;
  enable?: boolean;
  options?: InputFormItemOptionProps[];
}
interface CompositionProps {
  formItems: InputFormItemProps[];
  maxLabelWidth?: number;
  minLabelWidth?: number;
  smallWidthModeThreshold?: number;
  onChange?: (as: InputFormItemDTOProps) => void;
}
const InputForm = ({
  formItems,
  maxLabelWidth = 240,
  minLabelWidth = 180,
  smallWidthModeThreshold = 480,
  onChange,
}: CompositionProps) => {
  const wrapRef = useRef<HTMLFormElement | undefined>(undefined);
  const elementSize = useElementSize(wrapRef);
  const [elementSizeCache, setElementSizeCache] = useState({
    height: 0,
    width: 0,
  });

  useIsomorphicLayoutEffect(() => {
    setElementSizeCache((prev) => {
      if (elementSize.height === 0 || elementSize.width === 0) return prev;
      else return elementSize;
    });
  }, [elementSize]);

  const smallWidthMode = useMemo(
    () => elementSizeCache.width < smallWidthModeThreshold,
    [elementSizeCache.width, smallWidthModeThreshold],
  );
  const theme = useTheme();

  return (
    <form className={wrapCss({ theme })} ref={wrapRef}>
      {formItems.map((formItem) => {
        switch (formItem.type) {
          case "textfield":
            return (
              <div
                key={formItem.id}
                className={formItemWrapCss({ smallWidthMode, theme })}>
                <div
                  className={formItemLabelWrapCss({
                    maxLabelWidth,
                    minLabelWidth,
                    smallWidthMode,
                    theme,
                  })}>
                  <span
                    className={formItemLabelCss({
                      required: formItem.required,
                      theme,
                    })}>
                    {formItem.label || formItem.id}
                  </span>
                </div>
                <div className={formItemInputWrapCss({ theme })}>
                  <Textfield
                    value={formItem.value}
                    onChange={(value) => onChange({ id: formItem.id, value })}
                  />
                </div>
              </div>
            );
          default:
            return <></>;
        }
      })}
    </form>
  );
};

export default InputForm;

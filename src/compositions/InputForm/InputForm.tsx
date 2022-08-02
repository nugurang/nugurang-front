import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Button, ButtonGroup } from "@/components/Button";

const wrapCss = ({ theme }) =>
  cx(
    css`
      padding: 8px;
    `,
  );

interface CompositionProps {
  onChange?: (value: string) => void;
}
const InputForm = ({ onChange }: CompositionProps) => {
  const theme = useTheme();
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.value);
  };

  return (
    <form className={wrapCss({ theme })}>
      <ButtonGroup>
        <Button label="Reset" colorVariant="error" fillingVariant="contained" />
        <Button
          label="Submit"
          colorVariant="primary"
          fillingVariant="contained"
        />
      </ButtonGroup>
    </form>
  );
};

export default InputForm;

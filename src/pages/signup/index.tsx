import { useState } from "react";
import { useRouter } from "next/router";
import produce from "immer";
import { Container } from "@/compositions/Container";
import { FloatingBottomBar } from "@/compositions/FloatingBottomBar";
import { InputForm } from "@/compositions/InputForm";
import { Section, SectionBody, SectionHead } from "@/compositions/Section";
import {
  InputFormItemTypeProps,
  InputFormItemProps,
  InputFormItemDTOProps,
} from "@/compositions/InputForm";
import { Button, ButtonGroup } from "@/components/Button";
import { getCurrentOAuthUser } from "@/services/oAuthUser";
import { createUser } from "@/services/user";

export const getServerSideProps = async (context) => {
  const currentOAuthUserResponse = await getCurrentOAuthUser(context);
  if (currentOAuthUserResponse.data === undefined) {
    return {
      redirect: {
        destination: "/signin/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentOAuthUser: currentOAuthUserResponse.data,
    },
  };
};

const Signup = ({ currentOAuthUser }) => {
  const router = useRouter();
  const [inputFormItems, setInputFormItems] = useState<InputFormItemProps[]>([
    {
      id: "name",
      type: "textfield" as InputFormItemTypeProps,
      value: currentOAuthUser.name || "",
      label: "Name",
      required: true,
    },
    {
      id: "email",
      type: "textfield" as InputFormItemTypeProps,
      value: currentOAuthUser.email || "",
      label: "Email",
      required: true,
    },
    {
      id: "biography",
      type: "textfield" as InputFormItemTypeProps,
      value: "",
      label: "Bio",
    },
  ]);
  const updateInputFormItems = (newInputFormItem: InputFormItemDTOProps) => {
    setInputFormItems((prevList) =>
      produce(prevList, (list) => {
        const index = list.findIndex(
          (element) => element.id === newInputFormItem.id,
        );
        if (index !== -1) list[index].value = newInputFormItem.value;
      }),
    );
  };

  const handleClickBackButton = () => {
    router.back();
  };
  const handleClickSubmitButton = async () => {
    const response = await createUser(undefined, {
      name: inputFormItems.find((item) => item.id === "name").value,
      email: inputFormItems.find((item) => item.id === "email").value,
      biography: inputFormItems.find((item) => item.id === "biography").value,
    });
    console.log(response);
  };

  /*
  const createUser = async () => {
    let image;
    if (newImageAddress.current.value) {
      const res = await mutate({
        mutation: new CreateImageMutationBuilder().build(),
        variables: { address: newImageAddress.current.value },
      });
      image = res.data.createImage.id;
    }
    await mutate({
      mutation: new CreateUserMutationBuilder().build(),
      variables: {
        user: {
          name: newName.current.value,
          email: newEmail.current.value,
          biography: "",
          image,
        },
      },
    });
  };
*/
  return (
    <>
      <Container fixedWidth={true}>
        <Section>
          <SectionHead
            title="회원가입"
            icon={{
              prefix: "fas",
              name: "user-plus",
            }}></SectionHead>
          <SectionBody>
            <InputForm
              formItems={inputFormItems}
              onChange={updateInputFormItems}
            />
          </SectionBody>
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
              onClick={handleClickBackButton}
            />
            <Button
              label="초기화"
              colorVariant="error"
              icon={{
                prefix: "fas",
                name: "arrow-rotate-left",
              }}
              fillingVariant="contained"
            />
            <Button
              label="제출"
              colorVariant="primary"
              icon={{
                prefix: "fas",
                name: "paper-plane",
              }}
              fillingVariant="contained"
              onClick={handleClickSubmitButton}
            />
          </ButtonGroup>
        </FloatingBottomBar>
      </Container>
    </>
  );
};

export default Signup;

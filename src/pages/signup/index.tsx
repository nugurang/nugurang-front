import { useState } from "react";
import Link from "next/link";
import produce from "immer";
import { Container } from "@/compositions/Container";
import { InputForm } from "@/compositions/InputForm";
import { mutate } from "@/services/backend";
import {
  InputFormItemTypeProps,
  InputFormItemProps,
  InputFormItemDTOProps,
} from "@/compositions/InputForm";

const initialInputFormItems = [
  {
    id: "id",
    type: "textfield" as InputFormItemTypeProps,
    value: "",
    label: "ID",
    required: true,
  },
];

const Home = () => {
  const [inputFormItems, setInputFormItems] = useState<InputFormItemProps[]>(
    initialInputFormItems,
  );
  const updateImputFormItems = (newInputFormItem: InputFormItemDTOProps) => {
    setInputFormItems((prevList) =>
      produce(prevList, (list) => {
        const index = list.findIndex(
          (element) => element.id === newInputFormItem.id,
        );
        if (index !== -1) list[index].value = newInputFormItem.value;
      }),
    );
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
    <Container fixedWidth={true}>
      <InputForm formItems={inputFormItems} onChange={updateImputFormItems} />
    </Container>
  );
};

export default Home;

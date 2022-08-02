import { Container } from "@/components/Container";
import { InputForm } from "@/compositions/InputForm";
import { mutate } from "@/services/backend";
import Link from "next/link";

const Home = () => {
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
    <Container fixedWidth>
      <InputForm />
    </Container>
  );
};

export default Home;

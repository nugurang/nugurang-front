import { mutate, query } from '@/backend/transaction';

export interface CreateImageProps {
  address: string;
}
export const createImage = async (context: any, props: CreateImageProps) => {
  const response = await mutate(context, `
    mutation CreateImage($address: String!) {
      createImage (address: $address) {
        id
        address
      }
    }
  `, props);
  return {
    data: response.data?.createImage ?? null
  };
};

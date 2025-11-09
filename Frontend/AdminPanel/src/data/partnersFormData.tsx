import * as Yup from "yup";
export interface PartnerProps {
  imageUrl: File | null | string;
  image?: File | null | string;
}
export const partnersInitialValues = {
  image: null,
}
export const partnersInitialValuesSecond = {
  imageUrl: null,
}
export const usePartnerSchemaValidation = () => {
  return Yup.object().shape({
    image: Yup.mixed(),
  });
};
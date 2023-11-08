import { useSelector } from "react-redux";

export const useGetForms = () => {
  return useSelector((state: any) => state.forms);
};

export const useGetFormToUpdate = (uuid: string) => {
  const forms = useGetForms();
  console.log(forms);
  return forms.find((item: { uuid: string }) => item.uuid === uuid) || null;
};

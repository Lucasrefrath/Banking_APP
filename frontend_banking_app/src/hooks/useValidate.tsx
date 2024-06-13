const useValidate = () => {

  const stringIsEmpty = (string: string): boolean => {
    if(string === "") return true
    return string.replaceAll(" ", "") === ""
  }

  return { stringIsEmpty };
};

export default useValidate;
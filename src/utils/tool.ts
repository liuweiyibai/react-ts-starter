export const handleClick = () => {
  alert(1);
};

export const sleep = (mill: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, mill);
  });
};

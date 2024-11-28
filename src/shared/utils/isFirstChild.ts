export const isFirstChild = (el: Element | null) => {
  if (!el) return false;
  return (
    el.parentElement && Array.from(el.parentElement.children).indexOf(el) === 0
  );
};

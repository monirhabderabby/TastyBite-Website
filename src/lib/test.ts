// @ts-nocheck
export async function wait(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

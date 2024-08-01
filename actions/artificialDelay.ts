"use server";
export async function artificialDelay() {
  return await new Promise((res, rej) => {
    setTimeout(
      () => {
        res("");
      },
      parseInt(process.env.NEX_PUBLIC_DELAY ?? (5000).toString()),
    );
  });
}

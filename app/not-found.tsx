"use client";

// next
import Head from "next/head";

export default function Page404() {
  return (
    <>
      <Head>
        <title> صفحه یافت نشد</title>
      </Head>
      <div>
        <h1>
          متاسفانه صفحه درخواستی یافت نشد. لطفا آدرس مرورگر را بررسی نمایید.
        </h1>
        {/* <Button component={NextLink} href='/panel/dashboard' size='large' variant='contained'>
          بازگشت به صفحه نخست
        </Button> */}
      </div>
    </>
  );
}

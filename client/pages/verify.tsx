import React from "react";
import VerifyTemplate from "../components/templates/verify-template/VerifyCodeTemplate";
// always run on build time
// export const getServerSideProps = async () => {
//   try {
//     const queryClient = new QueryClient();
//     const { auth, user }: any = await queryClient.fetchQuery(['userAuth'], userAuth);
//     // if user is already verified redirect to /home
//     if (auth.verified === true) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/home',
//         },
//         props: {
//           // dehydrate query cache
//           dehydratedState: dehydrate(queryClient),
//         },
//       };
//     }
//     // else continue to register page as guest
//     return {
//       props: {
//         // dehydrate query cache
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         error: {
//           message: `Internal Error`,
//           statusCode: 404,
//         },
//       },
//     };
//   }
// };
const Verify = () => {
  return <VerifyTemplate />;
};

export default Verify;

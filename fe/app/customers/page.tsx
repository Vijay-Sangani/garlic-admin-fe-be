import { JSX, Suspense } from "react";

import CustomersContent from "./CustomersContent";

const CustomersPage = (): JSX.Element => (
  <Suspense fallback={null}>
    <CustomersContent />
  </Suspense>
);

export default CustomersPage;

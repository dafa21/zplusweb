import useBreadcrumb from "@/store/use-breadcrumb";
import React from "react";

export default function useNavBreadcrumb(breadcrumbs) {
  const { setBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
}

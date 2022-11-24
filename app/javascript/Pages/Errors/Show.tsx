import React from "react";
import { EmptyStateActions, EmptyStateBody, EmptyStateContainer, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@saas-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Link } from "@inertiajs/inertia-react";

type IProps = {
  status: number;
};

const ErrorsShow: React.FC = ({ status }: IProps) => {
  const ERROR_MESSAGES = {
    404: "The page you were looking for doesn't exist",
    422: "The change you wanted was rejected",
    500: "We're sorry, but something went wrong",
  };
  return (
    <EmptyStateContainer colorScheme="purple">
      <EmptyStateBody>
        <EmptyStateIcon as={WarningTwoIcon} />

        <EmptyStateTitle>Error {status}</EmptyStateTitle>
        <EmptyStateDescription>{ERROR_MESSAGES[status] || "Unknown Error"}</EmptyStateDescription>
        <EmptyStateActions>
          <Link href="/">
            <Button colorScheme="purple">Home</Button>
          </Link>
        </EmptyStateActions>
      </EmptyStateBody>
    </EmptyStateContainer>
  );
};

export default ErrorsShow;

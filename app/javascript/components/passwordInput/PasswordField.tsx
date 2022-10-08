import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from "@chakra-ui/react";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

type IProps = {
  password: string;
  ref: any;
  // eslint-disable-next-line no-unused-vars
  handValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirm?: boolean;
  password_confirmation?: string;
};

const PasswordField = ({ password, handValue, ref, isConfirm, password_confirmation }: IProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef: any = React.useRef();

  const isError = password !== password_confirmation;
  const isShortError = password?.length < 8;

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl variant="floating" isRequired>
      <InputGroup>
        <InputRightElement>
          <IconButton variant="link" mb="-12px" aria-label={isOpen ? "Mask password" : "Reveal password"} icon={isOpen ? <HiEyeOff /> : <HiEye />} onClick={onClickReveal} />
        </InputRightElement>
        <Input
          id={isConfirm ? "password_confirmation" : "password"}
          fontSize="sm"
          ms="4px"
          borderRadius="15px"
          placeholder=" "
          ref={mergeRef}
          name={isConfirm ? "password_confirmation" : "password"}
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          mb="24px"
          size="lg"
          variant="filled"
          value={isConfirm ? password_confirmation : password}
          onChange={e => handValue(e)}
        />
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          {isConfirm ? "密码确认" : "密码"}
        </FormLabel>
        {isShortError && <FormErrorMessage>密码太短</FormErrorMessage>}
        {isConfirm && isError && <FormErrorMessage>密码错误</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

PasswordField.displayName = "PasswordField";

export default PasswordField;

import React, { useState, useCallback } from "react";
import { Box, Flex, Button, FormControl, FormLabel, Heading, Input, Switch, Text, useColorModeValue, HStack, useDisclosure, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
// import type { UserLogin } from '../../data-types/user';
import * as Routes from "../../utils/routes.js";
import PasswordField from "../../components/passwordInput/PasswordField";
import { Head } from "@inertiajs/inertia-react";

const Login = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const modalProps = { isOpen, onOpen, onClose };

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const handValue = useCallback(e => setData({ ...data, [e.target.name]: e.target.value }), [data]);

  const handleSubmit = e => {
    e.preventDefault();
    post(Routes.user_session());
  };

  return (
    <>
      <Head title="Login" />
      <Flex position="relative" mb="40px">
        <Flex h={{ sm: "initial", md: "75vh", lg: "85vh" }} w="100%" maxW="1044px" mx="auto" justifyContent="space-between" mb="30px" pt={{ sm: "100px", md: "0px" }}>
          <Flex alignItems="center" justifyContent="start" style={{ userSelect: "none" }} mb="60px" mt="20px" w={{ base: "100%", md: "100%", lg: "102%" }}>
            <Flex
              direction="column"
              w="440px"
              height="620px"
              background="transparent"
              borderRadius="15px"
              p="40px"
              mt={{ sm: "80px", md: "120px", lg: "200px", xl: "140px" }}
              mx={{ base: "100px", md: "150px", lg: "80px" }}
              bg={bgColor}
              boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
            >
              <Heading color={titleColor} fontSize="32px" mb="10px">
                欢迎回来
              </Heading>
              <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
                填入你的邮箱和密码
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl variant="floating" isRequired>
                  <Input
                    autoFocus={true}
                    borderRadius="15px"
                    fontSize="sm"
                    mb="36px"
                    variant="filled"
                    type="text"
                    placeholder=" "
                    size="lg"
                    value={data?.email}
                    name="email"
                    onChange={e => handValue(e)}
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
                    电子邮件
                  </FormLabel>
                  {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>
                <PasswordField password={data?.password} handValue={handValue} ref={undefined} isConfirm={false} />
                {/*
            <PasswordField
              password_confirmation={user.password_confirmation}
              handValue={handValue}
              ref={undefined}
              isConfirm={true}
            /> */}
                <HStack justify="space-between">
                  <FormControl display="flex" alignItems="center">
                    <Switch id="remember-login" colorScheme="teal" me="10px" />
                    <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
                      记住我
                    </FormLabel>
                  </FormControl>
                  {/* <Button
                variant="link"
                colorScheme="blue"
                size="sm"
                onClick={() => handSend()}
              >
                忘记密码?
              </Button> */}
                </HStack>
                <Button
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="10px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                  disabled={processing}
                  onClick={e => handleSubmit(e)}
                >
                  <Box fontSize="18px">登录</Box>
                </Button>
              </form>
              {/* <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="10px"
              _hover={{
                bg: 'teal.200',
              }}
              _active={{
                bg: 'teal.400',
              }}
              onClick={() => handWechatLogin()}
            >
              <Box fontSize="18px">微信登录</Box>
            </Button> */}
              <Flex flexDirection="column" justifyContent="center" alignItems="center" maxW="100%" mt="0px">
                {/* <Text color={textColor} fontWeight="medium">
                您还没有账号?
                <Box
                  onClick={() => navigate.push('/auth/signup')}
                  color={titleColor}
                  as="span"
                  ms="5px"
                  fontWeight="bold"
                >
                  注册
                </Box>
              </Text> */}
              </Flex>
            </Flex>
          </Flex>
          <Box display={{ base: "none", md: "block" }} overflowX="hidden" h="100%" w="40vw" position="absolute" right="0px">
            <Box
              // bgImage={signInImage}
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="50%"
              position="absolute"
              borderBottomLeftRadius="20px"
            ></Box>
          </Box>
        </Flex>
        {/* <ForgotPassword {...modalProps} /> */}
      </Flex>
    </>
  );
};

export default Login;

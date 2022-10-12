export const buttonStyles = {
  components: {
    Button: {
      variants: {
        'no-hover': {
          _hover: {
            boxShadow: 'none',
          },
        },
        'transparent-with-icon': {
          bg: 'transparent',
          fontWeight: 'bold',
          borderRadius: 'inherit',
          cursor: 'pointer',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
            outline: 'none',
          },
          _hover: {
            boxShadow: 'none',
          },
        },
      },
      baseStyle: {
        borderRadius: '15px',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
};

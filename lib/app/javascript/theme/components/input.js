const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px) translateX(-10px)",
};
const labelStyle = {
    top: 0,
    left: 0,
    zIndex: 2,
    position: "absolute",
    pointerEvents: "none",
    mx: 3,
    px: 1,
    my: 3,
    transformOrigin: "left top",
};
const noinputStyles = {
    "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
        ...activeLabelStyles,
        backgroundColor: "white",
    },
    "textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
        ...activeLabelStyles,
        backgroundColor: "white",
    },
};
export const inputStyles = {
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles,
                                backgroundColor: "white",
                            },
                        },
                        ...noinputStyles,
                        label: {
                            backgroundColor: "gray.30",
                            ...labelStyle,
                        },
                    },
                },
                editfloating: {
                    container: {
                        _focusWithin: {
                            label: {
                                backgroundColor: "white",
                            },
                        },
                        ...noinputStyles,
                        label: {
                            backgroundColor: "white",
                            ...labelStyle,
                            ...activeLabelStyles,
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=input.js.map
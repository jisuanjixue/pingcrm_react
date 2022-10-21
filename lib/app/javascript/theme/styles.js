import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
    styles: {
        global: props => ({
            body: {
                bg: mode("gray.50", "gray.800")(props),
                fontFamily: "Helvetica, sans-serif",
            },
            html: {
                fontFamily: "Helvetica, sans-serif",
            },
        }),
    },
};
//# sourceMappingURL=styles.js.map
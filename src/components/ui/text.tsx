import { TextRef } from "@rn-primitives/types";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "~/lib/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

const textVariants = cva("", {
  variants: {
    variant: {
      h1: `text-3xl`,
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      h5: "text-md",
      h6: "text-sm",
      p1: "text-md",
      p2: "text-sm",
      p3: "text-xs",
      c1: "text-2xs",
    },
    weight: {
      regular: "font-regular font-[Urbanist-Regular]",
      medium: "font-medium font-[Urbanist-Medium]",
      semiBold: "font-semibold font-[Urbanist-SemiBold]",
      bold: "font-bold font-[Urbanist-Bold]",
    },
    defaultVariants: {
      variant: "p1",
      weight: "regular",
    },
  },
});

type TextProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, variant, weight, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    return (
      <RNText
        className={cn(
          "text-base text-foreground  web:select-text",
          textClass,
          className,
          textVariants({ variant, weight, className }),
        )}
        allowFontScaling={false}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext };

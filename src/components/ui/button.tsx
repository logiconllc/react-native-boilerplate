import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { cn } from "~/lib/utils";
import { Text, TextClassContext } from "~/components/ui/text";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-[4px] web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-border border-primary bg-transparent web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
      },
      size: {
        default: "h-12 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-[4px] px-3",
        lg: "h-11 rounded-[4px] px-8 native:h-14",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-destructive-foreground",
        outline: "text-primary group-active:text-primary",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps & { loading?: boolean; loadingText?: string }
>(
  (
    {
      className,
      variant,
      size,
      loading,
      children,
      loadingText = "Loading...",
      ...props
    },
    ref,
  ) => {
    return (
      <TextClassContext.Provider
        value={buttonTextVariants({
          variant,
          size,
          className: "web:pointer-events-none",
        })}
      >
        <Pressable
          className={cn(
            props.disabled && "opacity-50 web:pointer-events-none",
            buttonVariants({ variant, size, className }),
            loading && "opacity-75 web:pointer-events-none",
          )}
          ref={ref}
          accessibilityRole="button"
          disabled={loading}
          {...props}
        >
          {loading ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator animating size="small" color="white" />
              <Text variant="p2" weight="bold">
                {loadingText}
              </Text>
            </View>
          ) : (
            children
          )}
        </Pressable>
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

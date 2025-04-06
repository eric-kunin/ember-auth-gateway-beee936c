
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = { theme: "dark" };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-custom-medium group-[.toaster]:text-white group-[.toaster]:border-custom-primary/20 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-custom-lighter",
          actionButton:
            "group-[.toast]:bg-custom-primary group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-custom-medium group-[.toast]:text-custom-lighter",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

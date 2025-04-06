
import { useTheme } from "@/components/ThemeProvider";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#240046] group-[.toaster]:text-white group-[.toaster]:border-[#9D4EDD]/20 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-custom-lighter",
          actionButton:
            "group-[.toast]:bg-[#9D4EDD] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#240046] group-[.toast]:text-custom-lighter",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

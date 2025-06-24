import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <Theme
      appearance="light"
      accentColor="blue"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="medium"
    >
      {children}
    </Theme>
  );
}

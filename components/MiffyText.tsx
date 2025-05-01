import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TextProps } from "react-native";

interface MiffyTextProps extends TextProps {
  text: string;
  isItalic?: boolean;
  color?: string;
  size?: number;
}

export const MiffyText = ({
  text,
  isItalic = false,
  size = 36,
  color = "miffyPrimary",
  ...restProps
}: MiffyTextProps) => {
  const fontFamily = isItalic
    ? "DMSerifDisplay_400Regular_Italic"
    : "DMSerifDisplay_400Regular";

  let textColor: string;
  if (typeof color === "string") {
    if (
      color in Colors &&
      typeof Colors[color as keyof typeof Colors] === "string"
    ) {
      textColor = Colors[color as keyof typeof Colors] as string;
    } else {
      textColor = color;
    }
  } else {
    textColor = Colors.miffyPrimary as string;
  }

  return (
    <Text
      style={{
        color: textColor,
        fontFamily,
        fontSize: size,
        // textAlign: "center",
      }}
      {...restProps}
    >
      {text}
    </Text>
  );
};

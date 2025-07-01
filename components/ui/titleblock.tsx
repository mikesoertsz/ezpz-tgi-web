"use client";

import { cva } from "class-variance-authority";
import { PreHeading, Heading, SubHeading, Body } from "@/components/atoms";
import { useInView } from "react-intersection-observer";
import TerminalTextLine from "../TerminalTextLine";

const titleStyles = cva("flex w-full max-w-3xl", {
  variants: {
    theme: {
      light: "text-black",
      dark: "text-white",
    },
    orientation: {
      center:
        "flex-col items-center justify-center w-full text-center gap-2 mb-6",
      left: "flex-col items-start justify-start w-full text-left gap-2",
    },
  },
  compoundVariants: [
    {
      theme: "light",
      orientation: "center",
      class: "flex-col items-center justify-center text-black",
    },
    {
      theme: "light",
      orientation: "left",
      class: "flex-col items-start justify-start text-black",
    },
    {
      theme: "dark",
      orientation: "center",
      class: "flex-col items-center justify-center text-white",
    },
    {
      theme: "dark",
      orientation: "left",
      class: "flex-col items-start justify-start text-gray-200",
    },
  ],
  defaultVariants: {
    theme: "light",
    orientation: "center",
  },
});

interface TitleBlockProps {
  icon?: React.ReactNode;
  image?: string;
  preheading?: string;
  heading?: string;
  subheading?: string;
  body?: string | React.ReactNode;
  theme: "light" | "dark";
  orientation: "center" | "left";
  /**
   * Optional className for TerminalTextLine (preheading), e.g. for color/shadow
   */
  terminalTextClassName?: string;
}

export function TitleBlock({
  preheading,
  heading,
  subheading,
  body,
  theme = "light",
  orientation = "center",
  terminalTextClassName,
}: TitleBlockProps) {
  const darkModeStyles = {
    preHeading: "text-brand-g1", // Example color for PreHeading in dark mode
    body: "text-gray-400", // Example color for Body in dark mode
  };

  // Intersection Observer for PreHeading
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: "-50% 0px 0px 0px",
    initialInView: true,
  });

  return (
    <div className={titleStyles({ theme, orientation })}>
      {preheading && (
        <PreHeading
          ref={ref}
          className={theme === "dark" ? darkModeStyles.preHeading : ""}
        >
          {inView ? (
            <TerminalTextLine
              text={preheading}
              className={terminalTextClassName}
            />
          ) : (
            <span style={{ opacity: 0 }}>{preheading}</span>
          )}
        </PreHeading>
      )}
      {heading && (
        <Heading className="font-roboto font-light tracking-tighter text-3xl md:text-4xl subpixel-antialiased">
          {heading}
        </Heading>
      )}
      {subheading && <SubHeading>{subheading}</SubHeading>}
      {body && (
        <Body
          className={`${
            theme === "dark" ? darkModeStyles.body : "text-stone-500"
          }`}
        >
          {body}
        </Body>
      )}
    </div>
  );
}

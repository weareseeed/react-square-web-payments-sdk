// Dependencies
import * as React from "react";

export const getRefElement = <T>(
  element?: React.RefObject<Element> | T
): Element | T | undefined | null | React.RefObject<Element> => {
  if (element && "current" in element) {
    return element.current;
  }

  return element;
};

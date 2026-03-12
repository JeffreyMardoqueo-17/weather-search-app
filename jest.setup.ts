import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const React = require("react")
    const { alt, priority: _priority, ...rest } = props
    return React.createElement("img", { alt: alt ?? "", ...rest })
  },
}))

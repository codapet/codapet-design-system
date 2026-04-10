"use client"

import { CircleCheck, Info, TriangleAlert } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

const iconWrapper = (icon: React.ReactNode) => (
  <span className="flex items-center justify-center shrink-0 size-5 [&_svg]:size-5">
    {icon}
  </span>
)

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        info: iconWrapper(<Info />),
        error: iconWrapper(<TriangleAlert />),
        success: iconWrapper(<CircleCheck />),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-start gap-3 w-full rounded-[12px] border px-3 py-4 text-sm leading-5",
          title: "font-semibold text-sm leading-5 text-vibrant-text-heading",
          description: "font-normal text-sm leading-5 text-vibrant-text-body",
          info: "bg-alert-bg-informative border-gray-stroke-light [&_svg]:text-[#52525c] dark:[&_svg]:text-[#a1a1aa]",
          error:
            "bg-alert-bg-error border-error-stroke-light [&_svg]:text-[#ff6467] dark:[&_svg]:text-[#ff8486]",
          success:
            "bg-success-surface-subtle border-success-stroke-light [&_svg]:text-[#00a63e] dark:[&_svg]:text-[#34d399]",
        },
      }}
      style={
        {
          "--width": "436px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }

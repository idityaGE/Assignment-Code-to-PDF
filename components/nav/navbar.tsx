import { Asterisk } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function Nav() {
  return (
    <nav className="flex items-center justify-between w-full mb-4">
      <h1 className="text-3xl font-bold ">Assignment PDF Generator </h1>
      <kbd className="flex"><Asterisk className="pb-2" /> Only optimized for the large devices like Laptop and Desktop.</kbd>
      <a className="underline" target="_blank" href="https://github.com/idityaGE/Assignment-Code-to-PDF"><GitHubLogoIcon className="h-10 w-10" /></a>
    </nav>
  )
}
import Link from "next/link"
import { UserMenu } from "./user-menu"

export function Navbar() {
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl tracking-tight">
            Brand<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/docs" className="transition-colors hover:text-foreground">Documentation</Link>
          </nav>
        </div>

        {/* Authentication Right-Side Section */}
        <UserMenu />

      </div>
    </header>
  )
}
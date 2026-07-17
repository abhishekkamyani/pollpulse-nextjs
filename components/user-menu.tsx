"use client";

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link";

export const UserMenu = () => {
    const { data: session, status } = useSession()
    const isLoading = status === "loading"
    console.log("=== session ===", session?.user)
    console.log("=== status ===", status)

    return (
        <div className="flex items-center gap-4">
            {isLoading ? (
                // Spinner or skeleton while loading session
                <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : session?.user ? (
                // User is logged in -> Show Dropdown Menu
                <DropdownMenu>
                    <DropdownMenuTrigger className="relative h-9 w-9 rounded-full select-none outline-none hover:bg-muted transition-colors">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "User avatar"} />
                            <AvatarFallback className="bg-primary/10 font-medium text-sm">
                                {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href={"/profile"}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                        <Link href={"/settings"}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => signOut()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                // User is logged out -> Show Auth Buttons
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Link href={"/login"}>Sign In</Link>
                    </Button>
                    <Button size="sm" >
                        <Link href={"/register"}>Join</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

"use client"

import React from 'react'
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useViewStore } from '@/lib/store'
  
export default function HeaderRight() {
    const { setTheme } = useTheme()
    const { setView } = useViewStore()
    return (
        <div className='flex items-center space-x-4'>
            {/* search component */}
            <Select onValueChange={(v) => setView(v)}>
                <SelectTrigger className='w-24 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'>
                    <SelectValue placeholder='Month' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='month'>Month</SelectItem>
                    <SelectItem value='week'>Week</SelectItem>
                    <SelectItem value='day'>Day</SelectItem>
                </SelectContent>
            </Select>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}
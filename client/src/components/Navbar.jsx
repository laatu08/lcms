import React from "react";
import { Menu, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[$0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* for desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"}></School>
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>

        {/* Drop down */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to="/my-learning">My Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}

          {/* darkmode */}
          <DarkMode></DarkMode>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
      <MobileNavbar></MobileNavbar>
      </div>
      
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
    const role="instructor"
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
            <Menu></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode></DarkMode>
        </SheetHeader>
        <Separator></Separator>
        <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <p>Log out</p>
        </nav>
        {
            role==="instructor" && (
                <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Dashboard</Button>
          </SheetClose>
        </SheetFooter>
            )
        }
      </SheetContent>
    </Sheet>
  );
};

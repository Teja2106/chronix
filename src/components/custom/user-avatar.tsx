import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function UserAvatar() {
    return (
        <>
            <div className="flex justify-start ml-5 mt-2.5 h-full w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="hover:cursor-pointer size-12">
                            <AvatarImage src={`https://avatars.githubusercontent.com/u/124599?v=4`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:cursor-pointer"><Link href={`/profile`}>Profile</Link></DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
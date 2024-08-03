import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoDotFill } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { AuthContext } from "./authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const {isLooggedin,setIsLoggedin} = useContext(AuthContext)
  const handleLogout = () => {
    setIsLoggedin(false);
    localStorage.removeItem('isLoggedin');
  };
  
  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel ><Link to={'/profile'}>Profile</Link> </DropdownMenuLabel>
        <DropdownMenuItem>My Courses</DropdownMenuItem>
        <DropdownMenuItem ><Link to={'/create-course'} className="flex items-center gap-1 poppins-regular" > Create Course <GoDotFill className="text-green-600 w-3" /></Link></DropdownMenuItem>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>handleLogout()}> <IoExitOutline style={{
            background:'transparent',
            color:'red',
            marginRight:'4px'
        }} /> Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile
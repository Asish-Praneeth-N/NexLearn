"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { LayoutDashboard, Plus, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "../ui/progress";
import Link from "next/link";
import Image from "next/image";
import { CourseCountContext } from "../context/CourseCountContext";

interface SidebarProps {
  closeSidebar?: () => void; // optional callback for mobile overlay
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const MenuList = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
  ];

  // Properly consume CourseCountContext
  const context = useContext(CourseCountContext);
  if (!context) throw new Error("Sidebar must be used within a CourseCountProvider");

  const { totalCourse } = context;
  const progressValue = (totalCourse / 10) * 100;
  const path = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen bg-neutral-900 text-white border-r border-neutral-800 p-5 shadow-lg relative flex-col justify-between w-64">
        <div>
          <div className="flex gap-2 items-center mb-8">
            <Image src={"/logonexbgrm.png"} width={55} height={55} alt="logo" />
            <h2 className="font-extrabold text-2xl text-white">NexLearn</h2>
          </div>

          <div className="mt-8 space-y-4">
            {totalCourse < 10 ? (
              <Link href={`/create`} className="w-full">
                <Button className="w-full gap-2 bg-white text-black hover:bg-neutral-300 shadow-md">
                  <Plus /> Create New
                </Button>
              </Link>
            ) : (
              <Button disabled className="w-full gap-2 bg-neutral-700 text-neutral-400">
                <Plus /> Create New
              </Button>
            )}

            <div className="mt-6 space-y-2">
              {MenuList.map((menu, index) => (
                <Link href={menu.path} key={index}>
                  <div
                    className={`flex gap-3 items-center p-3 rounded-xl cursor-pointer transition-all ${
                      path === menu.path
                        ? "bg-neutral-700 text-white font-semibold"
                        : "hover:bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    <menu.icon className="w-5 h-5" />
                    <h2>{menu.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Available Credits - Desktop Absolute Bottom */}
        <div className="absolute bottom-6 left-5 right-5 p-5 bg-neutral-800 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-white">
            Available Credits: {10 - totalCourse}
          </h2>
          <Progress value={progressValue} className="mt-2" />
          <h2 className="text-sm text-neutral-400 mt-1">
            {totalCourse} out of 10 Credits Used
          </h2>
          <Link
            href={"/dashboard/upgrade"}
            className="text-xs mt-3 block text-white font-medium hover:underline"
          >
            Upgrade to create more →
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="flex md:hidden h-full flex-col text-white p-5 bg-neutral-900 w-64">
        <div className="space-y-4">
          {totalCourse < 10 ? (
            <Link href={`/create`} onClick={closeSidebar} className="w-full">
              <Button className="w-full gap-2 bg-white text-black hover:bg-neutral-300 shadow-md">
                <Plus /> Create New
              </Button>
            </Link>
          ) : (
            <Button disabled className="w-full gap-2 bg-neutral-700 text-neutral-400">
              <Plus /> Create New
            </Button>
          )}

          <div className="mt-6 space-y-2">
            {MenuList.map((menu, index) => (
              <Link href={menu.path} key={index} onClick={closeSidebar}>
                <div
                  className={`flex gap-3 items-center p-3 rounded-xl cursor-pointer transition-all ${
                    path === menu.path
                      ? "bg-neutral-700 text-white font-semibold"
                      : "hover:bg-neutral-800 text-neutral-300"
                  }`}
                >
                  <menu.icon className="w-5 h-5" />
                  <h2>{menu.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Available Credits - Mobile Slightly Above Bottom (~30px) */}
        <div className="mt-[390px] mb-[30px] p-5 bg-neutral-800 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-white">
            Available Credits: {10 - totalCourse}
          </h2>
          <Progress value={progressValue} className="mt-2" />
          <h2 className="text-sm text-neutral-400 mt-1">
            {totalCourse} out of 10 Credits Used
          </h2>
          <Link
            href={"/dashboard/upgrade"}
            onClick={closeSidebar}
            className="text-xs mt-3 block text-white font-medium hover:underline"
          >
            Upgrade to create more →
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

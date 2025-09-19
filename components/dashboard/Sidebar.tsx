"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { LayoutDashboard, Plus, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "../ui/progress";
import Link from "next/link";
import Image from "next/image";
import { CourseCountContext } from "../context/CourseCountContext";

const Sidebar = () => {
  const MenuList = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { totalCourse } = useContext(CourseCountContext);
  const progressValue = (totalCourse / 10) * 100;
  const path = usePathname();

  return (
    <div className="h-screen bg-white/60 backdrop-blur-xl border-r border-slate-200 p-5 shadow-lg relative">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} width={55} height={55} alt="logo" />
        <h2 className="font-extrabold text-2xl text-indigo-600">LearNova</h2>
      </div>

      <div className="mt-8 space-y-4">
        {totalCourse < 10 ? (
          <Link href={`/create`} className="w-full">
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <Plus /> Create New
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full gap-2">
            <Plus /> Create New
          </Button>
        )}

        <div className="mt-6 space-y-2">
          {MenuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div
                className={`flex gap-3 items-center p-3 rounded-xl cursor-pointer transition-all 
                  ${
                    path === menu.path
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
              >
                <menu.icon className="w-5 h-5" />
                <h2>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-5 right-5 p-5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-indigo-700">
          Available Credits: {10 - totalCourse}
        </h2>
        <Progress value={progressValue} className="mt-2" />
        <h2 className="text-sm text-indigo-600 mt-1">
          {totalCourse} out of 10 Credits Used
        </h2>
        <Link href={"/dashboard/upgrade"} className="text-xs mt-3 block text-indigo-700 font-medium">
          Upgrade to create more →
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

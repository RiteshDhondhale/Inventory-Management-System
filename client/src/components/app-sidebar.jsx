import { LayoutDashboard, Archive, WalletMinimal, Store, User } from "lucide-react"

import
{
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    // {
    //     title: "Dashboard",
    //     url: "/home",
    //     icon: LayoutDashboard,
    // },
    {
        title: "Inventory",
        url: "/inventory",
        icon: Archive,
    },
    {
        title: "Sales",
        url: "/sales",
        icon: WalletMinimal,
    },
    {
        title: "Vendors",
        url: "/vendors",
        icon: Store,
    },
    {
        title: "Customers",
        url: "/customers",
        icon: User,
    },
]

export function AppSidebar()
{
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader collapsible="none" className="h-24 p-4 bg-[#D9D9D9]">

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="w-full h-12">
                <SidebarTrigger className="-ml-1 size-full bg-black" />
            </SidebarFooter>
        </Sidebar>
    )
}

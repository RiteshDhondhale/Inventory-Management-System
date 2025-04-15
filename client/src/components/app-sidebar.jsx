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
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"

import InventoryLogo from "@/assets/Inventory_Logo.png"

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
    const { state, isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader collapsible="icon" className="h-24 p-4 bg-[#D9D9D9]">
                <div className="flex items-center space-x-2 gap-3">
                    <img src={InventoryLogo} className="aspect-square size-14 rounded-lg" />
                    <div
                        className={`
                            transition-all duration-300 ease-in-out
                            overflow-hidden flex flex-col justify-center
                            ${state === "expanded" ? "opacity-100 max-w-xs" : (isMobile ? "opacity-100 max-w-xs" : "opacity-0 max-w-0")}
                        `}
                    >
                        <div className="flex flex-col text-left font-bold text-[#2d4d50] leading-tight">
                            <span>Inventory</span>
                            <span>Management</span>
                            <span>System</span>
                        </div>
                    </div>

                </div>
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
            <SidebarFooter className={`w-full h-12 ${isMobile ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"}`}>
                <SidebarTrigger className="-ml-1 size-full bg-[#2d4d50] hover:bg-[#59979d]" />
            </SidebarFooter>
        </Sidebar>
    )
}

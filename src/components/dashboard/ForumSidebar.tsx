"use client";

import {
    BarChart2,
    Users2,
    MessageCircle,
    Settings,
    HelpCircle,
    Menu,
    FileText,
    Calendar,
    User,
    Building2,
    Briefcase,
    GraduationCap,
    Search,
    BookOpen
} from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ForumSidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();

    function handleNavigation() {
        setIsMobileMenuOpen(false);
    }

    function NavItem({
        href,
        icon: Icon,
        children,
    }: {
        href: string;
        icon: React.ElementType;
        children: React.ReactNode;
    }) {
        const isActive = pathname === href;
        
        return (
            <Link
                href={href}
                onClick={handleNavigation}
                className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive 
                        ? "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 font-medium" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
            >
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                {children}
            </Link>
        );
    }

    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu de navigation"
                title="Ouvrir le menu"
            >
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <nav
                className={cn(
                    "fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-gray-900 transform transition-transform duration-200 ease-in-out",
                    "lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-gray-700",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-full flex flex-col">
                    <Link
                        href="/dashboard"
                        className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                                Forum ECC
                            </span>
                        </div>
                    </Link>

                    <div className="flex-1 overflow-y-auto py-4 px-4">
                        <div className="space-y-6">
                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Principal
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/dashboard" icon={Home}>
                                        Tableau de bord
                                    </NavItem>
                                    {user?.user_type === 'student' && (
                                        <NavItem href="/dashboard/espace-student" icon={User}>
                                            Mon Profil
                                        </NavItem>
                                    )}
                                    {user?.user_type === 'company' && (
                                        <NavItem href="/dashboard/espace-entreprise" icon={Building2}>
                                            Mon Entreprise
                                        </NavItem>
                                    )}
                                </div>
                            </div>

                            {user?.user_type === 'student' && (
                                <div>
                                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Opportunités
                                    </div>
                                    <div className="space-y-1">
                                        <NavItem href="/dashboard/opportunities" icon={Briefcase}>
                                            Offres disponibles
                                        </NavItem>
                                        <NavItem href="/dashboard/applications" icon={FileText}>
                                            Mes candidatures
                                        </NavItem>
                                        <NavItem href="/dashboard/cv-theque" icon={BookOpen}>
                                            Ma CVthèque
                                        </NavItem>
                                    </div>
                                </div>
                            )}

                            {user?.user_type === 'company' && (
                                <div>
                                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Recrutement
                                    </div>
                                    <div className="space-y-1">
                                        <NavItem href="/dashboard/job-offers" icon={Briefcase}>
                                            Mes offres
                                        </NavItem>
                                        <NavItem href="/dashboard/candidates" icon={Users2}>
                                            Candidatures reçues
                                        </NavItem>
                                        <NavItem href="/dashboard/search-students" icon={Search}>
                                            Rechercher étudiants
                                        </NavItem>
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Communication
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/dashboard/messages" icon={MessageCircle}>
                                        Messages
                                    </NavItem>
                                    <NavItem href="/dashboard/calendar" icon={Calendar}>
                                        Calendrier
                                    </NavItem>
                                </div>
                            </div>

                            <div>
                                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Statistiques
                                </div>
                                <div className="space-y-1">
                                    <NavItem href="/dashboard/analytics" icon={BarChart2}>
                                        Mes statistiques
                                    </NavItem>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-1">
                            <NavItem href="/dashboard/settings" icon={Settings}>
                                Paramètres
                            </NavItem>
                            <NavItem href="/dashboard/help" icon={HelpCircle}>
                                Aide
                            </NavItem>
                        </div>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
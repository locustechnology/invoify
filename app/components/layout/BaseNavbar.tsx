import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/favicon/ChatGPT Image Nov 22, 2025, 12_35_49 PM.png";

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";

// Hooks
import { useTranslations } from 'next-intl';

const BaseNavbar = () => {
    const t = useTranslations();
    const devEnv = useMemo(() => {
        return process.env.NODE_ENV === "development";
    }, []);

    return (
        <header className="w-full z-[99]">
            <nav>
                <Card className="flex items-center justify-between px-3 py-1">
                    {/* Logo on the left */}
                    <Link href={"/"}>
                        <Image
                            src={Logo}
                            alt="RGen Logo"
                            width={120}
                            height={60}
                            loading="eager"
                            style={{ height: "auto" }}
                        />
                    </Link>
                    
                    {/* Centered navigation items */}
                    <div className="flex items-center gap-10">
                        <Link 
                            href="/en" 
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/en/create-receipt" 
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Create Invoice
                        </Link>
                        <Link 
                            href="/en/contact" 
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link 
                            href="/en/feedback" 
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Feedback
                        </Link>
                    </div>
                    
                    {/* Theme switcher on the right */}
                    <div className="flex items-center">
                        {/* ? DEV Only */}
                        {/* {devEnv && <DevDebug />}
                        <LanguageSelector /> */}
                        <ThemeSwitcher />
                    </div>
                </Card>
            </nav>
        </header>
    );
};

export default BaseNavbar;

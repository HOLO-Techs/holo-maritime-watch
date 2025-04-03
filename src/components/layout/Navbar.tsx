import React, { useState, useEffect } from 'react';
import { Bell, Menu, Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from './Sidebar';

const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'numeric',
        year: 'numeric'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-black border-b border-holo-gold/50 h-16 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-holo-gold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-holo-navy border-r border-holo-gold/50">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-holo-gold text-2xl font-bold tracking-widest">HOLO</h1>
        <div className="text-sm text-holo-gray ml-4 hidden sm:block">MARITIME WATCH</div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-holo-gray text-xs">
          <Calendar className="h-3 w-3 text-holo-gold" />
          <span>{currentDate}</span>
        </div>
        <div className="flex items-center gap-1 text-holo-gray text-xs">
          <Clock className="h-3 w-3 text-holo-gold" />
          <span>{currentTime}</span>
        </div>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5 text-holo-gold" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            3
          </span>
        </Button>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-holo-gold/20 flex items-center justify-center text-holo-gold border border-holo-gold/50">
            OS
          </div>
          <span className="text-holo-gray text-sm">OPERATOR</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

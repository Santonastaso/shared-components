import React from 'react';

interface HeaderProps {
  user?: {
    email?: string;
  } | null;
  onSignOut: () => void;
  onToggleSidebar: () => void;
  ThemeSwitch: React.ComponentType;
  Button: React.ComponentType<any>;
  MenuIcon: React.ComponentType<any>;
  LogOutIcon: React.ComponentType<any>;
}

export function Header({ user, onSignOut, onToggleSidebar, ThemeSwitch, Button, MenuIcon, LogOutIcon }: HeaderProps) {
  return (
    <header className="bg-secondary shadow-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <span className="text-sm text-muted-foreground">
            {user?.email?.split('@')[0] || 'User'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onSignOut}
            className="flex items-center gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

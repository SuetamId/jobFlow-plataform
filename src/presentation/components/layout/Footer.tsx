export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-app py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Job<span className="text-secondary">Portal</span>
            </span>
            <span className="text-sm text-foreground-tertiary">
              © {currentYear} All rights reserved
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

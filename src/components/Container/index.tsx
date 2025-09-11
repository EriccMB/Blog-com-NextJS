type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-100">
      <div className="max-w-screen-lg mx-auto  px-8">{children}
        
      </div>
    </div>
  );
}
  
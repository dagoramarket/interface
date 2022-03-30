type Props =  {
  children: string | JSX.Element | JSX.Element[];
}

export default function HomeView({ children }: Props): JSX.Element {
  return (
      <div className="flex items-center justify-center h-full">
        {children}
      </div>
  );
}

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

interface GameBackButtonProps {
  onBack: () => void;
}

export function GameBackButton({ onBack }: GameBackButtonProps) {
  const [backHover, setBackHover] = useState(false);

  return (
    <Button
      onClick={onBack}
      onMouseEnter={() => setBackHover(true)}
      onMouseLeave={() => setBackHover(false)}
      className="mb-4 cursor-pointer transition-all duration-200 flex items-center text-primary"
      style={{
        color: backHover ? "var(--color-gray-500)" : "inherit", // or your normal text color
        background: 'none',
        border: 'none',
        padding: 0,
      }}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Dashboard
    </Button>
  );
}

export default GameBackButton;

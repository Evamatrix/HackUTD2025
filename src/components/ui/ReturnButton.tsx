import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

interface ReturnButtonProps {
  to?: string; // destination route
  label?: string;
}

export function ReturnButton({ to = '/dashboard', label = 'Back to Dashboard' }: ReturnButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <button
        onClick={() => navigate(to)}
        className="flex items-center gap-3 rounded-full px-6 py-3 shadow-lg border-2 border-gray-300 
                   bg-[#7A0F18] hover:bg-[#5E0B12] active:bg-[#4A090E] text-white font-bold 
                   tracking-wide transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" color="white" />
        <span>{label}</span>
      </button>
    </div>
  );
}

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
        className="flex items-center gap-3 rounded-full px-6 py-3 shadow-lg border-2 border-black bg-[#7A0F18] hover:bg-[#5E0B12] active:bg-[#4A090E] text-black font-bold tracking-wide transition-colors"
        style={{ color: '#000' }}
      >
        <ArrowLeft className="w-5 h-5" style={{ color: '#000' }} />
        <span style={{ color: '#000' }}>{label}</span>
      </button>
    </div>
  );
}
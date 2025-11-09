import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

export interface PointsEntry {
  date: string; // ISO string
  points: number;
  reason?: string;
}

interface PointsHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: PointsEntry[];
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ open, onOpenChange, history }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Catnip Points History</DialogTitle>
          <DialogDescription>All your recent point changes are listed below.</DialogDescription>
        </DialogHeader>

        <div className="max-h-64 overflow-y-auto mt-4">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No point history yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.slice().reverse().map((entry, idx) => (
                <li key={idx} className="flex items-center justify-between bg-slate-50/5 p-3 rounded-lg border border-white/6">
                  <div>
                    <div className="text-sm text-blue-200">{new Date(entry.date).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{entry.reason || 'Points earned'}</div>
                  </div>
                  <div className="text-lg font-semibold text-amber-300">{entry.points > 0 ? `+${entry.points}` : entry.points}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PointsHistory;

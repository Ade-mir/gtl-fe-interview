import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Copy, Check } from '@geist-ui/react-icons';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

export type Patient = {
  patientId: string;
  baseline: number;
  scannedAt: any;
  followUp: number;
  conclusion: number;
  dateOfBirth: string;
  baselineQuality?: any;
  followUpQuality?: any;
  conclusionQuality?: any;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'patientId',
    header: ({ column }) => {
      return (
        <div
          className="w-24 font-medium flex justify-between items-center hover:cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Patient ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const [isCopied, setIsCopied] = useState(false);

      const handleCopyClick = () => {
        navigator.clipboard.writeText(patientId);
        setIsCopied(true);
      };

      useEffect(() => {
        let timer: any;
        if (isCopied) {
          timer = setTimeout(() => {
            setIsCopied(false);
          }, 200);
        }
        return () => clearTimeout(timer);
      }, [isCopied]);

      const patientId: Patient['patientId'] = row.getValue('patientId');
      return (
        <div className="w-16 font-medium flex justify-between">
          {patientId}
          {isCopied ? (
            <Copy color="white" size="20px" />
          ) : (
            <Copy
              color="gray"
              size="20px"
              onClick={handleCopyClick}
              className="hover:cursor-pointer"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'baseline',
    header: () => <div className="text-right">Baseline</div>,
    cell: ({ row }) => {
      const baseline: Patient['baseline'] = row.getValue('baseline');
      return <div className="text-right font-medium">{baseline}</div>;
    },
  },
  {
    accessorKey: 'followUp',
    header: () => <div className="text-right">Follow-up</div>,
    cell: ({ row }) => {
      const followUp: Patient['followUp'] = row.getValue('followUp');
      return <div className="text-right font-medium">{followUp}</div>;
    },
  },
  {
    accessorKey: 'conclusion',
    header: () => <div className="text-right">Conclusion</div>,
    cell: ({ row }) => {
      const conclusion: Patient['conclusion'] = row.getValue('conclusion');
      return <div className="text-right font-medium">{conclusion}</div>;
    },
  },
];
